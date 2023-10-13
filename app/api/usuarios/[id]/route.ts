// /pages/api/usuarios/[id].ts

import { IncomingMessage } from "http";
import { NextResponse } from "next/server";
import raw from "raw-body";
import { NextApiRequest, NextApiResponse } from 'next';
import { usuarios } from '../route';



export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Convierte el parámetro `id` a un número
  const idNumber = parseInt(id);

  // Verifica si la conversión fue exitosa
  if (isNaN(idNumber)) {
    return NextResponse.json("ID no válido");
  }

  // Busca el usuario correspondiente al ID en la lista de usuarios
  const usuariosXId = usuarios.find((usuario) => usuario.id === idNumber);

  if (!usuariosXId) {
    // Si no se encuentra el usuario, devuelve un error 404
    return NextResponse.json("Usuario no encontrado", { status: 404 });
  }

  return NextResponse.json(usuariosXId);
}


