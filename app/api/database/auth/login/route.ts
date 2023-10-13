import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const KEY = 'aslkdjaskljdaklsjdalsdjalskdj';

export async function POST(request: Request) {
  const nuevoLogin = await request.json();
  const { email, password } = nuevoLogin;

  try {
    // Realiza una consulta a la base de datos para obtener el usuario
    const result = await sql`
      SELECT * FROM usuarios
      WHERE email = ${email} AND contraseña = ${password}
    `;

    const usuarioEncontrado = result.rows[0];

    if (!usuarioEncontrado) {
      return NextResponse.json("Fallo iniciar sesión");
    }

    const token = jwt.sign({ admin: usuarioEncontrado.rol === 'admin' }, KEY, { expiresIn: '1h' });

    // Crea una cookie con el token
    const cookieHeader = cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: 3600,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return NextResponse.json({
      usuarioEncontrado,
      token: token,
    }, { headers: { 'Set-Cookie': cookieHeader } });
  } catch (error) {
    return NextResponse.json("Error en la base de datos");
  }
}

export async function GET(request: Request) {
    const token = getTokenFromAuthorizationHeader(request);
  
    if (!token) {
      return NextResponse.json("Token no encontrado");
    }
  
    try {
      const decodedToken = jwt.verify(token, KEY);
      
      // Realiza una consulta a la base de datos para obtener los usuarios (ajusta la consulta según tus necesidades)
      const result = await sql`SELECT * FROM usuarios`;
  
      const usuarios = result.rows;
  
      return NextResponse.json({ usuarios, token });
    } catch (error) {
      return NextResponse.json("Token inválido");
    }
  }
  
  // Función para obtener el token desde el encabezado de autorización
  export function getTokenFromAuthorizationHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.get('Authorization');
  
    if (!authorizationHeader) {
      return undefined;
    }
  
    const [type, token] = authorizationHeader.split(' ');
  
    if (type === 'Bearer' && token) {
      return token;
    }
  
    return undefined;
  }
  
