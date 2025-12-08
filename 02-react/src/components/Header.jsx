import { useState, useEffect } from "react";
import styles from "./Header.module.css";
// Asegúrate de que Link importe correctamente tu componente personalizado
import { Link } from "./Link.jsx";

export default function Header() {
  // 1. Estado para saber la ruta actual
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // 2. Efecto para escuchar cambios de ruta (cuando usas tus Links)
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Escuchamos el evento 'popstate' que dispara tu Link.jsx
    window.addEventListener("popstate", onLocationChange);

    // Limpieza del evento
    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return (
    <header className={styles.header}>
      {/* --- LOGO --- */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ color: 'black', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler-outline icon-tabler-building-store">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 21l18 0" />
            <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
            <path d="M5 21l0 -10.15" />
            <path d="M19 21l0 -10.15" />
            <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
          </svg>
          TuRincónLocal
        </h1>
      </Link>

      {/* --- NAVEGACIÓN (Con clase activa dinámica) --- */}
      <nav className={styles.nav}>
        <Link
          href="/"
          className={currentPath === '/' ? 'is-active' : ''}
        >
          Inicio
        </Link>

        <Link
          href="/search"
          className={currentPath === '/search' ? 'is-active' : ''}
        >
          Categorías
        </Link>

        <Link
          href="/ofertas"
          className={currentPath === '/ofertas' ? 'is-active' : ''}
        >
          Ofertas
        </Link>
      </nav>

      {/* --- ACCIONES DE USUARIO (Cambian según la ruta) --- */}
      <div className={styles.userActions}>

        {/* CASO A: Si estamos en Inicio, mostramos Login/Registro */}
        {currentPath === '/' && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href="./iniciar-sesión.html" className="login">Iniciar Sesión</Link>
            <Link href="./autenticacion.html" className="register">Registrarse</Link>
          </div>
        )}

        {/* CASO B: Si estamos en Categorías (o cualquier otra), mostramos Publicar/Avatar */}
        {currentPath !== '/' && (
          <div className="acciones-usuario" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

            <button className="btn-publicar">
              Publicar mi negocio
            </button>

            {/* Nota: trl-avatar es un Web Component. Asegúrate de tener el script importado en tu index.html */}
            <trl-avatar service="github" username="midudev" size="32"></trl-avatar>

          </div>
        )}

      </div>
    </header>
  );
}