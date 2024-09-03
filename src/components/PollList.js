import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PollList() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/polls`);
        setPolls(response.data);
      } catch (error) {
        setError('Error fetching polls');
        console.error('Error fetching polls:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Available Polls</h1>
      {polls.length > 0 ? (
        <ul>
          {polls.map(poll => (
            <li key={poll._id} className="mb-2 p-4 border border-gray-300 rounded-lg">
              <h2 className="text-xl font-semibold">{poll.question}</h2>
              <Link to={`/vote/${poll._id}`} className="text-blue-500 hover:underline">
                Vote
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No polls available</div>
      )}
    </div>
  );
}

export default PollList;
