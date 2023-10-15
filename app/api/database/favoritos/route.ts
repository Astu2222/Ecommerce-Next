import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { usuarioId, productoId } = await request.json();

    // Verifica si el registro ya existe en la tabla intermedia.
    const existingRecord = await sql`
      SELECT *
      FROM usuarios_favoritos
      WHERE usuario_id = ${usuarioId} AND producto_id = ${productoId};
    `;

    if (existingRecord.rowCount === 0) {
      // Inserta el registro en la tabla intermedia si no existe.
      const result = await sql`
        INSERT INTO usuarios_favoritos (usuario_id, producto_id)
        VALUES (${usuarioId}, ${productoId});
      `;
      
      return NextResponse.json({ message: "Producto agregado a favoritos" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "El producto ya está en favoritos" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error al agregar el producto a favoritos" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { usuarioId, productoId } = await request.json();

    // Elimina el registro de la tabla intermedia.
    const result = await sql`
      DELETE FROM usuarios_favoritos
      WHERE usuario_id = ${usuarioId} AND producto_id = ${productoId};
    `;
    
    return NextResponse.json({ message: "Producto eliminado de favoritos" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar el producto de favoritos" }, { status: 500 });
  }
}