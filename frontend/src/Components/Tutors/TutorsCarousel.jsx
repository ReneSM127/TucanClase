import React from 'react';
import '../../Styles/Tutores.css';
import TutorCardFeatured from './TutorCardFeatured';
import TutorCard from './TutorCard';

const TutorsCarousel = ({ tutors }) => {
  return (
    <div className="tutors-carousel">
      {tutors.map(tutor => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
};

export default TutorsCarousel;