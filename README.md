# Ethereum Deposit Tracker

***Softwares Used***

·
Alchemy Api key for rpc integration


·
MongoDB for storing data

·
MongoDB Exporter for metrics

·
Prometheus

·
Docker - kubernates

·
Grafana dashboard


**WorkFlow**
![Screenshot (6980)](https://github.com/user-attachments/assets/52db8176-4db3-47da-85b0-3d87188b6ae4)

**Setup Process**



**Install Dependencies:**



Install the required Node.js packages using npm:



```bash
npm install web3 node-telegram-bot-api mongodb Winston
```


·        
**Web3:** Initializes a Web3 instance with a WebSocket provider from Alchemy.

·        
**MongoDB:** Connects to MongoDB using the provided
URI and selects the ethereum database.

·        
Creates a Telegram bot instance to send
notifications using the provided token and chat ID.

·        
**Winston:** to log events and errors to both the
console and a file (app.log).



**Deposit Monitoring:**
Subscribes to logs for the Beacon Deposit Contract to track ETH deposits.

**Transaction Processing:**
Fetches transaction details, creates a deposit object, and stores it in MongoDB.

**Error Handling:**
Logs errors and sends notifications to Telegram if issues occur.

**Logging:**
Uses Winston to log events and errors to both the console and a file (app.log).



**Configure Environment:**

Ø 
Create a mongodb cluster Deposit Tracker (any
cluster name of your choice)


Create a database in
·    
cluster of your choice, I have created a timeseries database

·
Get the mongodb uri


Ø 
Login to Alchemy and get an api key from the
website.


Note the api key
Use websocket or https to
      access the api key

Ø 
Create a telegram bot to send notifications using
provided token and chat id regarding the transactions and alerts

·
Telegram bot of any name and get the bot token

·
Then using get id bot get the chat id 

·
Keep them noted


Ø 
Make sure you enter the correct inputs values of the mongo buri, alchemy api key, telegram token id, telegram chat id.

Ø 
Beacon deposit contract used 0x00000000219ab540356cBB839Cbe05303d7705Fa


Ø 
Why this beacon deposit contract?


§ 
Most of the users send their ETH to this
contract to participate in the Ethereum 2.0 proof-of-stake.


§ 
This contract then handles the process of moving
the deposited ETH to the Beacon Chain.


§ 
Monitoring this contract allows you to track
deposits made by users who are staking ETH in Ethereum 2.0.


§ 
It helps in verifying and recording these
transactions for transparency and auditing purposes.


**Usage Instructions:**
The script will connect to Ethereum via Alchemy, monitor deposits on the specified contract, log deposit details to MongoDB, and send notifications to a Telegram chat.



 


