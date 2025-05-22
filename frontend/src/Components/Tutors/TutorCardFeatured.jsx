import React from 'react';
import '../../Styles/Tutores.css';

const TutorCardFeatured = ({ tutor }) => {
  return (
    <div className="tutor-card featured">
      <div className="tutor-avatar">
        <img src={tutor.avatar} alt={tutor.name} />
        <span className="rating">{tutor.rating}</span>
      </div>
      <div className="tutor-info">
        <h3>{tutor.name}</h3>
        <p className="subject">{tutor.subject}</p>
        <p className="review">"{tutor.review}"</p>
      </div>
    </div>
  );
};

export default TutorCardFeatured;