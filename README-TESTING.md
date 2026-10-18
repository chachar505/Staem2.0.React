# Pruebas unitarias del frontend — Biblioteca de videojuegos

## Alcance

La suite usa Jasmine para describir y ejecutar las verificaciones, Karma para lanzar las pruebas en Chrome Headless y React Testing Library para renderizar componentes y comprobar el DOM desde la perspectiva del usuario.

Los componentes cubiertos por los casos preparados son:

- `src/pages/Catalogo.jsx`: renderizado, contador, búsqueda por nombre, combinación de filtros de género/plataforma, estado sin resultados, limpieza de filtros y acción de agregar a biblioteca.
- `src/pages/Contacto.jsx`: renderizado de campos, validaciones obligatorias, formato de correo, longitud mínima del mensaje, confirmación local, limpieza y corrección de errores.

La aplicación usa datos locales para el catálogo; por eso no se incluye una prueba de integración con API. El formulario de contacto es una demostración local y no envía datos.

## Herramientas configuradas

- Jasmine: `describe`, `it`, `expect`, `spyOn`.
- Karma: ejecutor de pruebas en navegador.
- React Testing Library: `render`, `screen`, `fireEvent`, `cleanup`.
- Webpack + Babel: empaquetan los archivos JSX para que Karma los ejecute.
- `babel-plugin-istanbul` + `karma-coverage`: instrumentación y generación del informe de cobertura.

## Instalación y ejecución

Requisitos: Node.js compatible con las versiones de las dependencias y Google Chrome instalado.

```bash
npm install
npm test
```

Para generar el informe de cobertura:

```bash
npm run test:coverage
```

El reporte HTML se genera en `coverage/html/index.html`; el resumen también aparece en la terminal. `npm run test:watch` mantiene Karma ejecutándose para repetir las pruebas durante el desarrollo.

Si Chrome no se detecta en el equipo, comprueba que esté instalado y que Karma pueda encontrarlo. En un entorno CI/Linux sin Chrome normal se puede configurar un lanzador de Chrome Headless apropiado para ese entorno.

## Organización de los archivos

- `karma.conf.cjs`: configuración de Karma, Jasmine, navegador y reportes.
- `webpack.config.cjs`: compilación de JSX/CSS e instrumentación de cobertura.
- `test/index.js`: punto de entrada de la suite.
- `test/specs/Catalogo.spec.jsx`: pruebas de catálogo.
- `test/specs/Contacto.spec.jsx`: pruebas de contacto.

## Conceptos aplicados

1. **Aislamiento:** cada prueba monta el componente necesario y limpia el DOM después de ejecutarse.
2. **Casos normales y límite:** se comprueba tanto el uso correcto como campos vacíos, correo inválido, búsqueda sin coincidencias y mensaje demasiado corto.
3. **Interacción con el DOM:** los casos escriben en inputs, cambian selectores y hacen clic en botones; después verifican el contenido que React muestra.
4. **Mocking:** se usa `spyOn(window, "alert")` para comprobar la notificación del catálogo sin abrir una alerta real durante la prueba.
5. **Cobertura:** la instrumentación recoge líneas, sentencias, funciones y ramas ejecutadas. Los porcentajes solo deben informarse después de ejecutar la suite; un porcentaje alto no garantiza por sí solo que todos los escenarios importantes estén probados.

## Matriz de pruebas preparada

| ID | Componente | Caso | Resultado esperado |
|---|---|---|---|
| CAT-01 | Catálogo | Renderizado inicial | Se ve el título, todas las tarjetas y el contador completo. |
| CAT-02 | Catálogo | Buscar por nombre con mayúsculas/minúsculas | Se muestra el juego coincidente y se actualiza el contador. |
| CAT-03 | Catálogo | Combinar género y plataforma | Solo aparecen juegos que cumplen ambos filtros. |
| CAT-04 | Catálogo | Búsqueda sin coincidencias | Se muestra el mensaje de catálogo vacío y contador cero. |
| CAT-05 | Catálogo | Limpiar filtros | Se restablece la búsqueda y vuelve el catálogo completo. |
| CAT-06 | Catálogo | Agregar a biblioteca | Se invoca la alerta con el nombre del juego seleccionado. |
| CON-01 | Contacto | Renderizado | Aparecen los campos principales y el título. |
| CON-02 | Contacto | Enviar vacío | Aparecen los mensajes de validación de campos obligatorios. |
| CON-03 | Contacto | Correo inválido | Se informa que el correo no tiene formato válido. |
| CON-04 | Contacto | Mensaje demasiado corto | Se informa el mínimo de 10 caracteres. |
| CON-05 | Contacto | Formulario válido | Se muestra confirmación y se aclara que no se envía ni guarda. |
| CON-06 | Contacto | Limpiar campos | Los campos y la confirmación vuelven a su estado inicial. |
| CON-07 | Contacto | Corregir un campo | Desaparece el error del campo modificado. |

## Estado de verificación

Los archivos y la configuración de pruebas están preparados. En el entorno de generación no fue posible completar `npm install` dentro del tiempo disponible, por lo que **no se afirma que las pruebas hayan pasado ni se asignan porcentajes de cobertura sin evidencia**. Ejecuta los comandos en el equipo donde se desarrolla el proyecto y conserva la salida de Karma y el informe HTML como evidencia final.
