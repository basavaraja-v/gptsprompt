"use client"

import { useState, useEffect } from 'react';
import { app } from '../firebase/config'; // Assuming your Firebase configuration
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface Prompt {
  id: string;
  prompt: string;
  userId: string; // Assuming this is the correct type
  user: { user_name: string; displayName: string }; // Assuming this is the correct type
  upvotes: number; // Assuming this is the correct type
}

const CommunityPrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]); // Specify the type of 'prompts' explicitly
  const db = getFirestore(app);
  const promptsRef = collection(db, 'challenge_prompts');
  const usersRef = collection(db, 'users');

  useEffect(() => {
    const fetchPrompts = async () => {
      const querySnapshot = await getDocs(promptsRef);
      const fetchedPrompts: Prompt[] = []; // Specify the type of 'fetchedPrompts' explicitly

      querySnapshot.forEach((promptDoc) => {
        const promptData = promptDoc.data();
        fetchedPrompts.push({ ...promptData, id: promptDoc.id } as Prompt); // Add document ID and cast to 'Prompt' type
      });

      // Fetch User Data for each prompt
      const updatedPrompts = await Promise.all(fetchedPrompts.map(async (prompt) => {
        const userRef = doc(usersRef, prompt.userId);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        return { ...prompt, user: userData } as Prompt; // Cast to 'Prompt' type
      }));

      setPrompts(updatedPrompts);
    };

    fetchPrompts();
  }, []);

  const handleUpvote = async (promptId: string) => { // Specify the type of 'promptId' explicitly
    try {
      const promptRef = doc(db, 'challenge_prompts', promptId);
      // Use Firestore's 'increment' function for atomic updates
      await updateDoc(promptRef, { upvotes: increment(1) });

      // You might want to refetch or optimistically update 'prompts' state 
    } catch (err) {
      console.error("Upvote Error:", err);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Community Prompts</h2>
      {prompts.map(prompt => (
        <div key={prompt.id} className="bg-white shadow-md rounded-md p-4 mb-4">
          <p className="text-lg font-semibold mb-2">{prompt.prompt}</p>
          <div className="text-sm text-gray-600">By: @{prompt.user.user_name} ({prompt.user.displayName})</div>

          <div className="mt-4 flex items-center">
            <CopyToClipboard text={prompt.prompt}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">Copy</button>
            </CopyToClipboard>

            <button onClick={() => handleUpvote(prompt.id)} className="bg-green-500 text-white px-4 py-2 rounded-md">
              Upvote ({prompt.upvotes})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityPrompts;
