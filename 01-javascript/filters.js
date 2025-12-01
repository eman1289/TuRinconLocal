// Archivo: 01-javascript/filters.js

document.addEventListener('DOMContentLoaded', () => {
  // Referencias a los inputs
  const form = document.querySelector('#filter-global');
  const inputNombre = document.querySelector('#local-search-input');
  const selectUbicacion = document.querySelector('#filter-location');
  const inputCalificacion = document.querySelector('#filter-calif');
  const mensaje = document.querySelector('#filter-selecter-value');

  // --- FUNCIÓN DE FILTRADO PURA ---
  function ejecutarFiltros(evento) {
    if (evento && evento.type === 'submit') evento.preventDefault();

    // Seleccionamos lo que haya en el DOM en este momento
    const tarjetas = document.querySelectorAll('.tarjeta-negocio');

    const texto = inputNombre.value.toLowerCase().trim();
    const ubicacionSel = selectUbicacion.value;
    const califMin = parseFloat(inputCalificacion.value) || 0;

    let contador = 0;

    tarjetas.forEach(tarjeta => {
      // Recopilamos datos
      const nombre = tarjeta.querySelector('h3').textContent.toLowerCase();
      const desc = tarjeta.querySelector('p').textContent.toLowerCase();
      // Data attributes
      const modalidad = tarjeta.dataset.modalidad ? tarjeta.dataset.modalidad.toLowerCase() : '';
      const ubicacion = tarjeta.dataset.ubicacion;
      const calif = parseFloat(tarjeta.dataset.calificacion);

      // Lógica
      const matchTexto = nombre.includes(texto) || desc.includes(texto) || modalidad.includes(texto);
      const matchUbicacion = ubicacionSel === '' || ubicacion === ubicacionSel;
      const matchCalif = calif >= califMin;

      if (matchTexto && matchUbicacion && matchCalif) {
        tarjeta.style.display = '';
        contador++;
      } else {
        tarjeta.style.display = 'none';
      }
    });

    // Actualizar mensaje
    if (mensaje) {
      mensaje.textContent = contador > 0
        ? `Se encontraron ${contador} resultados.`
        : "No hay resultados.";
      mensaje.style.color = contador > 0 ? "inherit" : "red";
    }
  }

  // --- LISTENERS (ESCUCHADORES) ---

  // 1. Inputs del usuario
  if (inputNombre) inputNombre.addEventListener('input', ejecutarFiltros);
  if (selectUbicacion) selectUbicacion.addEventListener('change', ejecutarFiltros);
  if (inputCalificacion) inputCalificacion.addEventListener('input', ejecutarFiltros);
  if (form) {
    form.addEventListener('submit', ejecutarFiltros);
    form.addEventListener('reset', () => setTimeout(ejecutarFiltros, 10));
  }

  // 2. ESCUCHAR AL OTRO ARCHIVO (La conexión mágica)
  // Cuando fetch-data.js termine, lanzará este evento y nosotros ejecutaremos el filtro inicial
  document.addEventListener('negociosCargados', () => {
    console.log("✅ Filtros activados: Datos detectados.");
    ejecutarFiltros();
  });
});