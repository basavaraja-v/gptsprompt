import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

interface SigninFormData {
    email: string;
    password: string;
}

interface SigninProps {
    onSuccess: () => void;
    onSignupClick: () => void; // Add onSignupClick prop
}

const Signin: React.FC<SigninProps> = ({ onSuccess, onSignupClick }) => {
    const [formData, setFormData] = React.useState<SigninFormData>({
        email: '',
        password: ''
    });
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            setFormData({ email: '', password: '' });
            onSuccess();
        } catch (error: any) {
            // Handle specific authentication errors
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setError('Incorrect email or password. Please try again.');
            } else {
                // Handle generic errors
                setError('An error occurred. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleSignupClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onSignupClick(); // Invoke the onSignupClick callback
    }

    return (
        <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <form onSubmit={handleSignin}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
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
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
            <p className="mt-2 text-gray-600">
                Don't have an account?{' '}
                <a href="#" onClick={handleSignupClick} className="text-blue-500 underline">Sign up</a>
            </p>
        </div>
    );
}

export default Signin;
