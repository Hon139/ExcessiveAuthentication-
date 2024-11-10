const { MongoClient } = require('mongodb');

// Replace the URI and database/collection name with your actual values
const uri = "mongodb+srv://backend:HcK8qRxBMs8bygqC@secretsharingkeys.wluz8.mongodb.net/?retryWrites=true&w=majority&appName=SecretSharingKeys";
const dbName = "<database>";
const collectionName = "<collection>";

async function updateEntries(position, secretValue) {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Upsert (insert or replace) secret at the given position
    const result = await collection.updateOne(
      { position: position }, // Find document with this position
      { $set: { position: position, secrets: secretValue } }, // Insert or replace "secrets"
      { upsert: true } // Create if it doesn't exist
    );

    if (result.upsertedCount > 0) {
      console.log(`Inserted secret at position ${position}`);
    }
    else if (result.modifiedCount > 0) {
      console.log(`Updated secret at position ${position}`);
    } 
    else {
      console.log('No changes made');
    }
  } finally {
    await client.close();
  }
}

async function retrieveEntry(position) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Retrieve the secret at the given position
    const secret = await collection.findOne({ position: position });

    if (secret) {
      console.log(`Retrieved secret at position ${position}:`, secret.secrets);
      return secret.secrets;
    } 
    else {
      console.log(`No secret found`);
      return null;
    }
  } 
  finally {
    await client.close();
  }
}

module.exports = {
  updateEntries,
  retrieveEntry
};