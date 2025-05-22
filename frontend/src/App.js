import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home'
import Register from './Pages/Register';
import Login from './Pages/Login'
import EditarPerfil from './Pages/editarPerfil';
import Perfil from './Pages/Perfil';
import DashboardP from './Pages/ProfesorDashboard';
import PruebaAPI from './Pages/PruebaAPI';
import Tutorial from './Pages/Tutorial';
import Tutores from './Pages/Tutores';
import Contactar from './Pages/Contactar';
import AlumnosDashboard from './Pages/AlumnosDashboard';
import CrearTutoria from './Pages/CrearTutoria';
import { AuthProvider } from './Context/AuthContext';
/*import LoginPage from './Pages/LoginPage';*/
import { ProtectedRoute } from './Components/ProtectedRoutes';
import Prohibido from './Pages/Prohibido'


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            
            <Route path='/' element={<Home />}></Route>
            
            <Route path='/Register' element={<Register />}></Route>
            
            <Route path='/Login' element={<Login />}></Route>
            
            <Route path='/Tutorial' element={<Tutorial />} />
            
            <Route path='/editar' element={
              <ProtectedRoute allowedRoles={['Tutor','Estudiante']}>
                <EditarPerfil/>
              </ProtectedRoute>
              }/>
            
            <Route path='/Perfil/:id' element={<Perfil/>}/>
            
            <Route path='/DashboardP' element={<DashboardP/>}/>

            <Route path='/Crear' element={<CrearTutoria/>}/>
            
            <Route path='/Dashboard-Alumnos' element={<AlumnosDashboard/>}/>

            <Route path='/Tutores' element={<Tutores/>}/>

            <Route path='/Contactar' element={<Contactar/>}/>

            {/* <Route path="/crear" element={
              <ProtectedRoute allowedRoles={['Tutor']}>
                <Prohibido />
              </ProtectedRoute>
            } /> */}

            {/*<Route path='/Login' element={<LoginPage />} />*/}
            <Route path='/prueba' element={<PruebaAPI userId={1} />}></Route>
          </Routes>
          {/*<Chat/>*/}
          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
