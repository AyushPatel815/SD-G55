'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Googleicon from '../../public/google-icon.png'
import { signIn } from 'next-auth/react';


function GoogleSignInButton() {
  return (
    <Button onClick={()=> signIn('google')} variant='outline' size='icon'>
        <Image src={Googleicon} alt='GoogleIcon' className=' w-7 h-7' />
    </Button>
 
 
 )
}

export default GoogleSignInButton
