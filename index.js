// Required libraries
const Web3 = require('web3');
const TelegramBot = require('node-telegram-bot-api');
const MongoClient = require('mongodb').MongoClient;
const winston = require('winston'); // Import winston

// Telegram bot token and chat ID
const token = '7214459945:AAESB9jH4QEqypvbCMWa96rn_yJv8WzGIpg';
const chatId = '1177812736';
const bot = new TelegramBot(token);

// MongoDB URI
const mongoURI = 'mongodb+srv://kaushikpalaniappan:ochi116$@cluster0.o6a2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let db;

// Initialize web3 with a WebSocket provider
const web3 = new Web3('wss://eth-mainnet.ws.alchemyapi.io/v2/pbz7lyt1esrbUciBSh6VVixa_DBrG2TF');

// Contract address
const beaconDepositContract = '0x00000000219ab540356cBB839Cbe05303d7705Fa';

// Configure Winston for logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' })
    ]
});

// Function to send a Telegram notification
function sendTelegramNotification(message) {
    bot.sendMessage(chatId, message)
        .then(() => logger.info('Notification sent to Telegram!'))
        .catch(err => logger.error('Error sending Telegram notification:', err));
}

// Function to connect to MongoDB
async function connectMongo() {
    try {
        const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db('ethereum');
        logger.info('Connected to MongoDB!');
        sendTelegramNotification('Connected to MongoDB!');
    } catch (err) {
        logger.error('Error connecting to MongoDB:', err);
        sendTelegramNotification('Failed to connect to MongoDB!');
    }
}

// Function to monitor deposits
async function monitorDeposits() {
    web3.eth.subscribe('logs', {
        address: beaconDepositContract
    }, (error, result) => {
        if (error) {
            logger.error('Subscription error:', error);
            sendTelegramNotification(`Subscription error: ${error.message}`);
            return;
        }

        // Process the result
        logger.info('Log received:', result);

        // Fetching transaction details
        web3.eth.getTransaction(result.transactionHash)
            .then(tx => {
                const deposit = {
                    from: tx.from,
                    value: web3.utils.fromWei(tx.value, 'ether'),
                    transactionHash: result.transactionHash,
                    blockNumber: tx.blockNumber,
                    gasUsed: tx.gas,
                    timestamp: new Date() // Use block timestamp if needed
                };

                logger.info(`Deposit detected! ${JSON.stringify(deposit)}`);

                // Save to MongoDB
                const collection = db.collection('deposits');
                return collection.insertOne(deposit);
            })
            .then(() => {
                logger.info('Deposit saved to MongoDB!');
                // Send a notification to Telegram
                sendTelegramNotification(`New deposit detected!\n${JSON.stringify(deposit)}`);
            })
            .catch(txError => {
                logger.error('Error fetching transaction:', txError);
                sendTelegramNotification(`Error fetching transaction: ${txError.message}`);
            });
    });

    sendTelegramNotification('Connected to Ethereum WebSocket and monitoring deposits.');
}

// Run the functions
async function run() {
    await connectMongo();
    monitorDeposits();
}

run();
