import React from 'react'
import Hero from '../Components/Hero/Hero';
import Beneficios from '../Components/Beneficios/Beneficios';
import TutoriasHome from '../Components/TutoriasHome/TutoriasHome'

const Home = () => {
  return (
    <div>
      <Hero />
      <Beneficios/>
      <TutoriasHome/>
    </div>
  )
}

export default Home