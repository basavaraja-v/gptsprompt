import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-8">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">About Us</h1>
                    <p className="text-gray-700 dark:text-gray-300">
                        Prompt engineering is shaping the future of how we interact with technology. We founded GPTs Prompt to cultivate a space where this art form can thrive. Through playful challenges, shared knowledge, and a dash of friendly competition, we&apos;re unlocking the potential of AI, one well-crafted prompt at a time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
