import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase/config';

interface SignupFormData {
    displayName: string;
    user_name: string;
    email_id: string;
    user_password: string;
}

interface SignupProps {
    onSuccess: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<SignupFormData>({
        displayName: '',
        user_name: '',
        email_id: '',
        user_password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const db = getFirestore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'user_name') {
            // Remove special characters from username
            const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');
            setFormData({ ...formData, [name]: sanitizedValue });

            // Check if the username already exists
            const userQuery = query(collection(db, 'users'), where('user_name', '==', sanitizedValue));
            getDocs(userQuery)
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        setError('Username is already taken');
                    } else {
                        setError(null);
                    }
                })
                .catch((error) => {
                    console.error('Error checking username:', error);
                });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }



    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email_id, formData.user_password);

            // Add user data to Firestore
            const userDocRef = doc(db, 'users', userCredential.user.uid);

            await setDoc(userDocRef, {
                displayName: formData.displayName,
                user_name: formData.user_name,
                email_id: formData.email_id
            });

            // Reset form fields
            setFormData({
                displayName: '',
                user_name: '',
                email_id: '',
                user_password: ''
            });

            // Call onSuccess callback
            onSuccess(); // Add this line
        } catch (error: any) {
            // Handle specific authentication errors
            if (error.code === 'auth/weak-password') {
                setError('The password is too weak. Please choose a stronger password.');
            } else if (error.code === 'auth/email-already-in-use') {
                setError('The email address is already in use. Please use a different email.');
            } else {
                // Handle generic errors
                setError('An error occurred. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="mb-4">
                    <label htmlFor="displayName" className="block text-gray-700 font-medium mb-2">Display Name</label>
                    <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="user_name" className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email_id" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        id="email_id"
                        name="email_id"
                        value={formData.email_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="user_password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        id="user_password"
                        name="user_password"
                        value={formData.user_password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    type="submit"
                    className="gradient-button w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}

export default Signup;
