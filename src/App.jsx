import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Biblioteca from "./pages/Biblioteca";
import Contacto from "./pages/Contacto";
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
        </Routes>
      </BrowserRouter>
  );
}

export default App;