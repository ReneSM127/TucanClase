import React from 'react';
import '../../Styles/Tutores.css';

const TutorsSection = ({ title, children }) => {
  return (
    <section className="tutors-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default TutorsSection;