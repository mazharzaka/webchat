'use cleint'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { type Message as TMessage } from 'ai/react';

interface MessageProps {
  content: string,
  isUserMassge: string,
  newarr: TMessage[][]; // تعديل النوع ليطابق TMessage

}
function MMessage({ content, isUserMassge, newarr }: MessageProps) {
  const [text, setText] = useState("")
  // const [previousLan, setPreviousLan] = useState<'ar' | 'en' | null>(null);

  useEffect(() => {
    const handleTranslate = async (textc: string) => {
      try {
        const response = await axios.post<{ translatedText: string }>(
          'http://localhost:5000/translate',
          {
            text: textc,
            to: 'ar',
          }
        );
        setText(response.data.translatedText);
      } catch (error) {
        console.error('Error translating text:', error);
      }
    };

    // Regular expression to detect Arabic characters
    const arabic = /[\u0600-\u06FF]/;

    // تحديد اللغة بناءً على النص
    let lan: 'ar' | 'en' | null = null;
    const isArabic = (text:string) => /[\u0600-\u06FF]/.test(text);
    const arabicObjects = newarr.filter(item => isArabic(item[0].content));
   const values= arabicObjects.map(e=>e[1].content)
    values.includes(content)&& handleTranslate(content);
    

  }, [content, isUserMassge, newarr]);
  return (
    <>
      {isUserMassge === "user" ?
        <div className='flex p-1 '>

          <div className='bg-[#1F2937] rounded md:w-[300px] w-40 text-xs text-white max-w-full'>
            <div className='max-w-full p-1'>
              <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/download.jfif" alt="user" />
              <span className='ml-2 text-xs'>Mazhar </span>
            </div>
            <div className='p-2'>
              {content}
            </div>
          </div>
        </div> :
        <div className='flex justify-end p-1 '>
          {/* <button onClick={handleTranslate}>Translate</button> */}
          <div className='bg-[#3B4252] md:w-[300px] w-40 rounded text-xs text-white max-w-full'>
            <div className='max-w-full p-1'>
              <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/chat-bot.png" alt="user" />
              <span className='ml-2 text-xs'>Mr.bot </span>
            </div>
            <div className='p-2'>
              {text ? text : content}
            </div>
          </div>
        </div>}
      {/* <button onClick={handleTranslate}>Translate</button> */}
    </>
  )
}

export default MMessage