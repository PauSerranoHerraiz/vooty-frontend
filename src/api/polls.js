import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const objectIdRegex = /^[a-f\d]{24}$/i;

const getOrCreateUserId = () => {
  const key = "vooty_user_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = `anon_${crypto.randomUUID()}`;
    localStorage.setItem(key, id);
  }
  return id;
};

export const getPolls = async () => {
  try {
    const res = await axios.get(`${API_URL}/polls`);
    return res.data;
  } catch (error) {
    console.error("Error fetching polls:", error);
    throw error;
  }
};

export const voteOnPoll = async ({ pollId, optionId, optionIndex, userId }) => {
  try {
    const normalizedPollId = String(pollId ?? "").trim();

    if (!objectIdRegex.test(normalizedPollId)) {
      throw new Error(`pollId inválido en frontend: "${normalizedPollId}"`);
    }

    const payload = {
      pollId: normalizedPollId,
      userId: userId || getOrCreateUserId(),
    };

    if (optionId) payload.optionId = String(optionId);
    else if (typeof optionIndex === "number") payload.optionIndex = optionIndex;

    const res = await axios.post(`${API_URL}/votes`, payload);
    return res.data;
  } catch (error) {
    console.error("Error voting poll:", error?.response?.data || error.message);
    throw error;
  }
};

export const createPoll = async (question, options) => {
  return axios.post("http://localhost:5000/api/polls", {
    question,
    options
  });
};
