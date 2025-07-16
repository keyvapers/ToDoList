let tareas = [];

    function mostrarTareas() {
      let lista = document.getElementById("listaTareas");
      let filtro = document.getElementById("filtroPrioridad").value;
      let orden = document.getElementById("ordenarPor").value;

      lista.innerHTML = "";

      let tareasFiltradas = tareas.filter(function(t) {
        return filtro === "Todas" || t.prioridad === filtro;
      });

      if (orden === "prioridad") {
        let ordenPrioridad = { "Alta": 1, "Media": 2, "Baja": 3 };
        tareasFiltradas.sort(function(a, b) {
          return ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad];
        });
      } else if (orden === "estado") {
        tareasFiltradas.sort(function(a, b) {
          return a.estado.localeCompare(b.estado);
        });
      }

      let completadas = 0;
      let pendientes = 0;

      for (let i = 0; i < tareasFiltradas.length; i++) {
        let tarea = tareasFiltradas[i];
        let li = document.createElement("li");
        li.className = tarea.prioridad.toLowerCase();
        if (tarea.estado === "Completada") {
          li.className += " completada";
          completadas++;
        } else {
          pendientes++;
        }

        li.innerHTML = '<div class="tarea-detalle"><strong>' + tarea.titulo + '</strong> - ' + tarea.descripcion +
          '<br><small>Prioridad: ' + tarea.prioridad + ' | Estado: ' + tarea.estado + '</small></div>' +
          '<div><button class="estado-btn" onclick="cambiarEstado(' + i + ')">✔</button>' +
          '<button onclick="eliminarTarea(' + i + ')">🗑</button></div>';

        lista.appendChild(li);
      }

      document.getElementById("completadas").textContent = completadas;
      document.getElementById("pendientes").textContent = pendientes;
    }

    function agregarTarea(e) {
      e.preventDefault();

      let titulo = document.getElementById("titulo").value.trim();
      let descripcion = document.getElementById("descripcion").value.trim();
      let prioridad = document.getElementById("prioridad").value;

      if (titulo && descripcion && prioridad) {
        tareas.push({
          titulo: titulo,
          descripcion: descripcion,
          prioridad: prioridad,
          estado: "Pendiente"
        });

        document.getElementById("formTarea").reset();
        mostrarTareas();
      }
    }

    function cambiarEstado(index) {
      if (tareas[index].estado === "Pendiente") {
        tareas[index].estado = "Completada";
      } else {
        tareas[index].estado = "Pendiente";
      }
      mostrarTareas();
    }

    function eliminarTarea(index) {
      if (confirm("¿Estás seguro de eliminar esta tarea?")) {
        tareas.splice(index, 1);
        mostrarTareas();
      }
    }

    // Inicializar
    mostrarTareas();