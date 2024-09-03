import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
   // some check
    if (!option1.trim() || !option2.trim() || !option3.trim()) {
      alert('Please fill all options.');
      return;
    }
    try {
        // eslint-disable-next-line
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/polls`, { question, options: [option1, option2, option3] });
      history.push(`/polls`);
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">Create a New Poll</h1>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          placeholder="Option 1"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          placeholder="Option 2"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
          placeholder="Option 3"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 m-2 rounded-lg hover:bg-green-600">
          Create Poll
        </button>
      </form>
    </div>
  );
}

export default CreatePoll;
