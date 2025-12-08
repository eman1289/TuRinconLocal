import { useEffect, useState } from "react";

import Paginacion from "../components/Paginacion.jsx";
import SearchFormSection from "../components/SearchFormSection.jsx";
import NegociosListing from "../components/NegociosListing.jsx";

import { useRouter } from "../hooks/useRouter.jsx";

const RESULTS_PER_PAGE = 6

const useFilters = () => {
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return {
      text: params.get('text') || '',
      location: params.get('location') || '',
      calification: params.get('calification') || ''
    }
  })
  const [textToFilters, setTextToFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('text') || ''

  })
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get('page'))
    return isNaN(page) ? page : 1

  });

  const [negocios, setNegocios] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState()
  const { navigateTo } = useRouter()
  useEffect(() => {
    async function fetchNegocios() {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilters) params.append('text', textToFilters)
        if (filters.location) params.append('location', filters.location)
        if (filters.calification) params.append('calification', filters.calification)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offset)
        const queryParams = params.toString()

        const baseUrl = 'https://mi-api-ochre.vercel.app/api/negocios';
        const query = params.toString();
        const url = query ? `${baseUrl}?${query}` : baseUrl;

        const response = await fetch(url);

        const json = await response.json()

        setNegocios(json.data)
        setTotal(json.total)
      } catch (error) {
        console.error('Error fetching negocios:', error)

      } finally {
        setLoading(false)
      }
    }

    fetchNegocios()
  }, [filters, textToFilters, currentPage])


  useEffect(() => {
    const params = new URLSearchParams()
    if (textToFilters) params.append('text', textToFilters)
    if (filters.location) params.append('location', filters.location)
    if (filters.calification) params.append('calification', filters.calification)
    params.append('limit', RESULTS_PER_PAGE)
    const offset = (currentPage - 1) * RESULTS_PER_PAGE
    params.append('offset', offset)
    const queryParams = params.toString()

    if (currentPage > 1) params.append('page', currentPage)
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    navigateTo(newUrl)
  }, [filters, textToFilters, currentPage, navigateTo])

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleTextFilter = (text) => {
    setTextToFilters(text);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return {
    loading,
    currentPage,
    negocios,
    total,
    totalPages,
    textToFilters,
    handleSearch,
    handleTextFilter,
    handlePageChange
  }
}

export function SearchPage() {

  const {
    currentPage,
    negocios,
    total,
    loading,
    totalPages,
    textToFilters,
    handleSearch,
    handleTextFilter,
    handlePageChange
  }
    = useFilters()


  useEffect(() => {
    console.log('effect -> currentPage change: ', currentPage)
    document.title = `Resultados: ${total}, Pagina ${currentPage}- TuRinconLocal`;
  }, [total, currentPage])

  return (
    <main className="resultados-categoria">



      <SearchFormSection
        initialText={textToFilters}
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
      />

      {loading ? <p>Cargando negocios...</p> : <NegociosListing negocios={negocios} />}

      <Paginacion currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </main>


  )
}


