
import {
    agregarBiblioteca,
    obtenerBiblioteca,
    cambiarEstado,
    quitarBiblioteca
} from "../../src/biblioteca.js";

describe("Pruebas de la biblioteca personal", () => {

    const juego1 = {
        id: 1,
        nombre: "The Witcher 3",
        genero: "RPG"
    };

    const juego2 = {
        id: 2,
        nombre: "Minecraft",
        genero: "Sandbox"
    };

    beforeEach(() => {
        // Limpiar los videojuegos del módulo antes de cada prueba.
        obtenerBiblioteca().slice().forEach((juego) => {
            quitarBiblioteca(juego.id);
        });

        localStorage.removeItem("biblioteca");
    });

    it("debe agregar un videojuego con estado pendiente", () => {
        agregarBiblioteca(juego1);

        expect(obtenerBiblioteca().length).toBe(1);
        expect(obtenerBiblioteca()[0].id).toBe(1);
        expect(obtenerBiblioteca()[0].estadoBiblioteca)
            .toBe("pendiente");

        expect(JSON.parse(localStorage.getItem("biblioteca")))
            .toEqual(obtenerBiblioteca());
    });

    it("no debe agregar un videojuego duplicado", () => {
        agregarBiblioteca(juego1);
        agregarBiblioteca(juego1);

        expect(obtenerBiblioteca().length).toBe(1);
    });

    it("debe devolver la biblioteca actual", () => {
        agregarBiblioteca(juego1);
        agregarBiblioteca(juego2);

        expect(obtenerBiblioteca().length).toBe(2);
        expect(obtenerBiblioteca()[0].nombre)
            .toBe("The Witcher 3");
        expect(obtenerBiblioteca()[1].nombre)
            .toBe("Minecraft");
    });

    it("debe cambiar el estado de un videojuego existente", () => {
        agregarBiblioteca(juego1);

        cambiarEstado(1, "jugando");

        expect(obtenerBiblioteca()[0].estadoBiblioteca)
            .toBe("jugando");

        expect(JSON.parse(localStorage.getItem("biblioteca"))[0]
            .estadoBiblioteca).toBe("jugando");
    });

    it("no debe modificar el estado de otros videojuegos", () => {
        agregarBiblioteca(juego1);
        agregarBiblioteca(juego2);

        cambiarEstado(1, "completado");

        expect(obtenerBiblioteca()[0].estadoBiblioteca)
            .toBe("completado");
        expect(obtenerBiblioteca()[1].estadoBiblioteca)
            .toBe("pendiente");
    });

    it("debe conservar la biblioteca si el ID no existe al cambiar estado", () => {
        agregarBiblioteca(juego1);

        cambiarEstado(999, "jugando");

        expect(obtenerBiblioteca().length).toBe(1);
        expect(obtenerBiblioteca()[0].estadoBiblioteca)
            .toBe("pendiente");
    });

    it("debe quitar un videojuego de la biblioteca", () => {
        agregarBiblioteca(juego1);
        agregarBiblioteca(juego2);

        quitarBiblioteca(1);

        expect(obtenerBiblioteca().length).toBe(1);
        expect(obtenerBiblioteca()[0].id).toBe(2);

        expect(JSON.parse(localStorage.getItem("biblioteca")))
            .toEqual(obtenerBiblioteca());
    });

    it("debe conservar los videojuegos si el ID que se quita no existe", () => {
        agregarBiblioteca(juego1);

        quitarBiblioteca(999);

        expect(obtenerBiblioteca().length).toBe(1);
        expect(obtenerBiblioteca()[0].id).toBe(1);
    });
});
