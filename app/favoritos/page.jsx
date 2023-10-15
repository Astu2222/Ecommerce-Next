'use client'
import React, { useContext, useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import { MiContexto } from '../../components/MiContexto';

function ProductsPage() {
  const { productos } = useContext(MiContexto);
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos desde localStorage al montar el componente
  useEffect(() => {
    const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritosLocalStorage')) || [];
    setFavoritos(favoritosLocalStorage);
    console.log(favoritosLocalStorage);
  }, []);

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap"}}>
      {productos.map(producto => {
        // Verificar si el producto no está en la lista de favoritos
        if (!favoritos.includes(producto.id)) {
          // El producto no es un favorito, no lo renderizamos
          return null;
        }

        return (
          <Card
            key={producto.id}
            producto={producto}
            favoritos={favoritos}
            setFavoritos={setFavoritos}
          />
        );
      })}
    </div>
  );
}

export default ProductsPage;