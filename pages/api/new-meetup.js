import { MongoClient } from "mongodb";

async function addNewMeetup(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://arjunps:EVnJ6DWUDqxnM4T@cluster0.6psjt.mongodb.net/Meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const mongoCollections = db.collection("meetups");
    const meetupData = await mongoCollections.insertOne(data);
    console.log(meetupData);
    client.close();
    res.status(201).json({ message: "Meetup Created" });
  }
}

export default addNewMeetup;
