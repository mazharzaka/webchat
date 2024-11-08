'use client'
import { useRouter } from 'next/navigation';


import { useEffect } from 'react';

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/about');
        }, 3000); // 3000 milliseconds = 3 seconds delay

        return () => clearTimeout(timer); // Cleanup in case the component unmounts
    }, [router]);

    return (<div className='flex items-center pt-1  justify-center h-screen bg-[#1E293B]'>
        <div className="animate-spin inline-block size-16 border-[3px] border-current border-t-transparent text-[#0EA5E9] rounded-full dark:text-[#0EA5E9]" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    </div>) // Display a loading message or spinner
}