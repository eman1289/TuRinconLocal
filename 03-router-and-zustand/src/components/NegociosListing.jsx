import TarjetaNegocio from "./TarjetaNegocio.jsx";

export default function NegociosListing({ negocios }) {
  return (
    <section className="tarjetas-grid" id="contenedor-tarjetas">
      {
        negocios.length === 0 && (
          <p style={{ textAlign: 'center', padding: '1rem', textWrap: 'balance' }}>No se encontraron negocios que conincidan con los
            criterios de búsqueda.</p>

        )
      }
      {negocios.map((n) => (
        <TarjetaNegocio key={n.id} negocio={n} />
      ))}
    </section>
  );
}
