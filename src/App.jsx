import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registro from "./pages/Registro";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Biblioteca from "./pages/Biblioteca";
import Contacto from "./pages/Contacto";
import DetalleVideojuego from "./pages/DetalleVideojuego";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/biblioteca" element={<Biblioteca />} />
                <Route path="/contacto" element={<Contacto />} />

                <Route
                    path="/videojuego/:id"
                    element={<DetalleVideojuego />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/registro"
                    element={<Registro />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;