"use client"

import React, { useState, useEffect } from 'react';
import ChallengeCard from '../components/challenge_card';
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { app } from '../firebase/config';

interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string;
    status: string;

}

const ChallengesPage = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            const db = getFirestore(app);
            const challengesCollection = collection(db, 'challenges');
            const snapshot = await getDocs(query(challengesCollection, orderBy('status')));
            const challengesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Challenge));
            setChallenges(challengesData);
        };

        fetchChallenges();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-900 border-b-4 border-blue-500 pb-2">Challenges</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {challenges.map((challenge) => (
                        <ChallengeCard key={challenge.id} {...challenge} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChallengesPage;
