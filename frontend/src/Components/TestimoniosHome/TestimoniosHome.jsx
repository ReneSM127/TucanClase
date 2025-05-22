import React from 'react';
import './TestimoniosHome.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Las tutorías de comprensión lectora fueron de gran ayuda. Ahora entiendo mejor los textos y mi escritura ha mejorado muchísimo. ¡Gracias por el apoyo!",
      author: "Sarah L.",
      link: "#sarah-story"
    },
    {
      id: 2,
      quote: "Historia siempre me pareció aburrida, pero con estas tutorías aprendí de manera divertida y comprensible. Ahora me gusta mucho más la materia.",
      author: "Emily R.",
      link: "#emily-story"
    },
    {
      id: 3,
      quote: "Siempre tuve dificultades con las matemáticas, pero gracias a las explicaciones claras del tutor, ahora me siento más seguro resolviendo problemas.",
      author: "Jason M.",
      link: "#jason-story"
    },
    {
      id: 4,
      quote: "Las clases de ciencias naturales fueron geniales. Me encantaron los ejemplos y experimentos, hicieron que aprender fuera más interesante.",
      author: "Michael K.",
      link: "#michael-story"
    }
  ];

  return (
    <section className="testimonials-section">  
      <div className="container">
        <div className="section-header">
            <h2 className="section-title">Testimonios de nuestros estudiantes👨🏿‍🎓</h2>
                <p className="section-subtitle">
             Descubra cómo nuestras tutorías han ayudado a otros estudiantes a mejorar su rendimiento académico y ganar confianza en sus habilidades.
             </p>
               <a href="#all-testimonials" className="view-all-button">View All</a>
        </div>
        
        <div className="divider"></div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <blockquote className="testimonial-quote">"{testimonial.quote}"</blockquote>
              <div className="testimonial-footer">
                <p className="testimonial-author">- {testimonial.author}</p>
                <a href={testimonial.link} className="read-more-link">Lea la historia completa</a>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;