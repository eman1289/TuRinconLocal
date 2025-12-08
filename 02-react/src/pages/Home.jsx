import { useRouter } from "../hooks/useRouter.jsx";

export function HomePage() {
  const { navigateTo } = useRouter()

  const handleSearch = () => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get("buscador");
    const locationTerm = formData.get("Ubicacion");
    const categoryTerm = formData.get("Categorias");

    const url = searchTerm || locationTerm || categoryTerm
      ? `/search?buscador=${encodeURIComponent(searchTerm)}&ubicacion=${encodeURIComponent(locationTerm)}&categoria=${encodeURIComponent(categoryTerm)}`
      : '/search';
    navigateTo(url)
  }

  return (
    <main>
      <section class="hero">
        <img src="./background.webp.png" alt="Personas paseando 
        por una calle adoquinada con tiendas y restaurantes 
        iluminados al atardecer" width="200" />

        <h1>Descubre lo mejor de tu comunidad</h1>

        <p>Encuentra negocios locales, ofertas exclusivas y servicios
          unicos cerca de ti.</p>

        <form role="search" onSubmit={handleSearch}>
          <div class="inputs-row">
            <div class="input-icon" aria-label="buscador">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-search">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
              <input type="text" name="buscador" placeholder="restaurantes,tiendas,servicios..." />
            </div>

            <div class="input-icon" aria-label="Ubicaciones">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-map-pin-heart">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 11a3 3 0 1 0 -3.973 2.839" />
                <path d="M11.76 21.47a1.991 1.991 0 0 1 -1.173 -.57l-4.244 -4.243a8 8 0 1 1 13.657 -5.588" />
                <path
                  d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
              </svg>
              <input type="text" name="Ubicacion" placeholder="Ubicacion" />
            </div>

            <div class="input-icon" aria-label="Categorias">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-building-store">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 21l18 0" />
                <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                <path d="M5 21l0 -10.15" />
                <path d="M19 21l0 -10.15" />
                <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
              </svg>
              <input type="text" name="Categorias" placeholder="Todas las Categorias" />
            </div>
          </div>
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-search">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
            Buscar
          </button>
        </form>
      </section>

      <section className="destacados">

        <header>
          <h2> Negocios Destacados</h2>
          <div class="flechas">
            <button>&larr;</button>
            <button>&rarr;</button>
          </div>
        </header>



        <div class="negocios-grid">

          <article class="negocio">
            <a href="https://www.goiti.com.mx/panaderia-reposteria" class="negocio-link">
              <img src="./negocioPan.png" alt="Imagen de una panadería" width="200" />
              <h3>Panadería/Repostería "Doña mari"</h3>
              <p>Pan fresco y delicioso todos los días</p>
              <p class="oferta">🎉 Oferta destacada: <strong>20% de descuento</strong> en tu primera compra</p>
            </a>
          </article>

          <article class="negocio">
            <a href="index.html" class="negocio-link">
              <img src="./charro.png" alt="Imagen de un puesto de antojitos mexicanos" width="200" />
              <h3>Puesto de Antojitos Mexicanos "El charro"</h3>
              <p class="oferta">🎉 Oferta destacada: Menu del dia a precio especial.</p>
            </a>
          </article>

          <article class="negocio">
            <a href="index.html" class="negocio-link">
              <img src="./barroNegro.png" alt="Local de Artesanías de Barro Negro" width="200" />
              <h3>Tienda de Artesanías Barro Negro</h3>
              <p class="oferta">🎉 Oferta destacada: Combo "Café Oaxaqueño": Un juego de 2 o 4 tazas de barro negro + una
                bolsa de café local</p>
            </a>
          </article>

        </div>

      </section>

      <section class="registro-negocio">
        <header>
          <h2>¿Tienes un negocio?</h2>
        </header>
        <p>unete a nuestra plataforma y llega a miles de clientes
          en tu comunidad.¡Es facil y rapido!
        </p>
        <button>Registra tu Negocio</button>
      </section>

      <section>
        <footer>
          <header>
            <h2>¿Como funciona?</h2>
          </header>
          <article class="paso">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-search">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
            <h3>1. Busca y Descubre</h3>
            <p>Usa nuestra barra de búsqueda para encontrar exactamente lo que necesitas, filtrando por categoría,
              ubicación
              o tipo de negocio.</p>
          </article>
          <article class="paso">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-building-store">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 21l18 0" />
              <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
              <path d="M5 21l0 -10.15" />
              <path d="M19 21l0 -10.15" />
              <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
            </svg>
            <h3>2. Explora Perfiles</h3>
            <p>Visita los perfiles de los negocios para ver sus productos, servicios, horarios, y ofertas especiales.</p>
          </article>

          <article class="paso">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-user-heart">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h.5" />
              <path
                d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
            </svg>
            <h3>3. Disfruta Local</h3>
            <p>Contacta, visita y apoya a los negocios de tu comunidad. ¡Disfruta de lo mejor que tu ciudad tiene para
              ofrecer!</p>
          </article>
        </footer>
      </section>
    </main>
  );
}
