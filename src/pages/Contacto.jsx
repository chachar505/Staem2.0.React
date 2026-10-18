import { useState } from "react";
import "./Contacto.css";

const valoresIniciales = {
    nombre: "",
    correo: "",
    motivo: "",
    asunto: "",
    mensaje: "",
};

function Contacto() {
    const [formulario, setFormulario] = useState(valoresIniciales);
    const [errores, setErrores] = useState({});
    const [validacionCorrecta, setValidacionCorrecta] = useState(false);

    function manejarCambio(evento) {
        const { name, value } = evento.target;

        setFormulario((actual) => ({
            ...actual,
            [name]: value,
        }));

        // Si el usuario modifica un campo, quitamos su error anterior.
        setErrores((actuales) => ({
            ...actuales,
            [name]: "",
        }));

        setValidacionCorrecta(false);
    }

    function validarFormulario() {
        const nuevosErrores = {};
        const correoLimpio = formulario.correo.trim();

        if (!formulario.nombre.trim()) {
            nuevosErrores.nombre = "Ingresa tu nombre.";
        }

        if (!correoLimpio) {
            nuevosErrores.correo = "Ingresa tu correo electrónico.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
            nuevosErrores.correo = "Ingresa un correo electrónico válido.";
        }

        if (!formulario.motivo) {
            nuevosErrores.motivo = "Selecciona un motivo de contacto.";
        }

        if (!formulario.mensaje.trim()) {
            nuevosErrores.mensaje = "Escribe tu mensaje.";
        } else if (formulario.mensaje.trim().length < 10) {
            nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
        }

        return nuevosErrores;
    }

    function manejarEnvio(evento) {
        evento.preventDefault();
        setValidacionCorrecta(false);

        const nuevosErrores = validarFormulario();
        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length === 0) {
            setValidacionCorrecta(true);
        }
    }

    function limpiarFormulario() {
        setFormulario(valoresIniciales);
        setErrores({});
        setValidacionCorrecta(false);
    }

    return (
        <main className="contacto-page">
            <header className="contacto-encabezado">
                <p>GAMEUP · ESTAMOS PARA AYUDARTE</p>
                <h1>Contáctanos</h1>
                <span>
                    ¿Tienes una duda, encontraste un problema o quieres compartir una idea?
                    Cuéntanos y ayúdanos a mejorar tu experiencia.
                </span>
            </header>

            <section className="contacto-contenedor">
                <div className="contacto-introduccion">
                    <div className="contacto-icono" aria-hidden="true">✉</div>
                    <div>
                        <h2>Envíanos un mensaje</h2>
                        <p>Completa los campos obligatorios marcados con un asterisco (*).</p>
                    </div>
                </div>

                <form className="contacto-formulario" onSubmit={manejarEnvio} noValidate>
                    <div className="contacto-campo">
                        <label htmlFor="contacto-nombre">Nombre completo <span>*</span></label>
                        <input
                            id="contacto-nombre"
                            name="nombre"
                            type="text"
                            placeholder="Ej. Juan Pérez"
                            value={formulario.nombre}
                            onChange={manejarCambio}
                            aria-invalid={Boolean(errores.nombre)}
                            aria-describedby={errores.nombre ? "error-nombre" : undefined}
                            autoComplete="name"
                        />
                        {errores.nombre && <small className="contacto-error" id="error-nombre">{errores.nombre}</small>}
                    </div>

                    <div className="contacto-campo">
                        <label htmlFor="contacto-correo">Correo electrónico <span>*</span></label>
                        <input
                            id="contacto-correo"
                            name="correo"
                            type="email"
                            placeholder="Ej. juan@correo.com"
                            value={formulario.correo}
                            onChange={manejarCambio}
                            aria-invalid={Boolean(errores.correo)}
                            aria-describedby={errores.correo ? "error-correo" : undefined}
                            autoComplete="email"
                        />
                        {errores.correo && <small className="contacto-error" id="error-correo">{errores.correo}</small>}
                    </div>

                    <div className="contacto-campo">
                        <label htmlFor="contacto-motivo">Motivo de contacto <span>*</span></label>
                        <select
                            id="contacto-motivo"
                            name="motivo"
                            value={formulario.motivo}
                            onChange={manejarCambio}
                            aria-invalid={Boolean(errores.motivo)}
                            aria-describedby={errores.motivo ? "error-motivo" : undefined}
                        >
                            <option value="">Selecciona un motivo</option>
                            <option value="consulta">Consulta general</option>
                            <option value="problema">Problema técnico</option>
                            <option value="sugerencia">Sugerencia o mejora</option>
                            <option value="videojuego">Consulta sobre un videojuego</option>
                            <option value="otro">Otro motivo</option>
                        </select>
                        {errores.motivo && <small className="contacto-error" id="error-motivo">{errores.motivo}</small>}
                    </div>

                    <div className="contacto-campo">
                        <label htmlFor="contacto-asunto">Asunto <small>(opcional)</small></label>
                        <input
                            id="contacto-asunto"
                            name="asunto"
                            type="text"
                            placeholder="¿Sobre qué trata tu mensaje?"
                            value={formulario.asunto}
                            onChange={manejarCambio}
                        />
                    </div>

                    <div className="contacto-campo contacto-campo-completo">
                        <label htmlFor="contacto-mensaje">Mensaje <span>*</span></label>
                        <textarea
                            id="contacto-mensaje"
                            name="mensaje"
                            rows="6"
                            placeholder="Escribe aquí tu consulta o sugerencia..."
                            value={formulario.mensaje}
                            onChange={manejarCambio}
                            aria-invalid={Boolean(errores.mensaje)}
                            aria-describedby={errores.mensaje ? "error-mensaje" : undefined}
                        />
                        <div className="contacto-ayuda">
                            {errores.mensaje
                                ? <small className="contacto-error" id="error-mensaje">{errores.mensaje}</small>
                                : <small>Cuéntanos los detalles para entender mejor tu consulta.</small>}
                            <small>{formulario.mensaje.length} caracteres</small>
                        </div>
                    </div>

                    {validacionCorrecta && (
                        <div className="contacto-exito" role="status" aria-live="polite">
                            <strong>¡Formulario validado correctamente!</strong>
                            <p>Esta es una demostración local: tu mensaje no se ha enviado ni guardado.</p>
                        </div>
                    )}

                    <div className="contacto-acciones contacto-campo-completo">
                        <button className="contacto-boton-principal" type="submit">Validar formulario</button>
                        <button className="contacto-boton-secundario" type="button" onClick={limpiarFormulario}>Limpiar campos</button>
                    </div>
                    <p className="contacto-nota contacto-campo-completo">* Campos obligatorios. Este formulario es una demostración y no transmite datos.</p>
                </form>
            </section>
        </main>
    );
}

export default Contacto;
