// Archivo: 01-javascript/fetch-data.js

document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.querySelector('#contenedor-tarjetas');

  // Validamos que exista el contenedor antes de intentar hacer nada
  if (!contenedor) return;

  try {
    const respuesta = await fetch('/01-javascript/data.json');
    if (!respuesta.ok) throw new Error('Error al cargar JSON');

    const negocios = await respuesta.json();

    // Limpiamos y Renderizamos
    contenedor.innerHTML = '';

    negocios.forEach(negocio => {
      const tarjetaHTML = `
                <div class="tarjeta-negocio" 
                     data-modalidad="${negocio.data.modalidad}" 
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

    console.log("✅ Datos pintados en el HTML");

    // --- EL TRUCO DE LA COMUNICACIÓN ---
    // Despachamos un evento avisando a "quien le interese" que los datos están listos
    const eventoCarga = new Event('negociosCargados');
    document.dispatchEvent(eventoCarga);

  } catch (error) {
    console.error(error);
    contenedor.innerHTML = '<p>No se pudieron cargar los negocios.</p>';
  }
});