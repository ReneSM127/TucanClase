import React from 'react';
import '../../Styles/Tutores.css';

const TutorCard = ({ tutor }) => {
  return (
    <div className="tutor-card">
      <div className="tutor-header">
        <h3>{tutor.name}</h3>
      </div>
      <p className="description">{tutor.description}</p>
      <div className="subjects">
        {tutor.subjects.map((subject, index) => (
          <span key={index} className="subject-tag">{subject}</span>
        ))}
      </div>
      <button className="profile-button">Revisar Perfil</button>
    </div>
  );
};

export default TutorCard;