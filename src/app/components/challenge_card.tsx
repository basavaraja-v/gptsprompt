import React, { useState } from 'react';
import useAuth from '../hooks/useauth'; // Assuming you have a hook named useAuth
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '../firebase/config';
import Link from 'next/link';

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  status: string;
}

const ChallengeCard = ({ id, title, description, difficulty, category, status }: ChallengeCardProps) => {
  const { user } = useAuth(); // Obtain user once at the beginning of the component
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [promptType, setPromptType] = useState('');
  const [promptError, setPromptError] = useState('');
  const [promptTypeError, setPromptTypeError] = useState('');

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPromptError('');
    setPromptTypeError('');
  };

  const handleSubmit = async () => {
    // Ensure user is authenticated
    if (!user) {
      console.error('Authentication state is not yet resolved or user is not signed in.');
      // Optionally, you can display a loading indicator or a message to the user
      return;
    }

    // Validate prompt and promptType
    if (!prompt.trim()) {
      setPromptError('Prompt is required.');
      return;
    } else {
      setPromptError('');
    }

    if (!promptType) {
      setPromptTypeError('Prompt Type is required.');
      return;
    } else {
      setPromptTypeError('');
    }

    try {
      // Add the prompt to the 'challenge_prompts' collection
      const db = getFirestore(app);
      await addDoc(collection(db, 'challenge_prompts'), {
        challengeId: id,
        userId: user.uid,
        prompt: prompt,
        promptType: promptType,
        createdAt: new Date(),
        upvotes: 0
      });

      // Close the modal after successful submission
      setIsModalOpen(false);

      // Reset prompt and promptType if needed
      setPrompt('');
      setPromptType('');

      // Optionally, you can add further actions such as showing a success message
      console.log('Prompt submitted successfully!');
    } catch (error) {
      // Handle errors
      console.error('Error adding prompt:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm relative overflow-hidden">
      <div className={`absolute top-0 left-0 transform -translate-x-1/2 ${status === 'O' ? 'bg-green-500' : 'bg-red-500'} text-white font-bold py-1 px-2 rounded-full text-xs`} style={{ transform: 'rotate(-45deg)', zIndex: 1 }}>
        {status === 'O' ? 'Open' : 'Closed'}
      </div>

      <div className="p-2">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-800">{difficulty}</span>
            <span className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-800">{category}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {user && status === 'O' && (<button onClick={handleModalOpen} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Submit Prompt
        </button>
        )}
        <Link href={`/submissions/${id}`}>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            View Submissions
          </button>
        </Link>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 sm:mx-auto sm:w-full sm:max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Submit Prompt</h2>
            <div className="mb-4">
              <label htmlFor="prompt" className="block text-gray-700 text-sm font-bold mb-2">Prompt:</label>
              <input type="text" id="prompt" name="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter prompt" />
              {promptError && <p className="text-red-500 text-xs italic">{promptError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="promptType" className="block text-gray-700 text-sm font-bold mb-2">Prompt Type:</label>
              <select
                id="promptType"
                name="promptType"
                value={promptType}
                onChange={(e) => setPromptType(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Prompt Type</option>
                <option value="ChatGPT">ChatGPT</option>
                <option value="Gemini">Gemini</option>
              </select>
              {promptTypeError && <p className="text-red-500 text-xs italic">{promptTypeError}</p>}
            </div>
            <div className="flex justify-end">
              <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Submit
              </button>
              <button onClick={handleModalClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;
