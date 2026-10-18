import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Contacto from "../../src/pages/Contacto";

describe("Componente Contacto", () => {
    afterEach(cleanup);

    function mostrarContacto() {
        return render(<Contacto />);
    }

    function completarFormulario() {
        fireEvent.change(screen.getByLabelText(/Nombre completo/), {
            target: { value: "Ana Pérez" },
        });
        fireEvent.change(screen.getByLabelText(/Correo electrónico/), {
            target: { value: "ana@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/Motivo de contacto/), {
            target: { value: "consulta" },
        });
        fireEvent.change(screen.getByLabelText(/^Mensaje/), {
            target: { value: "Necesito ayuda con mi biblioteca de videojuegos." },
        });
    }

    function validar() {
        fireEvent.click(screen.getByRole("button", { name: "Validar formulario" }));
    }

    it("renderiza los campos principales del formulario", () => {
        mostrarContacto();

        expect(screen.getByRole("heading", { name: "Contáctanos" })).toBeTruthy();
        expect(screen.getByLabelText(/Nombre completo/)).toBeTruthy();
        expect(screen.getByLabelText(/Correo electrónico/)).toBeTruthy();
        expect(screen.getByLabelText(/Motivo de contacto/)).toBeTruthy();
        expect(screen.getByLabelText(/^Mensaje/)).toBeTruthy();
    });

    it("muestra errores cuando se intenta validar el formulario vacío", () => {
        mostrarContacto();
        validar();

        expect(screen.getByText("Ingresa tu nombre.")).toBeTruthy();
        expect(screen.getByText("Ingresa tu correo electrónico.")).toBeTruthy();
        expect(screen.getByText("Selecciona un motivo de contacto.")).toBeTruthy();
        expect(screen.getByText("Escribe tu mensaje.")).toBeTruthy();
    });

    it("rechaza un correo electrónico con formato inválido", () => {
        mostrarContacto();
        fireEvent.change(screen.getByLabelText(/Correo electrónico/), {
            target: { value: "correo-invalido" },
        });
        validar();

        expect(screen.getByText("Ingresa un correo electrónico válido.")).toBeTruthy();
    });

    it("rechaza un mensaje de menos de diez caracteres", () => {
        mostrarContacto();
        completarFormulario();
        fireEvent.change(screen.getByLabelText(/^Mensaje/), { target: { value: "Hola" } });
        validar();

        expect(screen.getByText("El mensaje debe tener al menos 10 caracteres.")).toBeTruthy();
    });

    it("muestra una confirmación local cuando los datos son válidos", () => {
        mostrarContacto();
        completarFormulario();
        validar();

        expect(screen.getByRole("status")).toBeTruthy();
        expect(screen.getByText("¡Formulario validado correctamente!")).toBeTruthy();
        expect(screen.getByText(/no se ha enviado ni guardado/)).toBeTruthy();
    });

    it("limpia los campos y la confirmación al presionar Limpiar campos", () => {
        mostrarContacto();
        completarFormulario();
        validar();
        fireEvent.click(screen.getByRole("button", { name: "Limpiar campos" }));

        expect(screen.getByLabelText(/Nombre completo/).value).toBe("");
        expect(screen.getByLabelText(/Correo electrónico/).value).toBe("");
        expect(screen.queryByRole("status")).toBeNull();
    });

    it("elimina el error de un campo cuando el usuario lo corrige", () => {
        mostrarContacto();
        validar();
        fireEvent.change(screen.getByLabelText(/Nombre completo/), { target: { value: "Ana Pérez" } });

        expect(screen.queryByText("Ingresa tu nombre.")).toBeNull();
    });
});
