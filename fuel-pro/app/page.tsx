// 'use client';

// import Image from "next/image";
// import Dashboard from "./dashboard/page";


// const Home = () => {
//   return (
//     <>
//     <div>
//       <Dashboard />
//     </div>

//     </>
  
//   );
// }

// export default Home


import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from './utils/auth'
import { redirect } from 'next/navigation'
import NextAuth from 'next-auth/next'


export default async function Home() {
  const session = await getServerSession(authOptions);

  if(!session) {
    return redirect('/login');

  }
  else {
    return redirect('/dashboard');
  }
  return (
    <div className=' text-black m-6 '>
      <Button>Hello from home</Button>
      <h1 className=' text-black'>{session?.user?.name}</h1>
      {/* <Dashboard /> */}
    </div>
  )
}