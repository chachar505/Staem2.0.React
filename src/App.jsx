import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Biblioteca from "./pages/Biblioteca";
import Contacto from "./pages/Contacto";
import DetalleVideojuego from "./pages/DetalleVideojuego";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Inicio />} />

                        <Route path="/catalogo" element={<Catalogo />} />

                        <Route path="/biblioteca" element={<Biblioteca />} />

                        <Route path="/contacto" element={<Contacto />} />

                        <Route
                            path="/videojuego/:id"
                            element={<DetalleVideojuego />}
                        />

                        <Route path="/login" element={<Login />} />

                        <Route path="/registro" element={<Registro />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;