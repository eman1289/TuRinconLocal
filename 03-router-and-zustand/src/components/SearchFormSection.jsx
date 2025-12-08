import { useId, useRef } from "react"
import { useState } from "react";
import styles from './SearchFormSection.module.css';


const useSearchForm = (idText, idSelect, idNumber, onSearch, onTextFilter) => {

  const timeoutId = useRef(null)
  const [searchText, setSearchText] = useState("")


  const handleSubmit = (event) => {
    event.preventDefault()


    const formData = new FormData(event.target)

    if (event.target.id === idText) {
      return
    }

    const filters = {
      text: formData.get(idText),
      location: formData.get(idSelect),
      calification: formData.get(idNumber)
    }
    onSearch(filters)

  }
  const handleTextChange = (event) => {


    const text = event.target.value
    setSearchText(text)// Actualizamos el input inmediatamente

    //DEBOUNCE: CANCELA EL ANTERIOR TIMEOUT ANTERIOR 
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {

      onTextFilter(text)

    }, 500);

  }
  const handleReset = () => {
    onSearch({
      text: "",
      location: "",
      calification: ""
    });
    onTextFilter("");
  };

  return {
    searchText,
    handleSubmit,
    handleTextChange,
    handleReset
  }
}



export default function SearchFormSection({ onTextFilter, onSearch, initialText }) {
  const idText = useId()
  const idSelect = useId()
  const idNumber = useId()

  const {
    handleSubmit,
    handleTextChange,
    handleReset
  } = useSearchForm(idText, idSelect, idNumber, onSearch, onTextFilter)







  return (
    <>
      <section className={styles["buscador-filtros"]}>

        <h2>Busca tu Local Favorito</h2>

        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className={styles["filtros-form"]}
          id="filter-global"
        >

          <input
            name={idText}
            type="text"
            placeholder="Buscar por nombre o palabra clave"
            id="local-search-input"
            onChange={handleTextChange}
            className={styles["input-text"]}
            defaultValue={initialText}
          />

          <select
            name={idSelect}
            id="filter-location"
            className={styles["select-location"]}
          >
            <option value="">Ubicación</option>
            <option value="centro">Centro</option>
            <option value="norte">Norte</option>
            <option value="sur">Sur</option>
          </select>

          <input
            name={idNumber}
            type="number"
            min="1"
            max="5"
            step="0.1"
            placeholder="Calificación mínima"
            id="filter-calif"
            className={styles["input-number"]}
            defaultValue={initialText}
          />

          <div className={styles["botones-filtro"]}>
            <button type="submit">Aplicar Filtros</button>
            <button type="reset">Limpiar Filtros</button>
          </div>
        </form>

        <h2 style={{ textAlign: 'center', width: '100%' }}>
          Resultados de búsqueda:
        </h2>
      </section>
    </>

  )
}