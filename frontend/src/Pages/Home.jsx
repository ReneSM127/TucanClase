import React from 'react'
import Hero from '../Components/Hero/Hero';
import Beneficios from '../Components/Beneficios/Beneficios';
import TutoriasHome from '../Components/TutoriasHome/TutoriasHome'
import TestimoniosHome from '../Components/TestimoniosHome/TestimoniosHome';

const Home = () => {
  return (
    <div>
      <Hero />
      <Beneficios/>
      <TestimoniosHome/>
    </div>
  )
}

export default Home