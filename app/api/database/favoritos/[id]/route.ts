import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request, { params }: { params: { id : string } }) {
    try {
      const { id } = params;
      const productosFavoritos = await sql`
      SELECT * from usuarios_favoritos
      WHERE usuario_id = ${id};
      
      `;

      const productosFavoritosXID = productosFavoritos.rows
  
      // Extrae las filas de la consulta SQL y devuélvelas como un array
     
  
      return NextResponse.json(productosFavoritosXID, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error al obtener los productos favoritos" }, { status: 500 });
    }
  }
  