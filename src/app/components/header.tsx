// src/components/Header.tsx
"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import useAuth from '../hooks/useauth'; // Import the custom hook
import Signup from './signup';
import Signin from './signin';
import { auth } from '../firebase/config';

const Header = () => {
    const { user } = useAuth(); // Use the custom hook to check authentication state
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin'); // Default to signin tab
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Track whether the drawer is open

    const toggleAuthModal = () => {
        setShowAuthModal(!showAuthModal);
        setActiveTab('signin'); // Default to signin tab when the modal is opened
    };

    const handleAuthSuccess = () => {
        setShowAuthModal(false); // Close the modal upon successful sign-up or sign-in
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <header className="bg-white custom-text py-4 shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center">
                    <button className="lg:hidden" onClick={toggleDrawer}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <a className="flex items-center" href="/">
                        <Image src="/logo.png" alt="GPTSPrompt Logo" width="40" height="40" />
                        <span className="font-bold text-xl ml-2">GPTS Prompt</span>
                    </a>
                </div>
                <nav className="hidden lg:flex">
                    <ul className="flex space-x-6">
                        <li className="px-4 py-2 font-medium">
                            <Link href="/challenges">Challenges</Link>
                        </li>

                        {user ? (
                            // If user is signed in, show the username and sign-out button
                            <div className="flex items-center">
                                <p className="mr-4">Hello, {user.displayName}</p>
                                {user.user_access === 'A' && ( // Check user_access
                                    <button
                                        className="gradient-button px-4 py-2 rounded-md font-medium border border-gray-300 hover:bg-gray-100"
                                        onClick={() => { }} // Add your logic for "Add Challenge" here
                                    >
                                        <Link href={'/addchallenge'}> Add Challenge </Link>
                                    </button>
                                )}
                                <button
                                    className="gradient-button px-4 py-2 rounded-md font-medium border border-gray-300 hover:bg-gray-100"
                                    onClick={() => signOut(auth)}
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            // If user is not signed in, show sign-up/login button
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="gradient-button px-4 py-2 rounded-md font-medium border border-gray-300 hover:bg-gray-100"
                            >
                                Sign Up / Log In
                            </button>
                        )}
                    </ul>
                </nav>
            </div>
            {/* Responsive Drawer */}
            {isDrawerOpen && (
                <div className="lg:hidden fixed top-0 left-0 w-full h-full z-50 bg-gray-800 bg-opacity-50" onClick={toggleDrawer}>
                    <div className="w-64 bg-white h-full shadow-lg">
                        <ul className="py-4">
                            <li className="px-4 py-2 font-medium">
                                <Link href="/challenges">Challenges</Link>
                            </li>
                            {user ? (
                                // If user is signed in, show the username and sign-out button
                                <li className="px-4 py-2 font-medium">

                                    <p className="mr-4">Hello, {user.displayName}</p>
                                    <br />
                                    {user.user_access === 'A' && ( // Check user_access
                                        <button
                                            className="gradient-button px-4 py-2 rounded-md font-medium border border-gray-300 hover:bg-gray-100"
                                            onClick={() => { }} // Add your logic for "Add Challenge" here
                                        >
                                            Add Challenge
                                        </button>
                                    )}
                                    <button
                                        className="gradient-button px-4 py-2 rounded-md font-medium border border-gray-300 hover:bg-gray-100"
                                        onClick={() => signOut(auth)}
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            ) : (
                                <li className="px-4 py-2 font-medium">
                                    <button
                                        onClick={() => setShowAuthModal(true)}
                                        className="gradient-button px-4 py-2 rounded-md font-medium border border-gray-300 hover:bg-gray-100"
                                    >
                                        Sign Up / Log In
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
            {/* Authentication Modal */}
            {showAuthModal && (
                <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
                    <div className="bg-black opacity-50 fixed top-0 left-0 w-full h-full" onClick={toggleAuthModal}></div>
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md z-60 relative">
                        <button className="absolute top-2 right-2 hover:text-gray-500" onClick={toggleAuthModal}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <ul className="flex mb-4 ">
                            <li className="mr-4">
                                <button
                                    className={`gradient-button border-b-2 border-blue-500 px-2 py-1 ${activeTab === 'signup' ? 'font-medium text-blue-500' : 'text-gray-500 hover:text-blue-500'
                                        }`}
                                    onClick={() => setActiveTab('signup')}
                                >
                                    Sign Up
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`gradient-button border-b-2 border-blue-500 px-2 py-1 ${activeTab === 'signin' ? 'font-medium text-blue-500' : 'text-gray-500 hover:text-blue-500'
                                        }`}
                                    onClick={() => setActiveTab('signin')}
                                >
                                    Sign In
                                </button>
                            </li>
                        </ul>
                        {activeTab === 'signin' ? <Signin onSuccess={handleAuthSuccess} onSignupClick={() => setActiveTab('signup')} /> : <Signup onSuccess={handleAuthSuccess} />}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

