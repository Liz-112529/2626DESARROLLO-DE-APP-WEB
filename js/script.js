(function () {

    "use strict";

    if (window.registroActivo) {
        return;
    }

    window.registroActivo = true;


    /* =====================================================
       ARREGLOS Y OBJETOS DEL PROYECTO
    ===================================================== */

    const servicios = [

        {
            id: 1,
            titulo: "Cumpleaños",
            descripcion: "Organizamos cumpleaños personalizados para crear celebraciones inolvidables.",
            icono: "🎂"
        },

        {
            id: 2,
            titulo: "Bodas",
            descripcion: "Decoración elegante y espacios especiales para celebrar el día de tus sueños.",
            icono: "💍"
        },

        {
            id: 3,
            titulo: "Quinceañeras",
            descripcion: "Creamos ambientes únicos y modernos para celebrar una fecha muy especial.",
            icono: "👑"
        },

        {
            id: 4,
            titulo: "Baby Showers",
            descripcion: "Espacios acogedores y decoraciones especiales para recibir al nuevo integrante de la familia.",
            icono: "👶"
        },

        {
            id: 5,
            titulo: "Eventos Familiares",
            descripcion: "Organizamos reuniones familiares en un ambiente cómodo, seguro y elegante.",
            icono: "👨‍👩‍👧‍👦"
        },

        {
            id: 6,
            titulo: "Alquiler del Salón",
            descripcion: "Disponemos de espacios versátiles adaptados a diferentes tipos de celebraciones.",
            icono: "🏛️"
        }

    ];


    const promociones = [

        {
            nombre: "Paquete Básico",
            descripcion: "Celebración sencilla y elegante.",
            icono: "🎁"
        },

        {
            nombre: "Paquete Premium",
            descripcion: "Decoración y servicios mejorados.",
            icono: "✨"
        },

        {
            nombre: "Paquete VIP",
            descripcion: "Experiencia completa de lujo.",
            icono: "👑"
        },

        {
            nombre: "Maestro de Ceremonias",
            descripcion: "Servicio de animación profesional.",
            icono: "🎤"
        },

        {
            nombre: "DJ Profesional",
            descripcion: "Música y ambientación para tu celebración.",
            icono: "🎧"
        },

        {
            nombre: "Fotografía y Video",
            descripcion: "Capturamos los mejores momentos de tu evento.",
            icono: "📸"
        }

    ];


    /*
       Arreglo donde se almacenan temporalmente
       los registros ingresados por el usuario.
    */

    const registros = [];


    /* =====================================================
       RENDERIZAR SERVICIOS
       ESTRUCTURA REPETITIVA: forEach
    ===================================================== */

    function renderizarServicios() {

        const contenedor = document.getElementById("listaServicios");

        if (!contenedor) {
            return;
        }

        contenedor.innerHTML = "";

        servicios.forEach(function (servicio) {

            const columna = document.createElement("div");

            columna.className = "col-12 col-md-6 col-lg-4";

            columna.innerHTML = `
                <div class="card h-100 shadow border-0 text-center">

                    <div class="card-body">

                        <div class="display-4 mb-3">
                            ${servicio.icono}
                        </div>

                        <h3 class="h5 card-title">
                            ${servicio.titulo}
                        </h3>

                        <p class="card-text">
                            ${servicio.descripcion}
                        </p>

                    </div>

                </div>
            `;

            contenedor.appendChild(columna);

        });

    }


    /* =====================================================
       RENDERIZAR PROMOCIONES
       ESTRUCTURA REPETITIVA: forEach
    ===================================================== */

    function renderizarPromociones() {

        const contenedor = document.getElementById("listaPromociones");

        if (!contenedor) {
            return;
        }

        contenedor.innerHTML = "";

        promociones.forEach(function (promocion) {

            const columna = document.createElement("div");

            columna.className = "col-12 col-md-6 col-lg-4";

            columna.innerHTML = `
                <div class="card h-100 shadow-sm border-primary">

                    <div class="card-body text-center">

                        <div class="fs-1">
                            ${promocion.icono}
                        </div>

                        <h3 class="h5 mt-2">
                            ${promocion.nombre}
                        </h3>

                        <p class="mb-0">
                            ${promocion.descripcion}
                        </p>

                    </div>

                </div>
            `;

            contenedor.appendChild(columna);

        });

    }


    /* =====================================================
       SISTEMA DE REGISTROS
    ===================================================== */

    function iniciarRegistro() {

        const formulario = document.getElementById("formRegistro");

        const nombre = document.getElementById("nombreRegistro");

        const descripcion = document.getElementById(
            "descripcionRegistro"
        );

        const categoria = document.getElementById(
            "categoriaRegistro"
        );

        const lista = document.getElementById("listaRegistros");

        const contador = document.getElementById("contador");

        const mensaje = document.getElementById("mensaje");


        if (
            !formulario ||
            !nombre ||
            !descripcion ||
            !categoria ||
            !lista ||
            !contador ||
            !mensaje
        ) {

            console.error(
                "No se encontraron los elementos del formulario."
            );

            return;

        }


        /* =================================================
           MENSAJES DINÁMICOS
        ================================================= */

        function mostrarMensaje(tipo, texto) {

            mensaje.innerHTML = `
                <div class="alert alert-${tipo} mt-3">
                    ${texto}
                </div>
            `;

        }


        /* =================================================
           VALIDACIONES DINÁMICAS
        ================================================= */

        function marcarError(campo, texto) {

            campo.classList.remove("is-valid");

            campo.classList.add("is-invalid");

            const error = campo.parentElement.querySelector(
                ".invalid-feedback"
            );

            if (error) {

                error.textContent = texto;

            }

        }


        function marcarValido(campo) {

            campo.classList.remove("is-invalid");

            campo.classList.add("is-valid");

        }


        function validarNombre() {

            const valor = nombre.value.trim();


            if (valor === "") {

                marcarError(
                    nombre,
                    "El nombre es obligatorio."
                );

                return false;

            }


            if (valor.length < 3) {

                marcarError(
                    nombre,
                    "El nombre debe tener mínimo 3 caracteres."
                );

                return false;

            }


            marcarValido(nombre);

            return true;

        }


        function validarDescripcion() {

            const valor = descripcion.value.trim();


            if (valor === "") {

                marcarError(
                    descripcion,
                    "La descripción es obligatoria."
                );

                return false;

            }


            if (valor.length < 10) {

                marcarError(
                    descripcion,
                    "La descripción debe tener mínimo 10 caracteres."
                );

                return false;

            }


            marcarValido(descripcion);

            return true;

        }


        function validarCategoria() {

            if (categoria.value === "") {

                marcarError(
                    categoria,
                    "Debe seleccionar una categoría."
                );

                return false;

            }


            marcarValido(categoria);

            return true;

        }


        /* =================================================
           RENDERIZAR REGISTROS
        ================================================= */

        function renderizarRegistros() {

            lista.innerHTML = "";

            contador.textContent = registros.length;


            /*
               CONDICIÓN SEGÚN EL ESTADO DE LOS DATOS
            */

            if (registros.length === 0) {

                lista.innerHTML = `
                    <div class="col-12">

                        <div class="alert alert-info text-center">

                            No existen registros ingresados.

                            Complete el formulario para agregar
                            una nueva consulta.

                        </div>

                    </div>
                `;

                return;

            }


            /*
               ESTRUCTURA REPETITIVA
            */

            registros.forEach(function (registro, indice) {

                const columna = document.createElement("div");

                columna.className =
                    "col-12 col-md-6 col-lg-4 registro-item";


                const tarjeta = document.createElement("div");

                tarjeta.className =
                    "card h-100 shadow-sm border-0";


                const cuerpo = document.createElement("div");

                cuerpo.className =
                    "card-body d-flex flex-column";


                const titulo = document.createElement("h5");

                titulo.className = "card-title";

                titulo.textContent = registro.nombre;


                const textoDescripcion =
                    document.createElement("p");

                textoDescripcion.className = "card-text";

                textoDescripcion.textContent =
                    registro.descripcion;


                const textoCategoria =
                    document.createElement("p");

                const etiquetaCategoria =
                    document.createElement("strong");

                etiquetaCategoria.textContent = "Categoría: ";


                const categoriaTexto =
                    document.createElement("span");

                categoriaTexto.className =
                    "badge bg-primary";

                categoriaTexto.textContent =
                    registro.categoria;


                textoCategoria.appendChild(
                    etiquetaCategoria
                );

                textoCategoria.appendChild(
                    categoriaTexto
                );


                const botonEliminar =
                    document.createElement("button");

                botonEliminar.type = "button";

                botonEliminar.className =
                    "btn btn-danger mt-auto";

                botonEliminar.textContent =
                    "Eliminar registro";


                botonEliminar.addEventListener(
                    "click",
                    function () {

                        eliminarRegistro(indice);

                    }
                );


                cuerpo.appendChild(titulo);

                cuerpo.appendChild(textoDescripcion);

                cuerpo.appendChild(textoCategoria);

                cuerpo.appendChild(botonEliminar);

                tarjeta.appendChild(cuerpo);

                columna.appendChild(tarjeta);

                lista.appendChild(columna);

            });

        }


        /* =================================================
           ELIMINAR REGISTRO
        ================================================= */

        function eliminarRegistro(indice) {

            registros.splice(indice, 1);

            renderizarRegistros();

            mostrarMensaje(
                "warning",
                "Registro eliminado correctamente."
            );

        }


        /* =================================================
           LIMPIAR FORMULARIO
        ================================================= */

        function limpiarFormulario() {

            formulario.reset();

            nombre.classList.remove(
                "is-valid",
                "is-invalid"
            );

            descripcion.classList.remove(
                "is-valid",
                "is-invalid"
            );

            categoria.classList.remove(
                "is-valid",
                "is-invalid"
            );

            nombre.focus();

        }


        /* =================================================
           EVENTOS DE VALIDACIÓN
        ================================================= */

        nombre.addEventListener(
            "input",
            validarNombre
        );

        nombre.addEventListener(
            "blur",
            validarNombre
        );


        descripcion.addEventListener(
            "input",
            validarDescripcion
        );

        descripcion.addEventListener(
            "blur",
            validarDescripcion
        );


        categoria.addEventListener(
            "change",
            validarCategoria
        );

        categoria.addEventListener(
            "blur",
            validarCategoria
        );


        /* =================================================
           REGISTRAR NUEVOS DATOS
        ================================================= */

        formulario.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nombreCorrecto =
                    validarNombre();

                const descripcionCorrecta =
                    validarDescripcion();

                const categoriaCorrecta =
                    validarCategoria();


                if (
                    !nombreCorrecto ||
                    !descripcionCorrecta ||
                    !categoriaCorrecta
                ) {

                    mostrarMensaje(
                        "danger",
                        "Corrija los campos marcados antes de registrar."
                    );

                    return;

                }


                /*
                   OBJETO QUE REPRESENTA UN REGISTRO
                */

                const nuevoRegistro = {

                    id: Date.now(),

                    nombre: nombre.value.trim(),

                    descripcion:
                        descripcion.value.trim(),

                    categoria: categoria.value

                };


                /*
                   AGREGAR EL OBJETO AL ARREGLO
                */

                registros.push(nuevoRegistro);


                /*
                   ACTUALIZAR CONTENIDO DINÁMICO
                */

                renderizarRegistros();


                mostrarMensaje(
                    "success",
                    "Registro agregado correctamente."
                );


                limpiarFormulario();

            }
        );


        renderizarRegistros();

    }


    /* =====================================================
       INICIALIZACIÓN DE LA PÁGINA
    ===================================================== */

    function iniciarPagina() {

        renderizarServicios();

        renderizarPromociones();

        iniciarRegistro();

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            iniciarPagina
        );

    } else {

        iniciarPagina();

    }

})();