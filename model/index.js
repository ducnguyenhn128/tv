const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { log } = require('console');

const app = express();
app.use(bodyParser.json())
const PORT = 3001;
const URL = 'mongodb://127.0.0.1:27017/stock'
mongoose.connect(URL)

// Define Schema
const ticketSchema = {
    short_name: {
        type: String,
        require: true,
    },
    bid: {
        type: Number,
        require: true,
    },
    ask: {
        type: Number,
        require: true,
    },
    volume: {
        type: Number,
        require: true,
    },

}

// Model: Instance of Schema
const ticketModel = mongoose.model('allTicket', ticketSchema)

// CRUD
app.get('/', (req, res) => {
    res.status(200).send('Hello')
})

app.get('/:id', async(req, res) => {
    try {
        const foundTicket = await ticketModel.findOne({short_name: req.params.id});
        console.log(foundTicket);
        res.status(200).send(foundTicket)
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

app.post('/:id', async(req, res) => {
    const ticket = req.params.id;
    // const ticketData = req.body;

    // check ticket in DB
    try {
        const foundTicket = await ticketModel.findOne({short_name: ticket});

        if (foundTicket) {
            res.status(400).send('Ticket has exist')
        } else {
            const newTicket = new ticketModel(req.body) ;
            await newTicket.save();
            res.status(201).send('Success')
        }
    } catch(err) {
        console.log(err);
        res.status(400).send()
    }
})

app.put('/:id', async(req, res) => {
    const ticket = req.body.short_name;
    const {short_name, bid, ask, volume} = req.body;
    const updateTicket = {short_name, bid, ask, volume}
    console.log(updateTicket)
    try {
        await ticketModel.findOneAndUpdate({short_name: ticket}, updateTicket)
        // console.log(foundTicket);
        
    } catch(err) {
        console.log(err);
        res.status(204).send();
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})