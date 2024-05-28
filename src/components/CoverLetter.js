import React, { useEffect, useState } from 'react';
import reactIcon from '../assests/icons/react.png';
import nodeIcon from '../assests/icons/node.png';
import awsIcon from '../assests/icons/aws.png';
import jsIcon from "../assests/icons/js.png";
import cppIcon from "../assests/icons/cpp.png"
import dockerIcon from '../assests/icons/docker.png';
import gitIcon from '../assests/icons/git.png';
import pythonIcon from '../assests/icons/python.png';
import sqlIcon from "../assests/icons/sql.png";
import cssIcon from "../assests/icons/css.png"

const icons = [
  reactIcon, nodeIcon, awsIcon, jsIcon, cppIcon, dockerIcon, gitIcon, pythonIcon, sqlIcon, cssIcon
];
// Duplicate the icons array
const duplicatedIcons = [...icons, ...icons];

const CoverLetter = ({ showResume }) => {
  const coverLetterText = `Dear JP Media Team,

I am writing to express my enthusiasm for the Full-Stack JavaScript Developer position at JP Media. With over four years of experience in full-stack development using technologies such as React, Node.js, and AWS, I am confident in my ability to contribute effectively to your team. My experience includes developing scalable web applications, optimizing performance, and collaborating with cross-functional teams to deliver high-quality solutions. I am particularly drawn to JP Media's innovative approach and commitment to excellence.

I look forward to the opportunity to discuss how my skills and experiences align with the goals of JP Media. Thank you for considering my application.

Best regards,
Rohit Kumar`;

  useEffect(() => {
    const iconElements = document.querySelectorAll('.icon');

    iconElements.forEach(icon => {
      let x = Math.random() * (window.innerWidth - 50);
      let y = Math.random() * (window.innerHeight - 50);
      let angle = Math.random() * 2 * Math.PI; // Random initial angle
      const speed = 0.5; // Adjust speed here

      const moveIcon = () => {
        x += Math.cos(angle) * speed;
        y += Math.sin(angle) * speed;

        // Check boundaries
        if (x + 50 >= window.innerWidth) {
          x = window.innerWidth - 50;
          angle = Math.PI - angle;
        }
        if (x <= 0) {
          x = 0;
          angle = Math.PI - angle;
        }
        if (y + 50 >= window.innerHeight) {
          y = window.innerHeight - 50;
          angle = -angle;
        }
        if (y <= 0) {
          y = 0;
          angle = -angle;
        }

        icon.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(moveIcon);
      };

      moveIcon();
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-pink-500 relative overflow-hidden">
      {duplicatedIcons.map((icon, index) => (
        <img
          key={index}
          src={icon}
          alt={`icon-${index}`}
          className="icon absolute w-10 h-10"
          style={{ top: Math.random() * (window.innerHeight - 50) + 'px', left: Math.random() * (window.innerWidth - 50) + 'px' }}
        />
      ))}
      <div className="relative z-10 bg-white bg-opacity-90 p-10 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-blue-500 mb-4">Cover Letter</h2>
        <pre className="whitespace-pre-wrap text-lg leading-7">{coverLetterText}</pre>
        <button 
          onClick={showResume} 
          className="absolute bottom-5 right-5 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Open Resume
        </button>
      </div>
    </div>
  );
};
export default CoverLetter;