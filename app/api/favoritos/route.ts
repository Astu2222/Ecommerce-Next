// favoritos.ts

import { NextResponse } from "next/server";
import { usuarios } from "../usuarios/route";
import { productos } from "../productos/route";

interface FavoritosData {
    productoId: number;
    usuarioId: number;
  }

export async function POST(request: Request) {

    let { productoId, usuarioId } = await request.json(); // Analiza el cuerpo de la solicitud y obtén productoId y usuarioId
    const usuarioConId1 = usuarios.find((usuario) => usuario.id === 1)
    
    if ( usuarioConId1) {
        const nombre = usuarioConId1?.nombre;
        
        return NextResponse.json({ productoId, usuarioId, nombre });


    }

    return NextResponse.json("no se encontrooo");






    
    // favoritos.push(productoId)
   
}
