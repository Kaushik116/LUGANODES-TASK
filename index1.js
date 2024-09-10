// Import the Web3 and MongoDB libraries
const Web3 = require('web3');
const { MongoClient } = require('mongodb');

// Initialize web3 with a WebSocket provider
const web3 = new Web3('wss://eth-mainnet.alchemyapi.io/v2/pbz7lyt1esrbUciBSh6VVixa_DBrG2TF');

// MongoDB connection URI (replace with your MongoDB URI)
const mongoUri = 'mongodb+srv://kaushikpalaniappan:ochi116$@cluster0.o6a2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let db;

// Connect to MongoDB
async function connectMongo() {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('Deposit-Tracker');  // Replace 'Deposit-Tracker' with your preferred database name
    console.log("Connected to MongoDB!");
}

// Contract address
const beaconDepositContract = "0x00000000219ab540356cBB839Cbe05303d7705Fa";

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
            .then(async tx => {
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
                const collection = db.collection('testing');  // Replace 'deposits' with your collection name
                await collection.insertOne(deposit);
                console.log('Deposit saved to MongoDB!');
            })
            .catch(txError => {
                console.error('Error fetching transaction:', txError);
            });
    });
}

// Main function to run the tracker
async function main() {
    await connectMongo();
    monitorDeposits();
}

main();
