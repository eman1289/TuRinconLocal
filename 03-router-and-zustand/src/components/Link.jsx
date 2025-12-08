
// Link.jsx
import { NavLink } from "react-router-dom";

export function Link({ to, href, children, className = "", ...props }) {

  // Si se usa HREF → es un enlace normal
  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  // Si se usa TO → es navegación de React Router
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${className} ${isActive ? "is-active" : ""}`
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}
