import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
function Meetups(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://arjunps:EVnJ6DWUDqxnM4T@cluster0.6psjt.mongodb.net/Meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const mongoCollections = db.collection("meetups");
  const meetups = await mongoCollections.find().toArray();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default Meetups;
