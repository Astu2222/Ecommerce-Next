'use client'
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../../../components/MiContexto";
import { Image } from "@nextui-org/image";
import './detalle.scss'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Spinner} from "@nextui-org/spinner";
import {Chip} from "@nextui-org/chip";
import { Button } from "@nextui-org/button";



export default function Page({ params }: { params: { id: string } }) {
  const [productosXID, setProductosXID] = useState<any>(null); // Inicializa con null o un objeto vacío
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    
    setSpinner(true)

    fetch(`/api/productos/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProductosXID(data);
        console.log("el producto id es : " + params.id);
        setSpinner(false)
      })
      .catch((error) => {
        alert("Error: No se trajo nada");
        setSpinner(false)
        // Puedes mostrar un mensaje de error aquí si lo deseas.
      });
  }, [params.id]); // Asegúrate de incluir params.id en la dependencia del efecto


  return (
      <div className="detalle">

      


      {spinner ? 
      
      <div className="flex justify-center items-center">
      
      <Spinner style={{height:"80vh"}} size="lg" />
      
      </div>
      
      : 
      
      <>
      
      {productosXID && (
        
        
        <Card className="m-9">
        <div className="w-full flex flex-row items-center justify-center  ">

          <div className="w-1/2">
          <Image className="m-4" src={productosXID.urlImagen} alt="" />
          </div>

          

            
          <div className="w-1/2 text-center m-4 items-start justify-start">
            <h1 className='text-bold text-5xl m-4' >{productosXID.nombre}</h1>
            <Chip className="text-4xl p-6" color="warning" variant="bordered">Precio: ${productosXID.precio} Ars</Chip>
            <h2 className="m-5" >{productosXID.descripcion}</h2>
            <h1 className='text-bold text-3xl'>Color: <Button>{productosXID.colorPublicacion}</Button> </h1>


          </div>
         

          

        </div>
        </Card>
    )}
      
      </>}

     


      
    </div>
  );
}
