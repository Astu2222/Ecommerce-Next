import { IncomingMessage } from "http";
import { NextResponse } from "next/server";
import raw from "raw-body";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import cookie from "cookie";
import { KEY, getTokenFromAuthorizationHeader } from "../auth/login/route";


let ultimoId = 2;

export const usuarios = [
  {
    id: 1,
    nombre: "Nahuel",
    apellido: "Astudillo",
    nombreUsuario: "nahuel125",
    email: "nahuelastudillo@gmail.com",
    password: "123456",
    rol: "admin",
    favoritos: [], // Asegúrate de incluir favoritos con un array vacío
  },
  {
    id: 2,
    nombre: "Liliana",
    apellido: "Tamburini",
    nombreUsuario: "liliana125",
    email: "liliana.tamburini@gmail.com",
    password: "123456",
    rol: "user",
    favoritos: [], // Asegúrate de incluir favoritos con un array vacío
  },
  // Puedes agregar más lugares aquí si es necesario
];


console.log();

interface CustomHeaders extends Headers {
  cookie?: string; // Declara la propiedad 'cookie' en la interfaz
}

//Obtener Todos:

export async function GET(request: Request) {
  return NextResponse.json(usuarios);
}

export async function POST(request: Request) {
  const token = getTokenFromAuthorizationHeader(request);

  if (!token) {
    return NextResponse.json("Token no encontrado");
  }

  try {
    const decodedToken = jwt.verify(token, KEY);
    const nuevoLugar = await request.json();
    // Incrementa el último ID y úsalo para el nuevo producto
    ultimoId++;
    nuevoLugar.id = ultimoId.toString();

    // Crear un nuevo objeto JSON con el ID en la parte superior
    const nuevoProductoConIdArriba = {
      id: nuevoLugar.id,
      ...nuevoLugar,
    };

    // Agrega el nuevo producto a la matriz de usuarios
    usuarios.push(nuevoProductoConIdArriba);

    return NextResponse.json(nuevoProductoConIdArriba, { status: 201 });
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error);
  }
}

// Borrar usuarios
export async function DELETE(request: Request) {
  const url = new URL(request.url); // Obtén la URL de la solicitud
  const id = url.searchParams.get("id"); // Obtén el ID del lugar desde los parámetros de la URL

  if (id) {
    const idToDelete = parseInt(id); // Convierte el ID de cadena a número
    const lugarIndex = usuarios.findIndex((l) => l.id === idToDelete); // Compara con el ID como número

    if (lugarIndex === -1) {
      return new Response("Lugar no encontrado", { status: 404 });
    }

    const lugarEliminado = usuarios.splice(lugarIndex, 1)[0];

    return NextResponse.json({
      mensaje: "Lugar eliminado con éxito",
      lugarEliminado,
    });
  }

  return new Response("Falta el parámetro 'id' en la solicitud DELETE", {
    status: 400,
  });
}

// npm install raw-body
