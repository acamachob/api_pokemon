import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

function Button({ prevUrl, nextUrl, onNavigate }) {
  const navigate = useNavigate();
  const { page } = useParams();
  const paginaActual = parseInt(page) || 1;

  const handlePrev = () => {
    if (onNavigate) {
      onNavigate(prevUrl);
    } else if (paginaActual > 1) {
      navigate(`/${paginaActual - 1}`);
    }
  };

  const handleNext = () => {
    if (onNavigate) {
      onNavigate(nextUrl);
    } else {
      navigate(`/${paginaActual + 1}`);
    }
  };

  return (
    <div className="flex space-x-4 justify-center mt-4">
      {prevUrl && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handlePrev}
        >
          ← Anterior
        </button>
      )}
      {nextUrl && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleNext}
        >
          Siguiente →
        </button>
      )}
    </div>
  );
}

Button.propTypes = {
  prevUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  onNavigate: PropTypes.func, 
};

export default Button;
