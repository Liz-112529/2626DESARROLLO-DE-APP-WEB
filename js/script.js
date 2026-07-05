(function () {

    if (window.registroActivo) {
        return;
    }

    window.registroActivo = true;

    function iniciarRegistro() {

        const formulario = document.getElementById("formRegistro");
        const nombre = document.getElementById("nombreRegistro");
        const descripcion = document.getElementById("descripcionRegistro");
        const categoria = document.getElementById("categoriaRegistro");
        const lista = document.getElementById("listaRegistros");
        const contador = document.getElementById("contador");
        const mensaje = document.getElementById("mensaje");

        if (!formulario || !nombre || !descripcion || !categoria || !lista || !contador || !mensaje) {
            alert("Error: No se encontró el formulario o alguno de sus elementos.");
            return;
        }

        function mostrarMensaje(tipo, texto) {
            mensaje.innerHTML = `
                <div class="alert alert-${tipo} mt-3">
                    ${texto}
                </div>
            `;
        }

        function marcarError(campo, texto) {
            campo.classList.remove("is-valid");
            campo.classList.add("is-invalid");

            const error = campo.parentElement.querySelector(".invalid-feedback");

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
                marcarError(nombre, "El nombre es obligatorio.");
                return false;
            }

            if (valor.length < 3) {
                marcarError(nombre, "El nombre debe tener mínimo 3 caracteres.");
                return false;
            }

            marcarValido(nombre);
            return true;
        }

        function validarDescripcion() {
            const valor = descripcion.value.trim();

            if (valor === "") {
                marcarError(descripcion, "La descripción es obligatoria.");
                return false;
            }

            if (valor.length < 10) {
                marcarError(descripcion, "La descripción debe tener mínimo 10 caracteres.");
                return false;
            }

            marcarValido(descripcion);
            return true;
        }

        function validarCategoria() {
            if (categoria.value === "") {
                marcarError(categoria, "Debe seleccionar una categoría.");
                return false;
            }

            marcarValido(categoria);
            return true;
        }

        function actualizarContador() {
            const total = lista.querySelectorAll(".registro-item").length;
            contador.textContent = total;
        }

        function limpiarFormulario() {
            formulario.reset();

            nombre.classList.remove("is-valid", "is-invalid");
            descripcion.classList.remove("is-valid", "is-invalid");
            categoria.classList.remove("is-valid", "is-invalid");

            nombre.focus();
        }

        nombre.addEventListener("input", validarNombre);
        nombre.addEventListener("blur", validarNombre);

        descripcion.addEventListener("input", validarDescripcion);
        descripcion.addEventListener("blur", validarDescripcion);

        categoria.addEventListener("change", validarCategoria);
        categoria.addEventListener("blur", validarCategoria);

        formulario.addEventListener("submit", function (event) {
            event.preventDefault();

            const nombreCorrecto = validarNombre();
            const descripcionCorrecta = validarDescripcion();
            const categoriaCorrecta = validarCategoria();

            if (!nombreCorrecto || !descripcionCorrecta || !categoriaCorrecta) {
                mostrarMensaje("danger", "Corrija los campos marcados antes de registrar.");
                return;
            }

            const columna = document.createElement("div");
            columna.className = "col-12 col-md-6 col-lg-4 mb-3 registro-item";

            const tarjeta = document.createElement("div");
            tarjeta.className = "card h-100 shadow-sm";

            const cuerpo = document.createElement("div");
            cuerpo.className = "card-body d-flex flex-column";

            const titulo = document.createElement("h5");
            titulo.className = "card-title";
            titulo.textContent = nombre.value.trim();

            const textoDescripcion = document.createElement("p");
            textoDescripcion.className = "card-text";
            textoDescripcion.textContent = descripcion.value.trim();

            const textoCategoria = document.createElement("p");
            textoCategoria.innerHTML = "<strong>Categoría:</strong> ";

            const categoriaTexto = document.createElement("span");
            categoriaTexto.textContent = categoria.value;

            textoCategoria.appendChild(categoriaTexto);

            const botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.className = "btn btn-danger mt-auto";
            botonEliminar.textContent = "Eliminar";

            botonEliminar.addEventListener("click", function () {
                columna.remove();
                actualizarContador();
                mostrarMensaje("warning", "Registro eliminado correctamente.");
            });

            cuerpo.appendChild(titulo);
            cuerpo.appendChild(textoDescripcion);
            cuerpo.appendChild(textoCategoria);
            cuerpo.appendChild(botonEliminar);

            tarjeta.appendChild(cuerpo);
            columna.appendChild(tarjeta);
            lista.appendChild(columna);

            actualizarContador();

            mostrarMensaje("success", "Registro agregado correctamente.");

            limpiarFormulario();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarRegistro);
    } else {
        iniciarRegistro();
    }

})();