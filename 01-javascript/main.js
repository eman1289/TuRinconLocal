document.addEventListener('DOMContentLoaded', () => {
  // --- 1. ELEMENTOS DEL DOM ---
  const contenedor = document.querySelector('#contenedor-tarjetas');
  const form = document.querySelector('#filter-global');
  const inputNombre = document.querySelector('#local-search-input');
  const selectUbicacion = document.querySelector('#filter-location');
  const inputCalificacion = document.querySelector('#filter-calif');
  const mensaje = document.querySelector('#filter-selecter-value');

  // --- 2. CARGAR LOS DATOS (JSON) ---
  async function cargarNegocios() {
    try {
      // NOTA: Usa la ruta que te funcionó en el paso anterior. 
      // Si moviste el archivo, usa './data.json'. Si no, '/01-javascript/data.json'
      const respuesta = await fetch('/01-javascript/data.json');

      if (!respuesta.ok) throw new Error('No se pudo cargar el JSON');

      const negocios = await respuesta.json();

      // Limpiamos el contenedor antes de llenarlo
      contenedor.innerHTML = '';

      negocios.forEach(negocio => {
        // Creamos el HTML con los datos ocultos (data-attributes) para filtrar después
        // Fíjate que leemos negocio.data.ubicacion (según tu nueva estructura JSON)
        const tarjetaHTML = `
                    <div class="tarjeta-negocio" 
                         data-ubicacion="${negocio.data.ubicacion}" 
                         data-calificacion="${negocio.data.calificacion}">
                         
                        <img src="${negocio.imagen}" alt="${negocio.titulo}" width="200px">
                        <h3>${negocio.titulo}</h3>
                        <p>${negocio.descripcion}</p>
                        <span class="rating">
                            ★★★★☆ <span class="rating-num">${negocio.data.calificacion}</span>
                        </span>
                        <a href="${negocio.enlace}" class="perfil">Ver Perfil</a>
                    </div>
                `;
        contenedor.innerHTML += tarjetaHTML;
      });

      // IMPORTANTE: Ahora que las tarjetas existen, podemos "escuchar" los filtros
      console.log("Tarjetas cargadas correctamente");

    } catch (error) {
      console.error('Error:', error);
      contenedor.innerHTML = `<p>Error cargando datos. Revisa la consola.</p>`;
    }
  }

  // --- 3. FUNCIÓN DE FILTRADO (Corregida) ---
  function filtrarNegocios(evento) {
    if (evento) evento.preventDefault();

    const tarjetas = document.querySelectorAll('.tarjeta-negocio');
    const textoBusqueda = inputNombre.value.toLowerCase().trim();
    const ubicacionSeleccionada = selectUbicacion.value;

    // Convertimos el input a número. Si está vacío, usamos 0 para mostrar todo.
    const calificacionMinima = parseFloat(inputCalificacion.value) || 0;

    let contador = 0;

    tarjetas.forEach(tarjeta => {
      const nombre = tarjeta.querySelector('h3').textContent.toLowerCase();
      const ubicacion = tarjeta.dataset.ubicacion;
      const calificacion = parseFloat(tarjeta.dataset.calificacion);

      // LOGICA DE FILTROS
      const coincideNombre = nombre.includes(textoBusqueda);
      const coincideUbicacion = ubicacionSeleccionada === '' || ubicacion === ubicacionSeleccionada;

      // LOGICA DE CALIFICACIÓN (Mayor o igual)
      // Ejemplo: Si pides 3.5, se mostrarán los de 3.5, 4.0, 4.5 y 5.0
      // Si quieres que sea EXACTO (solo 3.5), cambia '>=' por '==='
      const coincideCalif = calificacion >= calificacionMinima;

      if (coincideNombre && coincideUbicacion && coincideCalif) {
        tarjeta.style.display = '';
        contador++;
      } else {
        tarjeta.style.display = 'none';
      }
    });

    // --- MENSAJE DE RESULTADOS O "NO ENCONTRADO" ---
    if (mensaje) {
      if (contador > 0) {
        mensaje.style.color = "black"; // Color normal
        mensaje.textContent = `Se encontraron ${contador} resultados.`;
      } else {
        // AQUÍ ESTÁ LA MAGIA: Si no hay nadie, mostramos aviso
        mensaje.style.color = "red"; // Lo ponemos rojo para que resalte
        mensaje.textContent = "No hay resultados con estos filtros. Intenta bajar la calificación o cambiar la ubicación.";
      }
    }
  }

  // --- 4. ACTIVAR LOS BOTONES ---
  // Botón Aplicar (submit)
  form.addEventListener('submit', filtrarNegocios);

  // Enter en el buscador
  inputNombre.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') filtrarNegocios(e);
  });

  // Botón Limpiar
  form.addEventListener('reset', () => {
    setTimeout(() => {
      filtrarNegocios(); // Vuelve a filtrar (mostrando todo porque los inputs estarán vacíos)
    }, 10);
  });

  // --- 5. INICIAR TODO ---
  cargarNegocios();
});