import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Inicio</Link>{" | "}
            <Link to="/catalogo">Catálogo</Link>{" | "}
            <Link to="/biblioteca">Biblioteca</Link>{" | "}
            <Link to="/contacto">Contacto</Link>
        </nav>
    );
}

export default Navbar;