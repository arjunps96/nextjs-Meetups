import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import router, { useRouter } from "next/router";
function addNewMeetups() {
  const route = useRouter();
  async function addMeetupsHandler(submitData) {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(submitData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(res);
    router.push("/");
  }

  return <NewMeetupForm onAddMeetup={addMeetupsHandler} />;
}

export default addNewMeetups;
