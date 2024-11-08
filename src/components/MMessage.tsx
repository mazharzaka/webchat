'use cleint'
import React from 'react'
interface MessageProps {
  content: string,
  isUserMassge: boolean
}
function MMessage({ content, isUserMassge }: MessageProps) {
  // const [text, setText] = useState('');
  // const [translatedText, setTranslatedText] = useState('');
  // const [targetLanguage, setTargetLanguage] = useState('es'); // Example target language

  // const handleTranslate = async () => {
  //   const response = await fetch('/api/translate', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ content, targetLanguage }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
    
  //   setTranslatedText(data.translation);
  // };
  return (
    <>
    {isUserMassge?
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
    </div>:
    <div className='flex justify-end p-1 '>
      {/* <button onClick={handleTranslate}>Translate</button> */}
    <div className='bg-[#3B4252] md:w-[300px] w-40 rounded text-xs text-white max-w-full'>
      <div className='max-w-full p-1'>
        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/chat-bot.png" alt="user" />
        <span className='ml-2 text-xs'>Mr.bot </span>
      </div>
      <div className='p-2'>
        {content}
      </div>
    </div>
  </div>}
  {/* <button onClick={handleTranslate}>Translate</button> */}
  </>
  )
}

export default MMessage