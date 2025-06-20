import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import EditarPerfil from "./Pages/editarPerfil";
import Perfil from "./Pages/Perfil";
import PruebaAPI from "./Pages/PruebaAPI";
import Tutorial from "./Pages/Tutorial";
import Tutores from "./Pages/Tutores";
import Contactar from "./Pages/Contactar";
import Error404 from "./Pages/Error404";
import ErrorRuta from "./Pages/ErrorRuta";
import ErrorAcceso from "./Pages/ErrorAcceso";
import CrearTutoria from "./Pages/CrearTutoria";
import { AuthProvider } from "./Context/AuthContext";
/*import LoginPage from './Pages/LoginPage';*/
import { ProtectedRoute } from "./Components/ProtectedRoutes";
import Prohibido from "./Pages/Prohibido";
import Dashboard from "./Pages/Dashboard";
import GestionarTutoria from "./Pages/GestionarTutoria";
import DetallesCursos from "./Pages/DetallesCursos";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/Register" element={<Register />}></Route>

            <Route path="/Login" element={<Login />}></Route>
            
            <Route path="/Detalles" element={<DetallesCursos />}></Route>

            <Route path="/Tutorial" element={
              <ProtectedRoute allowedRoles={["Estudiante"]}>
                <Tutorial />
              </ProtectedRoute>
            } />

            <Route path="/Error404" element={<Error404 />} />

            <Route path="/ErrorRuta" element={<ErrorRuta />} />

           <Route path="/ErrorAcceso" element={<ErrorAcceso />} />
    

            <Route
              path="/editar"
              element={
                <ProtectedRoute allowedRoles={["Tutor", "Estudiante"]}>
                  <EditarPerfil />
                </ProtectedRoute>
              }
            />

            <Route path="/Perfil/:id" element={<Perfil />} />

            <Route
              path="/Crear"
              element={
                <ProtectedRoute allowedRoles={["Tutor"]}>
                  <CrearTutoria />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute allowedRoles={["Tutor", "Estudiante"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/gestionar/:tutoriaId" element={<GestionarTutoria/>}></Route>

            <Route path="/tutoria/:tutoriaId" element={<DetallesCursos/>}></Route>

            <Route path="/Tutores" element={
              <ProtectedRoute allowedRoles={["Estudiante"]}>
                <Tutores />
              </ProtectedRoute>
            } />

            <Route path="/Contactar" element={<Contactar />} />

            {/* <Route path="/crear" element={
              <ProtectedRoute allowedRoles={['Tutor']}>
                <Prohibido />
              </ProtectedRoute>
            } /> */}

            {/*<Route path='/Login' element={<LoginPage />} />*/}
            <Route path="/prueba" element={<PruebaAPI userId={1} />}></Route>
            <Route path="*" element={<Error404/>}></Route>
          </Routes>
          {/*<Chat/>*/}
          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
