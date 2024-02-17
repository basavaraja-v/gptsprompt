import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase/config';

interface User {
    uid: string;
    email: string;
    displayName: string;
    user_access: string;
}

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const db = getFirestore();
                const userRef = doc(db, 'users', authUser.uid);
                const userSnapshot = await getDoc(userRef);
                const userData = userSnapshot.data();
                if (userData) {

                    setUser({
                        uid: authUser.uid,
                        email: authUser.email || '',
                        displayName: userData.displayName || '',
                        user_access: userData.user_access || 'U'

                    });
                } else {
                    setUser({
                        uid: authUser.uid,
                        email: authUser.email || '',
                        displayName: '',
                        user_access: 'U',
                    });
                }
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
};

export default useAuth;
