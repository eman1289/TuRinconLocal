import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; // Corregido: 'react-router-dom' es lo estándar, pero si usas 'react-router' está bien
import { Link } from "../components/Link";
import styles from "../components/NegocioDetail.module.css";

export default function NegocioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [negocio, setNegocio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // CAMBIO CLAVE:
    // En lugar de llamar a "/api/negocios", llamamos a "/api/negocios/EL_ID"
    // Esto conecta con tu archivo [id].js que vimos en la imagen.
    fetch(`https://mi-api-ochre.vercel.app/api/negocios/${id}`)
      .then((res) => {
        // Si el servidor (tu archivo [id].js) devuelve 404, navegamos a not-found
        if (!res.ok) {
          if (res.status === 404) {
            navigate("/not-found");
          }
          throw new Error("No se pudo obtener el negocio");
        }
        return res.json();
      })
      .then((data) => {
        // Como tu API [id].js devuelve el objeto directo, no necesitamos .find()
        setNegocio(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <p>Cargando...</p>;
  if (!negocio) return null; // Evita errores de renderizado si falló la carga

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to="/search">Categorías</Link>
        <span>/</span>
        <span>{negocio.titulo}</span>
      </nav>

      <header className={styles.header}>
        {/* Asegúrate que la ruta de la imagen sea correcta según tu API */}
        <img src={`/assets/${negocio.imagen}`} alt={negocio.titulo} />
        <h1>{negocio.titulo}</h1>
        <p>{negocio.descripcion}</p>
        <p><strong>Ubicación:</strong> {negocio.ubicacion_texto}</p>

        {/* Cuidado aquí: Estás enlazando a la misma página en la que ya estás */}
        <Link to={`/negocio/${negocio.id}`} className={styles.btnPerfil}>
          Ver perfil
        </Link>
      </header>
    </div>
  );
}