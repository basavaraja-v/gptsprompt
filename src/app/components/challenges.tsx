"use client"

import React, { useState, useEffect } from 'react';
import ChallengeCard from '../components/challenge_card';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { app } from '../firebase/config';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  status: string;
}

const Challenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const db = getFirestore(app);
        const challengesCollection = collection(db, 'challenges');
        const querySnapshot = await getDocs(query(challengesCollection, orderBy('status'), limit(6)));
        const challengesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Challenge));
        setChallenges(challengesData);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        // Handle error appropriately
      }
    };


    fetchChallenges();
  }, []);

  return (
    <section>

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 border-b-4 border-blue-500 pb-2">Challenges</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Challenges;
