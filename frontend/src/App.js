import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home'
import Register from './Pages/Register';
import Singup from './Pages/Singup'
import PruebaAPI from './Pages/PruebaAPI';
import Tutorial from './Pages/Tutorial';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/Singup' element={<Singup />}></Route>
          <Route path='/Tutorial' element={<Tutorial />} />

          <Route path='/Login' element={<LoginPage />} />
          <Route path='/prueba' element={<PruebaAPI userId={1} />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
