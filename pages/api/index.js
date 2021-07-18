import { MongoClient } from "mongodb";
async function getAllmeetups(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://arjunps:EVnJ6DWUDqxnM4T@cluster0.6psjt.mongodb.net/Meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const mongoCollections = db.collection("meetups");
  const meetups = await mongoCollections.find({ _id: 1 }).toArray();
  res.status(200).json({ meetups });
}
