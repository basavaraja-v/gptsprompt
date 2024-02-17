"use client"

import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase/config';

const AddChallenge = () => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        createdOn: new Date()
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const db = getFirestore(app);
    const challengesRef = collection(db, 'challenges');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            setError('Please fill out all fields.');
            return;
        }

        try {
            setSubmitting(true);
            await addDoc(challengesRef, {
                ...formData,
                status: 'O',
                difficulty: "Easy",
                category: "Creative"
            });
            // Reset form after successful submission
            setFormData({
                title: '',
                description: '',
                createdOn: new Date()
            });
            setError('');
            // Show success message or redirect to another page
        } catch (error) {
            setError('An error occurred. Please try again later.');
            // Handle submission errors
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}> {/* Overall padding */}
            <div style={{ marginBottom: '15px' }}> {/* Spacing between groups */}
                <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter title"
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    style={{ width: '100%', height: '100px', padding: '10px', border: '1px solid #ccc' }}
                />
            </div>

            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <button
                type="submit"
                disabled={submitting}
                style={{
                    padding: '12px 25px',
                    backgroundColor: submitting ? 'lightgray' : 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                {submitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
};

export default AddChallenge;
