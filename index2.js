const Web3 = require('web3');
const { MongoClient } = require('mongodb');
const winston = require('winston');
const TelegramBot = require('node-telegram-bot-api');

// Setup environment variables (replace with your actual values)
const ALCHEMY_API_KEY = 'pbz7lyt1esrbUciBSh6VVixa_DBrG2TF';
const MONGO_URI = 'mongodb+srv://kaushikpalaniappan:ochi116$@cluster0.o6a2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const TELEGRAM_BOT_TOKEN = '7214459945:AAESB9jH4QEqypvbCMWa96rn_yJv8WzGIpg';
const TELEGRAM_CHAT_ID = '1177812736';

// Initialize Web3
const web3 = new Web3(`wss://eth-mainnet.ws.alchemyapi.io/v2/${ALCHEMY_API_KEY}`);

// Initialize MongoDB
const mongoClient = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Initialize Telegram Bot (Optional)
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);

// Configure Winston Logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' })
    ]
});

// Contract address
const beaconDepositContract = "0x00000000219ab540356cBB839Cbe05303d7705Fa";

// Connect to MongoDB
async function connectMongo() {
    try {
        await mongoClient.connect();
        logger.info('Connected to MongoDB!');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

// Function to monitor deposits
async function monitorDeposits() {
    web3.eth.subscribe('logs', {
        address: beaconDepositContract
    }, (error, result) => {
        if (error) {
            console.error('Subscription error:', error);
            return;
        }

        // Process the result
        console.log('Log received:', result);

        // Additional processing, e.g., fetching transaction details
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

                console.log(`Deposit detected! ${JSON.stringify(deposit)}`);

                // Save to MongoDB
                const collection = db.collection('deposits');
                return collection.insertOne(deposit);
            })
            .then(() => {
                console.log('Deposit saved to MongoDB!');
                // Send a notification to Telegram
                sendTelegramNotification(`New deposit detected!\n${JSON.stringify(deposit)}`);
            })
            .catch(txError => {
                console.error('Error fetching transaction:', txError);
            });
    });
}


// Run the application
async function run() {
    await connectMongo();
    monitorDeposits();
}

run();
