const PORT = 8000;
const express = require('express');
const mongodb = require('mongodb');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

// the URI for the mongodb server
const uri = process.env.URI;

const app = express();
app.use(cors());
app.use(express.json());

// called if a HTTP get request is made to /receipts to get all the existing receipts in the database
app.get('/receipts', async (req, res) => {
  console.log('get receipts');
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('app-data');
    const receipts = database.collection('receipts');

    // gets all documents from the receipts collection and turns them into an array
    const foundReceipts = await receipts.find({}).toArray();

    // send the foundReceipts array back in the res.json()
    res.json(foundReceipts);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

// called if a HTTP post request is made to /receipt to add a new receipt to the database
app.post('/receipt', async (req, res) => {
  console.log('post receipt');
  const client = new MongoClient(uri);

  const { price, name, location } = req.body;

  try {
    await client.connect();
    const database = client.db('app-data');
    const receipts = database.collection('receipts');

    // creates a receipt object using the values passed in the req.body, the current timestamp
    // and a unique id that will be assigned to it to in the database
    const receipt = {
      price,
      name,
      location,
      timestamp: Date.now(),
    };

    // inserts the receipt object into the receipts collection
    const response = await receipts.insertOne(receipt);

    // creates constant for the unique id of the receipt object
    const addedReceiptId = response.insertedId.toString();

    // creates new receipt object including the unique id and sends this back in res.json()
    const AddedReceipt = { _id: addedReceiptId, ...receipt };
    res.json(AddedReceipt);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

// called if a HTTP delete request is made to /receipt to delete an existing receipt in the database based on the id
app.delete('/receipt', async (req, res) => {
  console.log('delete receipt');
  const client = new MongoClient(uri);
  const receiptId = req.query.receiptId;

  try {
    const database = client.db('app-data');
    const receipts = database.collection('receipts');
    console.log('deleting receipt in backend: ' + receiptId);

    // query so that the receipt going to be deleted in the database has the _id of the receiptId of
    // passed in the req.query.receiptId
    const query = { _id: new mongodb.ObjectID(receiptId) };

    // deletes one document in the receipts collection based on the query
    const deletedReceipt = await receipts.deleteOne(query);

    // sends the _id of the deleted receipt object back in the res.json()
    res.json({ _id: receiptId });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

// called if a HTTP put request is made to /receipt to update an existing receipt in the database
app.put('/receipt', async (req, res) => {
  console.log('put receipt');
  const client = new MongoClient(uri);

  const { receiptId, price, name, location, timestamp } = req.body;

  try {
    await client.connect();
    const database = client.db('app-data');
    const receipts = database.collection('receipts');

    // query so that the receipt going to be updated in the database has the _id of the receiptId of the receipt passed in the req.body
    const query = { _id: new mongodb.ObjectID(receiptId) };

    const updateReceipt = {
      $set: { price, name, location, timestamp },
    };

    // updates one document in the receipts collection that matches the query
    const response = await receipts.updateOne(query, updateReceipt);

    // sends the updated receipt object in the res.json()
    res.json({ _id: receiptId, price, name, location, timestamp });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log('Server running on Port: ' + PORT));
