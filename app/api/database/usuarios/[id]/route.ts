import { IncomingMessage } from "http";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";



export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Consulta para obtener los datos del usuario y sus productos favoritos
    const userData = await sql`
      SELECT u.id, u.nombre, u.apellido, u.email, u.url_imagen, u.rol, array_agg(uf.producto_id) AS productos_favoritos
      FROM usuarios AS u
      LEFT JOIN usuarios_favoritos AS uf ON u.id = uf.usuario_id
      WHERE u.id = ${id}
      GROUP BY u.id;
    `;

    if (userData.rowCount === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(userData.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 }
    );
  }
}


// Eliminar un usuario por ID (DELETE)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const result = await sql`DELETE FROM usuarios WHERE id = ${id}`;

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Usuario eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar el usuario" },
      { status: 500 }
    );
  }
}

// Modificar un usuario por ID (PUT)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const modificarUsuario = await request.json();
    const { id } = params;

    // Verificamos que los campos necesarios para la modificación estén presentes en la solicitud.
    if (
      !modificarUsuario.nombre ||
      !modificarUsuario.email ||
      !modificarUsuario.contraseña
    ) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Actualizamos el usuario en la base de datos.
    const result = await sql`UPDATE usuarios
                                 SET nombre = ${modificarUsuario.nombre},
                                     apellido = ${modificarUsuario.apellido},
                                     email = ${modificarUsuario.email},
                                     contraseña = ${modificarUsuario.contraseña},
                                     url_imagen = ${modificarUsuario.url_imagen}
                                 WHERE id = ${id}`;

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Usuario modificado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al modificar el usuario" },
      { status: 500 }
    );
  }
}
