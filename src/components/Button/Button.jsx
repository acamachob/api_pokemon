import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './button.css';

function Button({ prevUrl, nextUrl }) {
  const navigate = useNavigate();
  const { page } = useParams();
  const paginaActual = parseInt(page) || 1;

  const irAAnterior = () => {
    if (paginaActual > 1) {
      navigate(`/${paginaActual - 1}`);
    }
  };

  const irASiguiente = () => {
    navigate(`/${paginaActual + 1}`);
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

Button.propTypes = {
  prevUrl: PropTypes.string,
  nextUrl: PropTypes.string,
};

export default Button;
