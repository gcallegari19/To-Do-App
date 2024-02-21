        // Instancias
        let pantallaInicial = document.getElementById("pantallaInicial");
        let fraseMotivadora = document.getElementById("fraseMotivadora");
        let btnMas = document.getElementById("btnMas");
        let cargaTarea = document.getElementById("cargaTarea");
        let formContainer = document.getElementById("formContainer");
        let nombreTarea = document.getElementById("nombreTarea");
        let categoria = document.getElementById("categoria");
        let descripcion = document.getElementById("descripcion");
        let btnGuardar = document.getElementById("btnGuardar");
        let btnCerrarFormulario = document.getElementById("btnCerrarFormulario");
        let listaTareas = document.getElementById("listaTareas");
        let tareaContainer = document.getElementById("tareaContainer");
        let checkboxes = document.querySelectorAll('.check');
        let btnEliminar = document.getElementById("btnEliminar");
        let descripcionTarea = document.getElementById("descripcionTarea");
        let btnOk = document.getElementById("btnOk");
        let btnCerrar = document.getElementById("btnCerrar");
        let descripcionTareaContainer = document.getElementById("descripcionTareaContainer");

        // Array de frases motivadoras
        let frasesMotivadoras = [
            "La clave de la productividad es el orden", 
            "Con orden y tiempo se encuentra el secreto de hacerlo todo, y de hacerlo bien",
            "Un buen orden es la base de todas las cosas",
            "Por cada minuto dedicado a la organización, se gana una hora",
            "El orden no es un estilo de vida, es una forma de vida"
        ]
        // Array de tareas
        let tareas = [];

        const frasesAleatorias = ()=>{
            let fraseRandom = Math.floor(Math.random() * frasesMotivadoras.length);
            // Asigna la frase motivadora al elemento HTML
            fraseMotivadora.textContent = frasesMotivadoras[fraseRandom];
            }
        frasesAleatorias();

        // Evento de boton mas con pantallas a mostrar
        btnMas.addEventListener("click", ()=> {    
            pantallaInicial.style.display = "none";
            btnMas.style.display = "block";
            cargaTarea.style.display = "flex";
            formContainer.style.display = "flex";
            listaTareas.style.display = 'none';
            descripcionTarea.style.display = 'none'
        });
        
        // Evento de boton guardar tarea
        btnGuardar.addEventListener("click", () => {    
            const tarea = {
                nombre: nombreTarea.value,
                categoria: categoria.value,
                descripcion: descripcion.value,
            };
            // Agrega la tarea nueva al array y carga listado
            tareas.push(tarea);
            cargarListado();
            // Reiniciar valores de los campos
            nombreTarea.value = "";
            categoria.value = "";
            descripcion.value = "";
            // Muestra determinadas pantallas al clickear btn Guardar
            pantallaInicial.style.display = "none";
            cargaTarea.style.display = "none";
            listaTareas.style.display = "block";
        });

        // Evento boton de cerrar formulario
        btnCerrarFormulario.addEventListener("click", () => {
            // Oculta el formulario y muestra la pantalla inicial
            cargaTarea.style.display = "none";
            pantallaInicial.style.display = "flex";
        });

        // Creo unción que asigna color a la tarjeta segun el icono de la categoria
        const obtenerRutaIcono = (categoria)=> {
            switch (categoria.toLowerCase()) {
                case 'personal':
                    return 'https://i.postimg.cc/dhtTbX4k/usuario-1.png'; 
                case 'trabajo':
                    return 'https://i.postimg.cc/Cz4q6YHp/portafolio-1.png';
                case 'hogar':
                    return 'https://i.postimg.cc/fkmXmYVL/hogar-1.png';
                case 'finanzas':
                    return 'https://i.postimg.cc/LnSPThPV/moneda-1.png'; 
                default:
                    return 'ruta_predeterminada.png';
            }
        }

        // Genero funcion para cargar dinamicamente las tarjetas de las tareas ingresadas
        const cargarListado = () => {
            // Limpio el contenedor antes de volver a cargar las tareas
            tareaContainer.innerHTML = ""; 
            // Itero sobre el array tarea para generar cada tarea. Aplico toLowerCase para oasar a minuscula y levante el dato de la categoria para color e icono de la misma
            // Genero la tarjeta de la tarea con el nombre, el icono de la categoria, y los botones. Aplico link para la descripcion de la tarea.
            tareas.map((tarea, index) => {
                tareaContainer.innerHTML += `
                <div class="tarjetaTarea ${tarea.categoria.toLowerCase()}" data-index="${index}">
                    <div class="detalleTarea ${tarea.categoria.toLowerCase()}">
                        <img src="${obtenerRutaIcono(tarea.categoria)}" alt="" class="icono-categoria">
                        <h3 id="nombreTarea"><a href="#" id="linkTarea" onclick="verDescripcion(${index})">${tarea.nombre}</a></h3> 
                    </div>
                    <div class="acciones">
                        <button class="btnEliminar" onclick="eliminarTarea(${index})">
                            <img src="https://i.postimg.cc/PJHFnNxN/eliminar-white.png" alt="">
                        </button>
                        <input type="checkbox" id="checkbox${index}" class="check" onchange="tareaRealizada(${index})">
                    </div>
                </div>`;
            });
        }

    
        // Funcion eliminar tarea
        const eliminarTarea = (index) => {
            // Utilizo confirm para mostrar un mensaje y obtener la confirmación del usuario. 
            // Guardo la respuesta en una variable. Si es aceptar es true y sino es false
            const confirmacion = confirm("¿Estás seguro de que quieres eliminar esta tarea?");
            // Creo una condicion con la respuesta del confirm
            if (confirmacion) {
                // Elimino la tarea del array por el indice de la misma.
                tareas.splice(index, 1); 
                // Vuelve a cargar la lista de tareas actualizada
                cargarListado(); 

                // Verificacion de existencia de tareas para mostrar o no determinada pantalla
                if (tareas.length === 0) {
                    pantallaInicial.style.display = "flex";
                    listaTareas.style.display = "none";
                    descripcionTarea.style.display = "none"
                    descripcionTareaContainer.style.display = "none";
                }
            }
        }           

        cargarListado();

        // Funcion para eliminar tarea que quiera ver la descripcion
        const eliminarTareaSeleccionada = (index) => {
            // Utilizo confirm para mostrar un mensaje y obtener la confirmación del usuario. 
            // Guardo la respuesta en una variable. Si es aceptar es true y sino es false
            const confirmacion = confirm("¿Estás seguro de que quieres eliminar esta tarea?");
            // Verifica si el usuario confirmó antes de eliminar la tarea
            if (confirmacion) {
                tareas.splice(index, 1); // Elimina la tarea del array
                cargarListado(); // Vuelve a cargar la lista de tareas actualizada

                // Verifica si no hay más tareas y muestra la pantalla inicial
                if (tareas.length === 0) {
                    pantallaInicial.style.display = "flex";
                    listaTareas.style.display = "none";
                    descripcionTarea.style.display = "none";
                    descripcionTareaContainer.style.display = "none";
                } else {
                    // Si hay tareas restantes, muestra la lista de tareas
                    listaTareas.style.display = "block";
                    descripcionTarea.style.display = "none";
                }
            }
        }
        cargarListado();
       
       

        // Funcion tachar tarea realizada
        const tareaRealizada = (index) => {
            // Obtengo el checkbox que disparó el evento
            let checkbox = document.getElementById(`checkbox${index}`);

            // Obtengo el elemento que contiene el nombre de la tarea asociada al checkbox
            let linkTareaElement = checkbox.closest('.tarjetaTarea').querySelector('#linkTarea');

            // Aplico el formato tachado según el estado del checkbox
            if (checkbox.checked) {
                linkTareaElement.classList.add('tachado');
            } else {
                linkTareaElement.classList.remove('tachado');
            }
        }

        // Genero evento a cada checkbox
        // Itero por cada checkbox y llamo el evento para correr la funcion tareaRealizada
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => tareaRealizada(index));
        });

        // Funcion para ver la descripcion de la tarea que se selecciona
        const verDescripcion = (index) => {
            // Obtengo la tarea seleccionada del array
            const tareaSeleccionada = tareas[index];
            const descripcionTarea = document.getElementById("descripcionTarea");

            descripcionTarea.innerHTML = `
                <div class="descripcionTareaContainer ${tareaSeleccionada.categoria.toLowerCase()}">
                    <div class="detalleDescripcionTarea ">
                        <img src="${obtenerRutaIcono(tareaSeleccionada.categoria)}" alt="" class="icono-categoria">
                        <h2>${tareaSeleccionada.nombre}</h2>
                        <h4>Descripcion</h4>
                        <p>${tareaSeleccionada.descripcion}</p>
                    </div>
                    <div class="acciones">
                        <button class="btnEliminar" onclick="eliminarTareaSeleccionada(${index})">
                            <img src="https://i.postimg.cc/PJHFnNxN/eliminar-white.png" alt="">
                        </button>
                        <input type="checkbox" id="checkbox" class="check" onchange="tareaRealizada()">
                        <button id="btnOk" onclick="okDescTarea()">OK</button>
                    </div>
                    <button id="btnCerrar" onclick="cerrarDescTarea()">
                        <img src="https://i.postimg.cc/vZPBHkWQ/cerrar.png" alt="">
                    </button>
                </div>
            `;
            // Oculta la lista de tareas y muestra la información detallada
            listaTareas.style.display = "none";
            descripcionTarea.style.display = "block";
        }

        // Fucion de botón ok de tarea relacionada con el evento onclick 
        const okDescTarea = () => {
            // Verifica si no hay más tareas y muestra la pantalla inicial
            if (tareas.length === 0) {
                    pantallaInicial.style.display = "flex";
                    listaTareas.style.display = "none";
                    descripcionTarea.style.display = "none";
                    descripcionTareaContainer.style.display = "none";
                } else {
                    // Si hay tareas restantes, muestra la lista de tareas
                    listaTareas.style.display = "block";
                    descripcionTarea.style.display = "none";
                }
        };

        okDescTarea();

        function cerrarDescTarea() {
            // Verifica si no hay más tareas y muestra la pantalla inicial
            if (tareas.length === 0) {
                    pantallaInicial.style.display = "block";
                    listaTareas.style.display = "none";
                    descripcionTarea.style.display = "none";
                    descripcionTareaContainer.style.display = "none";
                } else {
                    // Si hay tareas restantes, muestra la lista de tareas
                    listaTareas.style.display = "block";
                    descripcionTarea.style.display = "none";
                }
        };

        cerrarDescTarea();