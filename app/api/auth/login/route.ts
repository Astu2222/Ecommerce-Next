import { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage } from "http";
import { NextResponse } from "next/server";
import raw from "raw-body";
import { usuarios } from "../../usuarios/route";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import cookie from 'cookie';

export const KEY = 'aslkdjaskljdaklsjdalsdjalskdj'



export async function POST(request: Request) {
  
  const nuevoLogin = await request.json();
 
  
  const usuarioEncontrado = usuarios.find(
    (usuario) =>
      usuario.email === nuevoLogin.email &&
      usuario.password === nuevoLogin.password
  );

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
      token: token, // Almacenado como propiedad
    }, { headers: { 'Set-Cookie': cookieHeader } });  
}



export async function GET(request: Request) {
  const token = getTokenFromAuthorizationHeader(request);

  if (!token) {
    return NextResponse.json("Token no encontrado");
  }

  // Verifica si el token es válido
  try {
    const decodedToken = jwt.verify(token, KEY);
    return NextResponse.json({ usuarios, token });
  } catch (error) {
    return NextResponse.json("Token inválido");
  }
}

export function getTokenFromAuthorizationHeader(request: Request): string | undefined {
  const authorizationHeader = request.headers.get('Authorization');

  if (!authorizationHeader) {
    return undefined;
  }

  // Divide el encabezado 'Authorization' para extraer el token
  const [type, token] = authorizationHeader.split(' ');

  if (type === 'Bearer' && token) {
    return token;
  }

  return undefined;
}
















// import { JsonWebTokenError } from "jsonwebtoken";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse } from "next/server";
// import jwt from 'jsonwebtoken';


// const KEY = 'aslkdjaskljdaklsjdalsdjalskdj'

// export async function POST(request:Request) {

//     const {email, password} = await request.json();
//     if(!request){
//        return NextResponse.json("Error")
//     }
//         console.log(email, password)
        
//     return NextResponse.json({
//         token: jwt.sign({
//             admin: email === 'admin' && password === 'admin'
//         }, KEY,{expiresIn: '1h'}),
        
//     })
// }