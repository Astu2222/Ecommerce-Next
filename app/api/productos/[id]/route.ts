// /pages/api/productos/[id].ts

import { IncomingMessage } from "http";
import { NextResponse } from "next/server";
import raw from "raw-body";
import { NextApiRequest, NextApiResponse } from 'next';
import { productos } from '../route';


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Busca el producto correspondiente al ID en la lista de productos
  const productoXId = productos.find((producto) => producto.id === id);

  if (!productoXId) {
    // Si no se encuentra el producto, devuelve un error 404
    return NextResponse.error();
  }

  return NextResponse.json(productoXId);
}




export async function PUT(request:Request, { params }: { params: { id: string } }) {
  const modificarProducto = await request.json();
  const { id } = params;
  console.log(id)

  // ESTO NOS TRAE EL PRODUCTO DEL ID
  const modificarProductoXID = productos.find((modificarProducto)=> params.id === modificarProducto.id )


  // MODIFICAR EL PRODUCTO DEL ID CON EL REQUEST
  const generarCambiosXID = productos.map((producto)=> producto.id === id ? producto.nombre = modificarProducto.nombre : null )
  

console.log(modificarProductoXID)



  return NextResponse.json(modificarProductoXID)
}