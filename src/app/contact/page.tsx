import React from 'react';

const ContactPage = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-8">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Contact Us</h1>
                    <p className="text-gray-700 dark:text-gray-300">
                        If you have any questions, feedback, or inquiries, please feel free to contact us. We&apos;re always happy to hear from you!
                    </p>
                    <div className="mt-6">
                        <p className="text-gray-700 dark:text-gray-300">Email: basavaraja@heyidb.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
