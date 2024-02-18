'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import React from 'react'
import { FaGithub } from 'react-icons/fa';

function GithubSignInButton() {
  return (
    <Button onClick={ () => signIn('github') } variant='outline' size='icon'>
      <FaGithub className=' w-6 h-6 text-white' />
    </Button>
  )
}

export default GithubSignInButton
