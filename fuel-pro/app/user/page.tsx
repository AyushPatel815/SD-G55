'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [isValidUser, setIsValidUser] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Form data:', formData);
        // const user = await prisma.user.findMany()
        // return{
        //     props:{
        //         allUser: user
        //     }
        // }
        try {
            // Make a POST request to the backend API route
            // const response = await axios.post('/api/user/index', formData);
            const response = await axios.post("/api/user/index", formData);

            console.log('Login successful:', response.data);
            // Reset form data and error state after successful login
            setFormData({ username: '', password: '' });
            setError(null);
            setIsValidUser(true);
            setIsLoggedIn(true); // Update isLoggedIn state to true after successful login
            return redirect('/dashboard');

        } catch (error: any) {
            console.error('Error during login:', error);
            // Set error state with the error message
            setError(error.response.data.message);
            setIsValidUser(false);
        }
    };

    if (isLoggedIn) {
        return redirect('/dashboard');
    }

    return (
        <div>
            <h1>Login</h1>
            {isValidUser && <p>Valid user</p>}
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
