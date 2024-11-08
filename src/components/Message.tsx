import { type Message as TMessage } from 'ai/react'
import React from 'react'
import MMessage from './MMessage'
interface MassagesProps {
    messages: TMessage[]

}

function Messagee({ messages }: MassagesProps) {

    return (
        <div className='flex h-[90%] flex-col flex-1 overflow-y-auto'>
          {messages.length!==0 ? (
        messages.map((e, i) => (
          <MMessage key={i} content={e.content} isUserMassge={e.role==="user"}/>
        ))
      ) : (
        <div className='flex h-[90%] flex-col flex-1  justify-center items-center' >
          <img src="/chatbot-robot-14060 (2).png" className='md:w-56 w-40' alt="" />
        </div>
      )}
        </div>
    )
}

export default Messagee