let videojuegos = [
    {
        id: 1,
        nombre: "Minecraft",
        estado: "pendiente"
    },
    {
        id: 2,
        nombre: "The Witcher 3",
        estado: "jugado"
    },
    {
        id: 3,
        nombre: "Cyberpunk 2077",
        estado: "pendiente"
    }
];

export function obtenerVideojuegos() {
    return videojuegos;
}

export function agregarVideojuego(nombre) {
    const nuevoVideojuego = {
        id: videojuegos.length + 1,
        nombre: nombre,
        estado: "pendiente"
    };

    videojuegos.push(nuevoVideojuego);
}

export function eliminarVideojuego(id) {
    videojuegos = videojuegos.filter(
        videojuego => videojuego.id !== id
    );

}
export function actualizarVideojuego(id, nuevosDatos) {
    videojuegos = videojuegos.map((videojuego) => {
        if (videojuego.id === id) {
            return {
                ...videojuego,
                ...nuevosDatos
            };
        }

        return videojuego;
    });
}