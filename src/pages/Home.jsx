import { useCallback, useEffect, useState } from "react";
import { getPolls } from "../api/polls";
import PollCard from "../components/PollCard";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const Home = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchPolls = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await getPolls();

      const normalized = Array.isArray(data)
        ? data
        : Array.isArray(data?.polls)
          ? data.polls
          : [];

      setPolls(normalized);
    } catch {
      setErrorMsg("No se pudieron cargar las encuestas.");
      setPolls([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  return (
    <div>
      <NavBar />
      <h1>PulseUp!</h1>
     
      {loading && <p>Cargando encuestas...</p>}
      {!loading && errorMsg && <p>{errorMsg}</p>}
      {!loading && !errorMsg && polls.length === 0 && <p>No hay encuestas todavía.</p>}

      {polls.map((poll) => (
        <PollCard key={poll._id} poll={poll} refresh={fetchPolls} />
      ))}
    </div>
  );
};

export default Home;