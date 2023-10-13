// MiContexto.js
import { createContext, useContext, useState, useEffect } from 'react';

// Crea el contexto
export const MiContexto = createContext();

// Crea un proveedor de contexto
export const MiContextoProvider = ({ children }) => {



 // GET DE TODOS LOS PRODUCTOS!!!
 
  const [productos, setProductos] = useState([])

      useEffect(() => {
          fetch("http://localhost:3000/api/productos")
              .then((response) => response.json())
              .then((data) => {
                  setProductos(data);
              })
              .catch((error) => {
                  alert("Error: No se trajo nada", error);
                  // Puedes mostrar un mensaje de error aquí si lo deseas.
              });
      }, []);






  return (
    <MiContexto.Provider value={{ productos, setProductos  }}>
      {children}
    </MiContexto.Provider>
  );


};
