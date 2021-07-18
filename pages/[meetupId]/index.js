import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import MeetupItem from "../../components/meetups/MeetupItem";
function MeetupDetails(props) {
  return (
    <MeetupItem
      image={props.meetup.image}
      address={props.meetup.address}
      title={props.meetup.title}
      description={props.meetup.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://arjunps:EVnJ6DWUDqxnM4T@cluster0.6psjt.mongodb.net/Meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const mongoCollections = db.collection("meetups");
  const meetups = await mongoCollections.find({}, { _id: 1 }).toArray();

  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const meetup_Id = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://arjunps:EVnJ6DWUDqxnM4T@cluster0.6psjt.mongodb.net/Meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const mongoCollections = db.collection("meetups");
  const meetup = await mongoCollections.findOne({ _id: ObjectId(meetup_Id) });
  return {
    props: {
      meetup: {
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetails;
