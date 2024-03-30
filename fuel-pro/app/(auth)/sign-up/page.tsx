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



    if (isSignedUp) {
        return redirect('/profile'); // Redirect to dashboard after successful signup
    }

    return (
        <div className=' mt-24 rounded bg-black/70 py-10 px-6 md:mt-0 md:max-w-sm md:px-14 '>
            <form onSubmit={handleSubmit}>
                <h1 className=' text-3xl font-semibold text-white'>Sign up</h1>
                <div className=' space-y-4 mt-5'>
                    <Input type='username' name='username' placeholder='username' className=' bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block' required onChange={handleChange}/>
                    <Input type='password' name='password' placeholder='password' className=' bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block' required onChange={handleChange}/>
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
