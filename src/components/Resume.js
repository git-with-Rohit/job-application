import React, { useEffect, useState } from 'react';
import './Resume.css';
import movieImage from '../assests/movie.jpg';
import tictactoeImage from '../assests/tictactoe.jpg';
import 'tailwindcss/tailwind.css';

const Resume = () => {
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/resume.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setResumeData(data))
      .catch(error => setError(error));
  }, []);

  useEffect(() => {
    document.querySelector('body').addEventListener('mousemove', eyeball);

    function eyeball(event) {
      let eyes = document.querySelectorAll('.eye');
      eyes.forEach((eye) => {
        const { left, top, width, height } = eye.getBoundingClientRect();
        const eyeCenterX = left + width / 2;
        const eyeCenterY = top + height / 2;
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);

        const pupilDistance = Math.min(width / 4, height / 4);
        const pupilX = pupilDistance * Math.cos(angle);
        const pupilY = pupilDistance * Math.sin(angle);

        const pupil = eye.querySelector('.pupil');
        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      });
    }
  }, []);

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  if (!resumeData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex justify-center bg-gradient-to-r from-indigo-500 to-pink-500 py-10 px-5 relative">
      <div className="fixed left-10 top-1/2 transform -translate-y-1/2 project-card flex flex-col items-center group">
        <a href="https://git-with-rohit.github.io/movie-database-site/" target="_blank" rel="noopener noreferrer">
          <img src={movieImage} alt="Movie Database Site" className="w-full h-48 object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105" />
        </a>
        <div className="absolute bottom-full mb-2 hidden group-hover:block w-64 bg-white text-black text-center text-sm rounded-lg shadow-lg p-2">
          Searching for a new movie to watch? Welcome to MovieFlix!
        </div>
      </div>
      <div className="resume-container bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-20">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{resumeData.name}</h1>
          <p className="text-lg text-gray-600">{resumeData.email} | {resumeData.phone} | {resumeData.location}</p>
          <p className="text-lg">
            <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a> | 
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</a>
          </p>
        </header>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-indigo-500 pb-2 mb-4">Summary</h2>
          <p className="text-gray-700">{resumeData.summary}</p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-indigo-500 pb-2 mb-4">Skills</h2>
          <div className="flex justify-between">
            <div className="w-1/2 pr-4 relative">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Key Skills</h3>
              <ul className="list-disc list-inside text-gray-700">
                {resumeData.skills.key_skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <div className="googly-eyes-container absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="eye">
                  <div className="pupil"></div>
                </div>
                <div className="eye">
                  <div className="pupil"></div>
                </div>
              </div>
              <div className="dialogue-box absolute top-2/4 left-1/4 transform -translate-x-1/2 translate-y-6 animate-pulse">
                Make sure to check the projects!
              </div>
            </div>
            <div className="w-1/2 pl-4">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Technical Skills</h3>
              {Object.entries(resumeData.skills.technical_skills).map(([category, skills], index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-semibold text-indigo-500">{category}</h4>
                  <p className="text-gray-700">{skills.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-indigo-500 pb-2 mb-4">Education</h2>
          <ul className="list-disc list-inside text-gray-700">
            {resumeData.education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.degree}</strong> from {edu.institution} ({edu.year})
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-indigo-500 pb-2 mb-4">Certifications</h2>
          <ul className="list-disc list-inside text-gray-700">
            {resumeData.certifications.map((cert, index) => (
              <li key={index}>
                <strong>{cert.name}</strong> from {cert.institution} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-indigo-500 pb-2 mb-4">Experience</h2>
          {resumeData.experience.map((job, index) => (
            <div key={index} className="mb-4">
              <h3 className="job-title text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-700">{job.company} | {job.duration}</p>
              <ul className="list-disc list-inside text-gray-700">
                {job.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex}>{resp}</li>
                ))}
              </ul>
              {job.achievements && (
                <>
                  <h4 className="text-lg font-semibold text-gray-800 mt-2">Achievements</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {job.achievements.map((ach, achIndex) => (
                      <li key={achIndex}>{ach}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-indigo-500 pb-2 mb-4">Awards</h2>
          <ul className="list-disc list-inside text-gray-700">
            {resumeData.awards.map((award, index) => (
              <li key={index}>
                <strong>{award.name}</strong> ({award.details}, {award.year})
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="fixed right-10 top-1/2 transform -translate-y-1/2 project-card flex flex-col items-center group">
        <a href="https://git-with-rohit.github.io/Tic-Tac-Toe/" target="_blank" rel="noopener noreferrer">
          <img src={tictactoeImage} alt="Tic-Tac-Toe" className="w-full h-48 object-cover rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105" />
        </a>
        <div className="absolute bottom-full mb-2 hidden group-hover:block w-64 bg-white text-black text-center text-sm rounded-lg shadow-lg p-2">
          Want to play a quick game of Tic-Tac-Toe with a friend or verse the AI?
        </div>
      </div>
    </div>
  );
};

export default Resume;
