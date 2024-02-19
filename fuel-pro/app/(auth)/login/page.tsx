

import React from 'react'
import GithubSignInButton from '@/app/components/GithubSignInButton'
import GoogleSignInButton from '@/app/components/GoogleSignInButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/utils/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


import Link from 'next/link'


async function Login () {
  const session = await getServerSession(authOptions);

  if (session){
    return redirect('/dashboard');
  }


  return (
    <div className=' mt-24 rounded bg-black/70 py-10 px-6 md:mt-0 md:max-w-sm md:px-14 '>
            <form action="">
                <h1 className=' text-3xl font-semibold text-white'>Log in</h1>
                <div className=' space-y-4 mt-5'>
                    <Input type='email' name='email' placeholder='Email' className=' bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block' />
                    <Button type='submit' variant='destructive' className=' w-full text-black bg-[#bbb9b9] hover:bg-slate-500'>Log in</Button>
                </div>
            </form>
            <div className='text-gray-400 text-sm mt-2'>
                New to Fuel Pro?
                <Link className=' text-white' href='/sign-up'> Sign up now </Link>
            </div>

            <div className=' flex w-full justify-center items-center gap-x-3 mt-6'>
                <GoogleSignInButton />
                <GithubSignInButton />

            </div>
        </div>

  );
}


export default Login