'use client';

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/utils/auth'
import { redirect } from 'next/navigation'
import GithubSignInButton from '@/app/components/GithubSignInButton'
import GoogleSignInButton from '@/app/components/GoogleSignInButton'
import axios from 'axios'

function SignUp() {
    // const session = await getServerSession(authOptions);

    // if(session){
    //     return redirect('/dashboard');
    // }

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [isSignedUp, setIsSignedUp] = useState<boolean>(false); // Change state name to reflect signup status

    const [validationError, setValidationError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const validateInputs = () => {
        if (!formData.username.trim() || !formData.password.trim()) {
            setValidationError('Please fill in all fields.');
            return false;
        }
        setValidationError(null);
        return true;
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        if (!validateInputs()) {
            return;
        }
        try {
            const response = await axios.post("http://localhost:4000/signup", formData, { withCredentials: true });

            if (response.data) {
                console.log('Signup successful:', response.data);
                setFormData({ username: '', password: '' });
                setError(null);
                setIsSignedUp(true); // Update state to reflect signup success
            } else {
                console.error('Unable to signup');
                setError('unable to signup');
                setIsSignedUp(false);
            }

        } catch (error: any) {
            console.error('Error during signup:', error);
            setError(error.response.data.error);
        }
    };

    if (isSignedUp) {
        return redirect('/profile'); // Redirect to dashboard after successful signup
    }

    return (
        <div className=' mt-24 rounded bg-black/70 py-10 px-6 md:mt-0 md:max-w-sm md:px-14 '>
            <form onSubmit={handleSubmit}>
                <h1 className=' text-3xl font-semibold text-white'>Sign up</h1>
                <div className=' space-y-4 mt-5'>
                    <Input type='username' name='username' placeholder='username' className=' text-white bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block' required onChange={handleChange} />
                    <Input type='password' name='password' placeholder='password' className=' text-white bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block' required onChange={handleChange} />
                    {validationError && (
                        <p className="text-red-500 text-sm">Error{validationError}</p>
                    )}
                    <Button type='submit' variant='destructive' className=' w-full text-black bg-[#bbb9b9] hover:bg-slate-500'>Sign up</Button>
                </div>
            </form>
            <div className='text-gray-400 text-sm mt-2'>
                Already have an account?
                <Link className=' text-white ml-2 underline' href='/login'>  Log in now!! </Link>
            </div>

            <div className=' flex w-full justify-center items-center gap-x-3 mt-6'>
                <GoogleSignInButton />
                <GithubSignInButton />


            </div>
        </div>
    )
}

export default SignUp
