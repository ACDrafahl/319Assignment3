// server.js

var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const port = "8081";
const host = "localhost";
const { MongoClient } = require("mongodb");

// Connect to MongoDB
const url = "mongodb://localhost:27017/";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start server
app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
  });
  
// Routes
app.post('/addProduct', async (req, res) => {
    try {
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        const newDocument = {
          id: Number(values[0]),
          title: values[1],
          price: Number(values[2]),
          description: values[3],
          category: values[4],
          image: values[5],
          rating: {
            rate: Number(values[6].rate),
            count: Number(values[6].count)
          }
        };
        console.log(newDocument);
        const results = await db.collection("fakestore_catalog").insertOne(newDocument);
        res.status(200).send(results);
      } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: "An internal server error occurred" });
      }
});

app.delete("/deleteProduct/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      await client.connect();
      console.log("Product ID to delete :", id);
      const query = { id: id };
      //const robotDeleted = await db.collection("fakestore_catalog").findOne(query);
      const results = await db.collection("fakestore_catalog").deleteOne(query);
      res.status(200);
      res.send(results);
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  app.put('/updateProduct/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updatedProductData = req.body;
  
      await client.connect();
  
      const filter = { id: id };
      const updateDocument = {
        $set: {
          title: updatedProductData.title,
          price: updatedProductData.price,
          description: updatedProductData.description,
          category: updatedProductData.category,
          image: updatedProductData.image,
          rating: updatedProductData.rating,
        },
      };
  
      const result = await db.collection("fakestore_catalog").updateOne(filter, updateDocument);
  
      res.status(200).send(result);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  // Define a route to read all products
  app.get('/readProducts', async (req, res) => {
    try {
      await client.connect();
      const products = await db.collection("fakestore_catalog").find({}).toArray();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error reading products:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  
  // Define a route to read a product by ID
  app.get('/readProduct/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);
      await client.connect();
      const product = await db.collection("fakestore_catalog").findOne({ id: id });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error reading product:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
