import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const getPolls = async () => {
    const res = await axios.get(`${API_URL}/polls`);
    return res.data;
}

export const voteOnPoll = async (pollId, optionIndex) => {
    return axios.post(`${API_URL}/votes`, {
        pollId,
        optionIndex,
        userId: "user123"
    });
}
