import React from 'react';
import envelopeImage from '../assests/envelope.jpg';

const EnvelopeModal = ({ onOpen }) => (
  <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-pink-500">
    <div className="relative w-full max-w-md h-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 cursor-pointer">
      <img src={envelopeImage} alt="Envelope" className="w-full h-full object-cover" />
      <button 
        onClick={onOpen} 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors"
      >
        Open
      </button>
    </div>
  </div>
);

export default EnvelopeModal;
