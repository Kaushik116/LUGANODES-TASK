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

***Setup Process:***



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


***ScreenShots***


![Screenshot (6979)](https://github.com/user-attachments/assets/659a896c-c01b-4114-8372-8972cc9b3927)
![Screenshot (6976)](https://github.com/user-attachments/assets/92873142-8254-45f3-90a5-85dfe685b9a2)
![Screenshot (6973)](https://github.com/user-attachments/assets/31345a76-a6cf-4efc-8c91-8fe335604067)
![Screenshot (6970)](https://github.com/user-attachments/assets/2342d48f-677c-46c4-8668-aae17cbe441a)
![Screenshot (6969)](https://github.com/user-attachments/assets/4bb45fda-b546-4614-9b2c-dfb02114d55c)
![Screenshot (6964)](https://github.com/user-attachments/assets/61aade44-18ae-40ba-87a3-28b5624dd524)
![Screenshot (6963)](https://github.com/user-attachments/assets/62f80932-1c40-44e6-bca4-f4b8fa026cfd)
![Screenshot (6961)](https://github.com/user-attachments/assets/bb1eb2e7-2767-41c8-bdaf-cc11b246af1a)
![Screenshot (6959)](https://github.com/user-attachments/assets/3126034f-fba3-4cef-8098-6089afb11c5d)
![Screenshot (6958)](https://github.com/user-attachments/assets/3d6d34da-9767-4322-9511-5b60e5f68629)
![Screenshot (6956)](https://github.com/user-attachments/assets/7f58d083-9300-410c-b62b-db2e1ebb6752)
![Screenshot (6955)](https://github.com/user-attachments/assets/b5ed800c-c710-4673-93af-e3ef86172297)
![Screenshot (6952)](https://github.com/user-attachments/assets/3e148d09-fb0d-448a-a679-ef4dac1816e7)
![Screenshot (6947)](https://github.com/user-attachments/assets/91cf9639-5043-4043-b031-62c82d82d77b)
![Screenshot (6941)](https://github.com/user-attachments/assets/ccbbd8de-2b4e-484c-9179-1de7aa14eecc)
![Screenshot (6940)](https://github.com/user-attachments/assets/7bb43a44-da91-4763-9e37-587b09ccbaae)





***OUTPUT***

![Screenshot (6981)](https://github.com/user-attachments/assets/cb46921d-7290-4d7e-930c-99f5d580cbe3)

***VIDEO***



 


