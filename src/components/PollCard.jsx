import { voteOnPoll } from "../api/polls";


const PollCard = ({ poll, refresh }) => {
  const handleVote = async (index) => {
    await voteOnPoll(poll._id, index);
    refresh(); // recargar datos
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>{poll.question}</h3>

      {poll.options.map((opt, index) => (
        <div key={index} style={{ marginBottom: "0.5rem" }}>
          <button onClick={() => handleVote(index)}>
            {opt.text}
          </button>

          <div>
            {opt.votes} votos ({opt.percentage}%)
          </div>
        </div>
      ))}

      <small>Total votos: {poll.totalVotes}</small>
    </div>
  );
};

export default PollCard;