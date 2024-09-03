import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { socket } from '../App';

function ViewResults() {
  const [results, setResults] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/polls/${id}/results`);
        console.log(`Response data >>>>>>>>>> :   ${response.data}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();

    socket.emit('join poll', id);

    const handleVoteUpdate = (updatedResults) => {
      console.log('Received vote update:', updatedResults);
      setResults(updatedResults);
    };

    socket.on('vote update', handleVoteUpdate);

    return () => {
      socket.off('vote update', handleVoteUpdate);
    };
  }, [id]);

  if (!results) return <div>Loading...</div>;

  console.log(`results  >>>>>> ${results}`); // Additional logging

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{results.question}</h2>
      {results.options.map((option, index) => (
        <div key={index} className="flex justify-between">
          <span>{option.text}</span> {/* Access the text property */}
          <span>{option.votes} votes</span> {/* Access the votes property */}
        </div>
      ))}
    </div>
  );
}

export default ViewResults;
