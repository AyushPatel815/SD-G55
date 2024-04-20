'use client';

import React, { useState } from 'react'
import GithubSignInButton from '@/app/components/GithubSignInButton'
import GoogleSignInButton from '@/app/components/GoogleSignInButton'
import { useRouter } from 'next/router'; // Import useRouter hook
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import axios from 'axios'
import { redirect } from 'next/navigation';

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
        console.log(formData)

        try {

            const response = await axios.post("http://localhost:4000/user", formData, { withCredentials: true });

            console.log('Login successful:', response.data);

            if (response.data) {
                console.log('User logged in successfully');
                setFormData({ username: '', password: '' });
                setError(null);
                setIsValidUser(true);
                setIsLoggedIn(true);
                // redirect('/dashboard');
            } else {
                console.error('Invalid credentials');
                setError('Invalid credentials');
                setIsValidUser(false);
                setIsLoggedIn(false);
            }
        } catch (error: any) {
            console.error('Error during login:', error);
            setError(error.response.data.error);
            setIsValidUser(false);
        }
    };

    if (isLoggedIn) {
        return redirect('/dashboard'); // Redirect if logged in
    }

    return (
        <div className=' mt-24 relative rounded bg-black/70 py-10 px-6 md:mt-0 md:max-w-sm md:px-14 '>
            <form onSubmit={handleSubmit}>
                <h1 className=' text-3xl font-semibold text-white'>Log in</h1>
                <div className=' space-y-4 mt-5'>
                    <Input type='text' name='username' placeholder='Username' className=' bg-[#333] placeholder:text-xs text-white placeholder:text-gray-400 w-full inline-block' required onChange={handleChange} />
                    <Input type='password' name='password' placeholder='Password' className=' text-white bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block' required onChange={handleChange} />
                    <Button type='submit' variant='destructive' className=' w-full text-black bg-[#bbb9b9] hover:bg-slate-500'>Log in</Button>
                </div>
            </form>
            <div className='text-gray-400 text-sm mt-2'>
                New to Fuel Pro?
                <Link className=' text-white ml-2 underline' href='/sign-up'> Sign up now </Link>
            </div>
            <div className=' flex w-full justify-center items-center gap-x-3 mt-6'>
                <GoogleSignInButton />
                <GithubSignInButton />
            </div>
        </div>
    );
}


export default Login;
