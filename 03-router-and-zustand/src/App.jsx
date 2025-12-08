import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/404.jsx";
import NegocioDetail from './pages/NegocioDetail.jsx';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/negocio/:id" element={<NegocioDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
