'use client'
import React, { useState } from 'react'

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import {Chip} from "@nextui-org/chip";
import { Button } from '@nextui-org/button';
import { useContext } from 'react';
import { MiContexto } from '../MiContexto';

const CardUI = ({ producto }) => {

    // Accede a las propiedades del producto
    const { id, nombre, descripcion, precio, url_imagen } = producto;

    

    return (


<Card className="py-4 m-4">
<CardBody className="overflow-visible py-2">
  <Image
    alt="Card background"
    className="object-cover rounded-xl"
    src={url_imagen}
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
