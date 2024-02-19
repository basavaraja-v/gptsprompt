"use client"

import { useState, useEffect } from 'react';
import { app } from '../firebase/config';
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useAuth from '../hooks/useauth'; // Assuming you have a hook named useAuth
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Prompt {
  id: string;
  prompt: string;
  userId: string;
  user: { user_name: string; displayName: string };
  upvotes: number;
  promptType: string;
  challengeId: string;
  challengeTitle: string;
}

interface UserData {
  user_name: string;
  displayName: string;
}

const PromptsPage = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const db = getFirestore(app);
  const promptsRef = collection(db, 'challenge_prompts');
  const usersRef = collection(db, 'users');
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth(); // Obtain user once at the beginning of the component

  const formatNumber = (num: number): string => {
    const absNum = Math.abs(num);
    const abbreviations = ["K", "M", "B", "T"];
    const decimals = 1;

    for (let i = abbreviations.length - 1; i >= 0; i--) {
      const size = Math.pow(10, (i + 1) * 3);

      if (size <= absNum) {
        return `${Math.round(num * 10 / size) / 10}${abbreviations[i]}`;
      }
    }

    return num.toString();
  };

  const handleUpvote = async (promptId: string, userId: string) => {
    try {
      if (user) {
        if (user.uid !== userId) {
          const promptRef = doc(db, 'challenge_prompts', promptId);
          const promptDoc = await getDoc(promptRef);

          if (promptDoc.exists()) {
            const promptData = promptDoc.data();
            const existingUpvoteUsers = promptData.upvote_users || [];

            if (!existingUpvoteUsers.includes(user.uid)) {
              await updateDoc(promptRef, {
                upvotes: increment(1),
                upvote_users: arrayUnion(user.uid)
              });
              toast.success('Upvoted!');
            } else {
              toast.warning('You have already upvoted this prompt.');
            }
          } else {
            toast.error('Prompt not found.');
          }
        }
      }
    } catch (err) {
      console.error("Upvote Error:", err);
    }
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const querySnapshot = await getDocs(promptsRef);
      const fetchedPrompts: Prompt[] = [];

      querySnapshot.forEach((promptDoc) => {
        const promptData = promptDoc.data();
        fetchedPrompts.push({ ...promptData, id: promptDoc.id } as Prompt);
      });

      // Fetch User Data and Challenge Title for each prompt
      const updatedPrompts = await Promise.all(fetchedPrompts.map(async (prompt) => {
        const userRef = doc(usersRef, prompt.userId);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data() as UserData;

        // Fetch associated challenge title if challengeId is available
        let challengeTitle = '';
        if (prompt.challengeId) {
          const challengeRef = doc(db, 'challenges', prompt.challengeId);
          const challengeDoc = await getDoc(challengeRef);
          const challengeData = challengeDoc.data();
          challengeTitle = challengeData?.title || ''; // Use optional chaining to access title safely
        }

        return { ...prompt, user: userData, challengeTitle } as Prompt;
      }));

      setPrompts(updatedPrompts);
    };

    fetchPrompts();
    setLoading(false);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 border-b-4 border-blue-500 pb-2">Prompts</h2>
        {loading ? (
          <div className="text-center mt-8">Loading...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt) => (
              <div key={prompt.id} className="bg-white shadow-md rounded-md p-4">
                <p className="text-lg font-semibold mb-2 text-gray-800">{prompt.prompt}</p>
                <p className="text-sm font-semibold mb-2 text-gray-600">Challenge: {prompt.challengeTitle}</p>
                <div className="text-sm text-gray-600 mb-2">By: @{prompt.user.user_name} ({prompt.user.displayName})</div>
                <div className="text-sm text-gray-600 mb-2">Type: {prompt.promptType}</div>
                <div className="flex items-center">
                  <CopyToClipboard text={prompt.prompt} onCopy={() => toast.info('Copied!')}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Copy</button>
                  </CopyToClipboard>

                  <button onClick={() => handleUpvote(prompt.id, prompt.userId)} className="bg-green-500 text-white px-4 py-2 rounded-md">
                    Upvote ({formatNumber(prompt.upvotes)})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ margin: "auto" }} // Center the toast notifications
      />
    </div>
  );
};

export default PromptsPage;
