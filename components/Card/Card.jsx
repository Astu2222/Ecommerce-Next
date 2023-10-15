'use client'
import React, { useEffect, useState } from 'react'

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import {Chip} from "@nextui-org/chip";
import { Button } from '@nextui-org/button';
import { useContext } from 'react';
import { MiContexto } from '../MiContexto';
import Link from 'next/link';

const CardUI = ({ producto }) => {

  const { id, nombre, descripcion, precio, url_imagen } = producto;
  const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritosLocalStorage')) || [];
  const [favorito, setFavorito] = useState(favoritosLocalStorage.includes(id));
  const [favoritoIcon, setFavoritoIcon] = useState(favorito ? "/favorito/heart2.png" : "/favorito/heart.png");

  useEffect(() => {
    if (favorito) {
      setFavoritoIcon("/favorito/heart2.png");
      if (!favoritosLocalStorage.includes(id)) {
        favoritosLocalStorage.push(id);
      }
      console.log(favoritosLocalStorage)

    } else {
      setFavoritoIcon("/favorito/heart.png");
      const index = favoritosLocalStorage.indexOf(id);
      if (index > -1) {
        favoritosLocalStorage.splice(index, 1);
      }
      console.log(favoritosLocalStorage)

    }
    localStorage.setItem('favoritosLocalStorage', JSON.stringify(favoritosLocalStorage));
  }, [favorito, id]);

  const handleFavorito = () => {
    setFavorito(!favorito);
  };

  

return (


<Card className="py-4 m-4">

<Link href={`/detalle/${producto.id}`} key={producto.id}>  

<CardBody className="overflow-visible py-2">
  <Image
    alt="Card background"
    className="object-cover rounded-xl"
    src={url_imagen}
    style={{height:"300px", width:"350px"}}
  />
</CardBody>

</Link>


<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">

  
<Link href={`/detalle/${producto.id}`} key={producto.id}>  
  <h4 className="font-bold text-large">{nombre}</h4>
</Link>


  <small className="text-default-500">{descripcion}</small>

  <div className="flex items-center w-full justify-between">
    
  
    <Chip className="mt-2 w-1/2" color="light" variant="bordered">${precio}</Chip>

    <div className="cursor-pointer" onClick={handleFavorito}>
    <Image className="favoritos-card" src={favoritoIcon} width={25} height={25} style={{border:"none", borderRadius:"0"}}></Image>
    </div>

  </div>



</CardHeader>

</Card>


    

    )
}

export default CardUI;
