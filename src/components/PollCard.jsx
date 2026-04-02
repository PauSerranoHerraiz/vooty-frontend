import { voteOnPoll } from "../api/polls";

const PollCard = ({ poll, refresh }) => {
  const handleVote = async (index, option) => {
    try {
      const pollId = poll?._id ?? poll?.id;
      const optionId = option?._id ?? option?.id ?? option?.optionId;

      await voteOnPoll({
        pollId,
        optionId,
        optionIndex: index,
      });

      await refresh();
    } catch (error) {
      console.error("Vote failed:", error?.response?.data || error.message);
    }
  };

  const options = Array.isArray(poll?.options) ? poll.options : [];

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>{poll?.question ?? "Pregunta sin título"}</h3>

      {options.map((opt, index) => (
        <div key={`${poll?._id ?? poll?.id}-${index}`} style={{ marginBottom: "0.5rem" }}>
          <button onClick={() => handleVote(index, opt)}>
            {opt?.text ?? "Opción"}
          </button>
          <div>
            {opt?.votes ?? 0} votos ({opt?.percentage ?? 0}%)
          </div>
        </div>
      ))}

      <small>Total votos: {poll?.totalVotes ?? 0}</small>
    </div>
  );
};

export default PollCard;