import React from 'react';
import '../../Styles/Tutores.css';
import TutorCard from './TutorCard';

const TutorsGrid = ({ tutors }) => {
  return (
    <div className="tutors-grid">
      {tutors.map(tutor => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
};

export default TutorsGrid;