import './button.css';

function Button({ prevUrl, nextUrl, setUrl }) {
  return (
    <div className="button-group">
      {prevUrl && (
        <button className="nav-button" onClick={() => setUrl(prevUrl)}>
          ← Anterior
        </button>
      )}
      {nextUrl && (
        <button className="nav-button" onClick={() => setUrl(nextUrl)}>
          Siguiente →
        </button>
      )}
    </div>
  );
}

export default Button;
