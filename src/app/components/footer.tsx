import React from 'react';
import Link from 'next/link';

const Footer = () => (
    <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <div>
                <p>&copy; {new Date().getFullYear()} GPTs Prompt - Made with <span style={{ color: 'red', fontSize: 20 }}>&hearts;</span></p>
            </div>
            <div className="flex">
                <Link href="/privacypolicy" className="ml-4 text-blue-300 hover:text-blue-500">Privacy Policy
                </Link>
                <Link href="/about" className="ml-4 text-blue-300 hover:text-blue-500">About
                </Link>
                <Link href="/contact" className="ml-4 text-blue-300 hover:text-blue-500">Contact
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;
