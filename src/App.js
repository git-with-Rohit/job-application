import React, { useState } from 'react';
import MailReceived from './components/MailReceived';
import EnvelopeModal from './components/EnvelopeModal';
import CoverLetter from './components/CoverLetter';
import Resume from './components/Resume';

const App = () => {
  const [stage, setStage] = useState('mail'); // 'mail', 'envelope', 'coverLetter', 'resume'

  const handleMailOpened = () => {
    setStage('envelope');
  };

  const handleEnvelopeOpened = () => {
    setStage('coverLetter');
  };

  const handleShowResume = () => {
    setStage('resume');
  };

  return (
    <div>
      {stage === 'mail' && <MailReceived onMailOpened={handleMailOpened} />}
      {stage === 'envelope' && <EnvelopeModal onOpen={handleEnvelopeOpened} />}
      {stage === 'coverLetter' && <CoverLetter showResume={handleShowResume} />}
      {stage === 'resume' && <Resume />}
    </div>
  );
};

export default App;
