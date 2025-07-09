import { useEffect, useState } from "react";
import Button from "../../components/Button/Button"; 

function Berries() {
  const [berries, setBerries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/berry?limit=4"); // ✅ empieza con esta

  useEffect(() => {
    const fetchBerries = async () => {
      setLoading(true);
      try {
        const res = await fetch(currentUrl);
        const data = await res.json();

        setNextUrl(data.next);
        setPrevUrl(data.previous);

        const berryDetails = await Promise.all(
          data.results.map(async (berry) => {
            const res = await fetch(berry.url);
            return res.json();
          })
        );

        setBerries(berryDetails);
      } catch (error) {
        console.error("Error cargando berries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerries();
  }, [currentUrl]);

  const handlePagination = (url) => {
    if (url) {
      setCurrentUrl(url);
    }
  };

  if (loading) return <p className="text-center mt-8">Cargando berries...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Berries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {berries.map((berry) => (
          <div key={berry.id} className="bg-white shadow-md rounded p-4">
            <h2 className="font-semibold text-lg capitalize">{berry.name}</h2>
            <p><strong>Potencia:</strong> {berry.power || "N/A"}</p>
            <p><strong>Tamaño:</strong> {berry.size}</p>
          </div>
        ))}
      </div>

      {/*Botones para navegar entre las páginas */}
      <div className="flex justify-center mt-4">
        <Button prevUrl={prevUrl} nextUrl={nextUrl} onNavigate={handlePagination} />
      </div>
    </div>
  );
}

export default Berries;
