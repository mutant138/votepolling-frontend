import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from '../App';

function AllResults() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/polls/results`);
        const sortedPolls = sortPollsByMaxVotes(response.data);
        setPolls(sortedPolls);
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };
    const sortPollsByMaxVotes = (polls) => {
      return polls.map((poll) => {
        const votes = poll.votes || [];

        const voteCounts = poll.options.map((option) => {
          const voteCount = votes.filter((vote) => vote.option === option).length; // Filtering the vote from the data
          return {option,voteCount };
        });
        const maxVotesOption = voteCounts.reduce((prev, current) =>
          (prev.voteCount || 0) > (current.voteCount || 0) ? prev : current, 
          { option: 'None', voteCount: 0 }    // reduce to the single vote count
        );

        return { ...poll, maxVotesOption };
      }).sort((a, b) => (b.maxVotesOption.voteCount || 0) - (a.maxVotesOption.voteCount || 0));
    };
    fetchPolls();
    socket.on('vote update', (updatedPoll) => {
      setPolls((prevPolls) => {
        const updatedPolls = prevPolls.map((poll) =>
          poll._id === updatedPoll._id
            ? {
                ...updatedPoll,
                maxVotesOption: (updatedPoll.options.map((option) => {
                  const votes = updatedPoll.votes || [];
                  const voteCount = votes.filter((vote) => vote.option === option).length;
                  return { option, voteCount };
                }).reduce((prev, current) =>
                  (prev.voteCount || 0) > (current.voteCount || 0) ? prev : current,
                  { option: 'None', voteCount: 0 }
                ))
              }
            : poll
        );

        return sortPollsByMaxVotes(updatedPolls);
      });
    });

    // cleaning function
    return () => {
      socket.off('vote update');
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">All Poll Results</h2>
      {polls.map((poll) => (
        <div key={poll._id} className="p-4 border rounded">
          <h3 className="text-lg font-semibold">{poll.question}</h3>
          <p className="text-sm">
            Most voted option: <strong>{poll.maxVotesOption.option}</strong> with {poll.maxVotesOption.voteCount || 0} votes
          </p>
        </div>
      ))}
    </div>
  );
}

export default AllResults;
