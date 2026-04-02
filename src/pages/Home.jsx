import { useEffect, useState } from "react";
import { getPolls } from "../api/polls";
import PollCard from "../components/PollCard";

const Home = () => {
  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    const data = await getPolls();
    setPolls(data);
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div>
      <h1>PulseUp!</h1>

      {polls.map(poll => (
        <PollCard key={poll._id} poll={poll} refresh={fetchPolls} />
      ))}
    </div>
  );
};

export default Home;