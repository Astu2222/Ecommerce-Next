'use client'
import React, { useState } from 'react'

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import {Chip} from "@nextui-org/chip";
import { Button } from '@nextui-org/button';



const CardUI = ({ producto }) => {

    // Accede a las propiedades del producto
    const { id,urlImagen, nombre, descripcion, precio } = producto;



	// ENVIAR FAVORITO POR ID
  const [favoritoXID, setFavoritoXID] = useState()
 

	const handleFavoritoXID = () => {

    console.log(producto.id)
		
	}

    

    return (


<Card className="py-4 m-4">
<CardBody className="overflow-visible py-2">
  <Image
    alt="Card background"
    className="object-cover rounded-xl"
    src={urlImagen}
    width={270}
    height={270}
  />
</CardBody>
<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
<h4 className="font-bold text-large">{nombre}</h4>
  <small className="text-default-500">{descripcion}</small>

  <div className="flex items-center w-full justify-between">

  <Chip className="mt-2 w-1/2" color="light" variant="bordered">${precio}</Chip>

<Image className="favoritos-card" src='/favorito/heart.png' width={25} height={25} style={{border:"none", borderRadius:"0"}}></Image>

  </div>



</CardHeader>

</Card>


    

    )
}

export default CardUI;
