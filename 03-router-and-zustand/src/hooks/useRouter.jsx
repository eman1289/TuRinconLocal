import { useNavigate, useLocation } from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateTo(path) {
    if (path !== location.pathname + location.search) {
      navigate(path);
    }
  }

  return {
    pathname: location.pathname,
    search: location.search,
    navigateTo,
  };
}
