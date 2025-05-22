import React from 'react';
import '../../Styles/Tutores.css';
import TutorCardFeatured from './TutorCardFeatured';

const TutorsCarousel = ({ tutors }) => {
  return (
    <div className="tutors-carousel">
      {tutors.map(tutor => (
        <TutorCardFeatured key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
};

export default TutorsCarousel;