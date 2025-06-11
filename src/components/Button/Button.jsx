import './button.css';
import { useNavigate, useParams } from 'react-router-dom';

function Button({ prevUrl, nextUrl }) {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const paginaActual = parseInt(pageNumber) || 1;

  const irAAnterior = () => {
    if (paginaActual > 1) {
      const nuevaPagina = paginaActual - 1;
      navigate(`/${nuevaPagina}`);
    }
  };

  const irASiguiente = () => {
    const nuevaPagina = paginaActual + 1;
    navigate(`/${nuevaPagina}`);
  };

  return (
    <div className="button-group">
      {prevUrl && (
        <button className="nav-button" onClick={irAAnterior}>
          ← Anterior
        </button>
      )}
      {nextUrl && (
        <button className="nav-button" onClick={irASiguiente}>
          Siguiente →
        </button>
      )}
    </div>
  );
}

export default Button;
