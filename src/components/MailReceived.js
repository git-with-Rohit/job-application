import React, { useEffect, useState } from 'react';
import mailIcon from '../assests/icons/mail_incoming.png'

const MailReceived = ({ onMailOpened }) => {
    const [showMail, setShowMail] = useState(false);
    const [showHeresMine, setShowHeresMine] = useState(false);
    const [showOpenText, setShowOpenText] = useState(false);
  
    useEffect(() => {
      setTimeout(() => setShowHeresMine(true), 2000); 
      setTimeout(() => setShowMail(true), 2500);
      setTimeout(() => setShowOpenText(true), 3000);
    }, []);
  
    return (
      <div className="relative flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-pink-500">
        <div className="absolute top-1/4 text-white text-4xl font-semibold">
          Everyone has a story.
        </div>
        {showHeresMine && (
          <div className="absolute top-1/3 text-white text-2xl font-semibold">
            Here's mine
          </div>
        )}
        {showMail && (
          <div className="flex flex-col items-center mt-10">
            <div 
              className={`transform transition-transform duration-500 hover:scale-110 cursor-pointer ${showOpenText ? 'animate-pulse' : ''} animate-slide-in-bottom`}
              onClick={onMailOpened}
            >
              <img 
                src={mailIcon} 
                alt="Mail Icon" 
                className="w-48 h-48"
              />
            </div>
            {showOpenText && (
              <div className="text-white text-xl font-semibold mt-4 transition-opacity duration-1000">
                You got a new Mail. Click on it to take a look!
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default MailReceived;