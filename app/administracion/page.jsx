'use client'
import React from 'react'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import { productos } from '../api/productos/route';
import Link from 'next/link';

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>

      

      <div className="">
      <Link href="/administracion/agregarProducto">

      <Card className="py-4 flex flex-col justify-center items-center">
      <CardHeader className="pb-0 pt-2 px-4 flex flex-col justify-center items-center">
        
        <h4 className="font-bold text-large">Agregar Producto</h4>
        <small className="text-default-500">Usted Cuenta con {productos.length} productos</small>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/admin/1.png"
          width={270}
          />
      </CardBody>
      </CardHeader>
    </Card>
          </Link>

      </div>
      
    </div>
  )
}

export default page