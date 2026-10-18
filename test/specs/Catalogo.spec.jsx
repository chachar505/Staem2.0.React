import React from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Catalogo from "../../src/pages/Catalogo";
import { videojuegos } from "../../src/data/videojuegos";

describe("Componente Catalogo", () => {
    afterEach(() => {
        cleanup();
        localStorage.clear();
    });

    function mostrarCatalogo() {
        return render(
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        );
    }

    function expectResumen(cantidad) {
        const textoEsperado = `Mostrando ${cantidad} de ${videojuegos.length} videojuegos`;
        expect(screen.getByText((_, elemento) => elemento?.tagName === "P" && elemento.textContent === textoEsperado)).toBeTruthy();
    }

    it("muestra el título y el total inicial de videojuegos", () => {
        mostrarCatalogo();

        expect(screen.getByRole("heading", { name: "Catálogo de videojuegos" })).toBeTruthy();
        expectResumen(videojuegos.length);
        expect(screen.getAllByRole("article").length).toBe(videojuegos.length);
    });

    it("filtra los videojuegos por nombre sin distinguir mayúsculas", () => {
        mostrarCatalogo();
        fireEvent.change(screen.getByRole("searchbox", { name: "Buscar por nombre" }), {
            target: { value: "mArIo" },
        });

        expect(screen.getByRole("heading", { name: "Super Mario Odyssey" })).toBeTruthy();
        expectResumen(1);
        expect(screen.queryByRole("heading", { name: "Minecraft" })).toBeNull();
    });

    it("combina los filtros de género y plataforma", () => {
        mostrarCatalogo();
        fireEvent.change(screen.getByLabelText("Género"), { target: { value: "RPG" } });
        fireEvent.change(screen.getByLabelText("Plataforma"), { target: { value: "PC" } });

        const esperados = videojuegos.filter((juego) => juego.genero === "RPG" && juego.plataforma === "PC");
        expectResumen(esperados.length);
        esperados.forEach((juego) => expect(screen.getByRole("heading", { name: juego.nombre })).toBeTruthy());
    });

    it("muestra un mensaje cuando no hay coincidencias", () => {
        mostrarCatalogo();
        fireEvent.change(screen.getByRole("searchbox", { name: "Buscar por nombre" }), {
            target: { value: "Juego que no existe XYZ" },
        });

        expect(screen.getByRole("heading", { name: "No se encontraron videojuegos" })).toBeTruthy();
        expectResumen(0);
    });

    it("limpia los filtros y vuelve a mostrar todos los videojuegos", () => {
        mostrarCatalogo();
        fireEvent.change(screen.getByRole("searchbox", { name: "Buscar por nombre" }), {
            target: { value: "Minecraft" },
        });
        fireEvent.click(screen.getByRole("button", { name: "Limpiar filtros" }));

        expect(screen.getByRole("searchbox", { name: "Buscar por nombre" }).value).toBe("");
        expectResumen(videojuegos.length);
    });

    it("agrega un videojuego y muestra una alerta de confirmación", () => {
        spyOn(window, "alert").and.stub();
        mostrarCatalogo();
        const titulo = screen.getByRole("heading", { name: "Super Mario Odyssey" });
        const tarjeta = titulo.closest("article");
        fireEvent.click(within(tarjeta).getByRole("button", { name: "Agregar a mi biblioteca" }));

        expect(window.alert).toHaveBeenCalledWith("Super Mario Odyssey fue agregado a tu biblioteca");
    });
});
