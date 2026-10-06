let biblioteca = JSON.parse(
    localStorage.getItem("biblioteca")
) || [];

export function agregarBiblioteca(videojuego) {
    const existe = biblioteca.some(
        (juego) => juego.id === videojuego.id
    );

    if (!existe) {
        biblioteca.push({
            ...videojuego,
            estadoBiblioteca: "pendiente"
        });

        localStorage.setItem(
            "biblioteca",
            JSON.stringify(biblioteca)
        );
    }
}

export function obtenerBiblioteca() {
    return biblioteca;
}

export function cambiarEstado(id, nuevoEstado) {
    biblioteca = biblioteca.map((juego) => {
        if (juego.id === id) {
            return {
                ...juego,
                estadoBiblioteca: nuevoEstado
            };
        }

        return juego;
    });

    localStorage.setItem(
        "biblioteca",
        JSON.stringify(biblioteca)
    );
}