import { useEffect, useState } from 'react';//Se traen estas dos herramientas especiales de React: useState que es como una caja para guardar la información, useEffect que es una alarma para cuando algo cambia.

import Title from './components/Title/Title.jsx';
import Content from './components/Content/Content.jsx';
import Button from './components/Button/Button.jsx';
import './App.css';


function App() {//Función principal
  const [pokemones, setPokemones] = useState([]);//En pokemones, guardamos o traemos todos los que nos mande la API. [] quiere decir que la caja pokemones empieza vacía, por eso se van a poder guardar allí.
  const [loading, setLoading] = useState(true);//Loading es una caja que necesitamos para poder saber en que van los datos, si esperamos o si nos los muestra. El valor true por defecto, significa que los datos si están cargando, si es false, se debe mostrar en pantalla los pokemones.
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');//La dirección de donde vamos a pedir los datos.
  const [nextUrl, setNextUrl] = useState(null);//Guarda la dirección que sigue, para ver más pokemones
  const [prevUrl, setPrevUrl] = useState(null);//Guarda la dirección anterior, para devolverme a la url 

useEffect(() => {
    const obtenerPokemones = async () => {//async va a internet a buscar cosas que toman tiempo, en este caso, ir a la API y leerla.
      setLoading(true);//El popular "Cargando"
      try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();//Convierte los datos o la respuesta que obtuvo en archivo json compatible con JS.
        setPokemones(datos.results);//Al ir a la API, hay una parte que se llama results que es donde están todos los pokemones. Esta línea guarda solo los results en la const datos y el setPokemones guarda este estado en React, es decir, el estado de lo que se guardó.
        setNextUrl(datos.next); //También guardamos la página siguiente y la anterior (si existen) para después poder mostrar más.
        setPrevUrl(datos.previous); //También guardamos la página siguiente y la anterior (si existen) para después poder mostrar más.
      } catch (error) {//Si algo sale mal, nos avisa en la consola.
      console.error('Error al obtener los pokemones:', error);//Si no los encuentra porque algo salió mal, nos da este mensaje de error. Evita que el código se rompa.
      } finally {//Palabra reservada, es necesario colocarla en el bloque try catch. Aquí haces algo sí o sí, sin importar si falló o funcionó

        setLoading(false);
      }
    };
    obtenerPokemones();
  }, [url]); // El useEffect se vuelve a ejecutar cada vez que cambia la URL. Se llama dependencias.

  return (
    <div className="app-container">
      <Title />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Content pokemones={pokemones} />
          <Button prevUrl={prevUrl} nextUrl={nextUrl} setUrl={setUrl} />
        </>
      )}
    </div>
  );
}

export default App;
