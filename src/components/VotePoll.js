import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { socket } from '../App';

function VotePoll() {
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const isVoting = useRef(false);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/poll/${id}`);
        setPoll(response.data);
      } catch (error) {
        console.error('Error fetching poll:', error);
      }
    };

    fetchPoll();

    socket.emit('join poll', id);

    const handleVoteUpdate = (updatedPoll) => {
      if (!isVoting.current) {
        setPoll(updatedPoll);
      }
    };

    socket.on('vote update', handleVoteUpdate);

    return () => {
      socket.off('vote update', handleVoteUpdate);
    };
  }, [id]);

  const handleVote = async () => {
    isVoting.current = true;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/${id}/vote`, { option: selectedOption });
      history.push(`/results/${id}`);
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      isVoting.current = false;
    }
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{poll.question}</h2>
      {poll.options.map((option, index) => (
        <label key={index} className="block">
          <input
            type="radio"
            name="option"
            value={option}
            checked={selectedOption === option}
            onChange={() => setSelectedOption(option)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
      <button
        onClick={handleVote}
        disabled={!selectedOption}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
      >
        Vote
      </button>
    </div>
  );
}

export default VotePoll;
