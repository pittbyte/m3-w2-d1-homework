
const { MongoClient } = require('mongodb');

// Connection string
const uri = "mongodb://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Connect to the database
        const db = client.db("statsdb");

        // Get the collection
        const collection = db.collection("uscensus");

        // Sorting query
        const sortQuery = { state: -1 };  // -1 for descending order

        // Find and sort documents
        const cursor = collection.find().sort(sortQuery);

        // Printing sorted documents
        console.log("Records sorted by state (descending):");
        await cursor.forEach(doc => {
            console.log(`State: ${doc.state}, City: ${doc.city}, Zip: ${doc.zip}, Income: ${doc.income}, Age: ${doc.age}`);
        });

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

run().catch(console.error);