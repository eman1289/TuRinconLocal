import { Link } from "./Link";

export default function TarjetaNegocio({ negocio }) {
  //console.log("NEGOCIO RECIBIDO →", negocio);

  return (
    <div
      className="tarjeta-negocio"
      data-modalidad={negocio.data?.modalidad}
      data-ubicacion={negocio.data?.ubicacion}
      data-calificacion={negocio.data?.calificacion}
    >
      <img src={negocio.imagen} alt={negocio.titulo} width="200px" />

      <h3>{negocio.titulo}</h3>

      <p>{negocio.descripcion}</p>

      <span className="rating">
        ★★★★☆ <span className="rating-num">{negocio?.data?.calificacion ?? "Sin calificación"}</span>
      </span>

      <Link to={`/negocio/${negocio.id}`} className="perfil">
        Ver Perfil
      </Link>
    </div>
  );
}


