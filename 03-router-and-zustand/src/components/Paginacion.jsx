
import styles from "./Paginacion.module.css";
export default function Paginacion({ currentPage = 1, totalPages = 10, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isFirtPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevClick = (event) => {
    event.preventDefault();
    if (isFirtPage === false) {
      onPageChange(currentPage - 1)
    }
  }
  const handleNextClick = (event) => {
    event.preventDefault()
    if (isLastPage === false) {
      onPageChange(currentPage + 1)
    }

  }

  const handleChangePage = (event) => {
    event.preventDefault();
    const page = Number(event.target.dataset.page)
    if (page !== currentPage) {
      onPageChange(page)
    }
  }
  const buildPageUrl = (page) => {
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }


  return (
    <nav className={styles.paginacion}>
      <a href={buildPageUrl(currentPage - 1)} onClick={handlePrevClick} className={styles.pagina}>
        Anterior
      </a>

      {pages.map((page) => (
        <a
          key={page}
          data-page={page}
          href={buildPageUrl(page)}
          className={`${styles.pagina} ${currentPage === page ? styles.isActive : ""
            }`}
          onClick={handleChangePage}
        >
          {page}
        </a>
      ))}

      <a href={buildPageUrl(currentPage + 1)} onClick={handleNextClick} className={styles.pagina}>
        Siguiente
      </a>
    </nav>
  )
}
