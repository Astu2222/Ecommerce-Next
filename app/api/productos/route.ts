import { IncomingMessage } from "http";
import { NextResponse } from "next/server";
import raw from "raw-body";
import { NextApiRequest, NextApiResponse } from 'next';

let ultimoId = 2;

export const productos  = [
  {
    id: "1", // Agregamos un ID único aquí
    nombre: "Conjunto Rojo y Negro",
    descripcion: "Hermoso y sotisficado Conjunto.",
    precio: "12.500",
    colorPublicacion: "red",
    urlImagen:
      "https://c.wallhere.com/photos/07/43/Anna_Kendrick_actress_celebrity_women_auburn_hair_collage-133426.jpg!d",
  },
  {
    id: "2", // Agregamos un ID único aquí
    nombre: "Remera con puntos",
    descripcion: "Hermosa remera con puntos negros.",
    precio: "12.500",
    colorPublicacion: "green",
    urlImagen:
      "https://c.wallhere.com/photos/0e/3b/1680x1050_px_actress_Alicia_Vikander_Auburn_Hair_Skinny_Wavy_Hair_women_Women_Indoors-590496.jpg!d",
  },
  
  
  // Puedes agregar más lugares aquí si es necesario
];

//Obtener productos:

export async function GET(request: Request) {
  return NextResponse.json(productos);
}


// Agregar productos:


export async function POST(request: Request) {
  try {
    const nuevoLugar = await request.json();
    // Incrementa el último ID y úsalo para el nuevo producto
    ultimoId++;
    nuevoLugar.id = ultimoId.toString();
    
    // Crear un nuevo objeto JSON con el ID en la parte superior
    const nuevoProductoConIdArriba = {
      id: nuevoLugar.id,
      ...nuevoLugar,
    };

    // Agrega el nuevo producto a la matriz de productos
    productos.push(nuevoProductoConIdArriba);
    
    return NextResponse.json(nuevoProductoConIdArriba, { status: 201 });
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error);
  }
}

// Borrar productos
export async function DELETE (request:Request) {
  const url = new URL(request.url); // Obtén la URL de la solicitud
  const id = url.searchParams.get("id"); // Obtén el ID del lugar desde los parámetros de la URL

  if (id) {
    const lugarIndex = productos.findIndex((l) => l.id === id);

    if (lugarIndex === -1) {
      return new Response("Lugar no encontrado", { status: 404 }); // Corrección aquí
    }

    const lugarEliminado = productos.splice(lugarIndex, 1)[0];

    return NextResponse.json({ mensaje: "Lugar eliminado con éxito", lugarEliminado });
  }

  return new Response("Falta el parámetro 'id' en la solicitud DELETE", {status: 400,});
  
}

// npm install raw-body
