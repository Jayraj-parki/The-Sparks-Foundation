const express = require("express")
const path = require("path")
require('dotenv').config({ path: "./config.env" })
const app = express()
const PORT = process.env.PORT || 8080
require("./db/conn")
app.use(express.json())

// models
const Customer = require("./models/Customer")
const Transaction = require("./models/Transaction")

// customers
app.post("/addCustomer", async (req, res) => {
    const result = new Customer(req.body)
    try {

        await result.save()
        res.status(200).send(req.body);
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})
app.get("/getAllCustomer", async (req, res) => {
    try {
        const result = await Customer.find({})
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

// transactions
app.post("/addTransaction", async (req, res) => {
    const { sender,date, senderName, recieverName, senderBal, recieverBal, reciever, amount, status } = req.body;
    
    try {
        if (status == "success" && senderBal >= amount) {
            const result = new Transaction({
                sender, senderName, recieverName, reciever, amount, status, date
            })
            await result.save()
            const senderUpdate = await Customer.findByIdAndUpdate(sender, { $set: { balance: (senderBal - amount) } })
            const recieverUpdate = await Customer.findByIdAndUpdate(reciever, { $set: { balance: (recieverBal + (+amount)) } })
            res.status(200).json("Money Transfered Successfully");

        }
        else {
            const result = new Transaction({
                sender, senderName, recieverName, reciever, amount, status: "failed", date
            })
            await result.save()
            res.status(404).json("Opps! Transaction Failed. You have insufficient balance for transaction.");
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})
app.get("/getAllTransaction", async (req, res) => {
    try {
        const result = await Transaction.find()

        res.status(200).json(result.reverse());
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

app.get("/getTransactionByUser/:user", async (req, res) => {
    const sender = req.params.user
    try {
        const result = await Transaction.find({ $or: [{ sender }, { reciever: sender }] })
        res.status(200).send(result.reverse());
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

// heroku paths
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
if (process.env.NODE_ENV == "production") {
    app.use(express.static("frontend/build"))
}

app.listen(PORT, () => {
    console.log(`listening at ${PORT} `);
})   