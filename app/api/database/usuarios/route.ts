import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';
import { getTokenFromAuthorizationHeader } from "../auth/login/route";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const KEY = 'aslkdjaskljdaklsjdalsdjalskdj';



export async function GET(request: Request) {
    const token = getTokenFromAuthorizationHeader(request);
  
    if (!token) {
      return new Response('Token no encontrado', { status: 401 }); // No se proporcionó token o el token es inválido
    }
  
    try {
      const decodedToken = jwt.verify(token, KEY);
  
      if (typeof decodedToken === 'string') {
        return new Response('Token inválido', { status: 401 });
      }
  
      // Verifica si el token es válido y si tiene permisos para acceder a la lista de usuarios
      if (decodedToken && decodedToken.admin) {
        const result = await sql`SELECT * FROM usuarios`;
        const usuarios = result.rows;
  
        const userData = usuarios.map(row => ({
          id: row.id,
          nombre: row.nombre,
          apellido: row.apellido,
          email: row.email,
          contraseña: row.contraseña,
          url_imagen: row.url_imagen,
          rol: row.rol
        }));
  
        return new Response(JSON.stringify(userData), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } else {
        return new Response('Acceso no autorizado', { status: 403 }); // El token no tiene permisos para acceder a la lista de usuarios
      }
    } catch (error) {
      return new Response('Token inválido', { status: 401 });
    }
  }
  

// CREATE TABLE usuarios (
//     id serial PRIMARY KEY,
//     nombre varchar(255) NOT NULL,
//     apellido varchar(255) NOT NULL,
//     email varchar(255) UNIQUE NOT NULL,
//     contraseña varchar(255) NOT NULL,
//     url_imagen varchar(255),
//     rol varchar(255) NOT NULL
// );


export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        
        if (requestData.nombre && requestData.apellido && requestData.email && requestData.contraseña && requestData.url_imagen && requestData.rol) {
            const result = await sql`INSERT INTO usuarios (nombre, apellido, email, contraseña, url_imagen, rol) VALUES (${requestData.nombre}, ${requestData.apellido}, ${requestData.email}, ${requestData.contraseña}, ${requestData.url_imagen},${requestData.rol});`;
            return new Response('Datos insertados correctamente', { status: 200 });
        } else {
            return new Response('Faltan campos obligatorios', { status: 400 });
        }
    } catch (error) {
        return new Response('Error en la solicitud', { status: 500 });
    }
}