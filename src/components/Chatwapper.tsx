'use client'
import { Message, useChat } from 'ai/react'
import React from 'react'
import Messagee from './Message'

export const Chatwapper = ({ sessionId,initialMessages }: { sessionId: string ,initialMessages: Message[]}) => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat-stream",
        body: { sessionId },
        initialMessages
    }
    )
    // console.log(input==="");
    
    return (
        <div className='flex items-center pt-1  flex-col h-screen bg-[#1E293B]'>
            <div className='md:w-[600px] w-72 h-full rounded mb-2 bg-[#334155]'>
                <Messagee messages={messages} />

                <form onSubmit={handleSubmit}  className='flex justify-center'>
                    <input type="text" value={input} className='w-40 md:w-96 h-10 outline-none rounded-l-lg text-sm bg-[#6B7280] placeholder-slate-800 text-black ' placeholder='Type your message here...' onChange={handleInputChange} />
                    <button disabled={input===""} className='w-14 text-black flex justify-center items-center disabled:bg-gray-600 disabled:opacity-25 bg-[#ffff] h-10 rounded-r-lg disabled:text-white' type={input===""?"button":'submit'}>
                        <img className='w-8 ' src="/text.png" alt="arrow" />
                    </button>
                </form></div>
        </div>
    )
}

