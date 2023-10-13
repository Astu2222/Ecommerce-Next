import { IncomingMessage } from "http";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from "@vercel/postgres";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const product = await sql`SELECT * FROM productos WHERE id = ${id}`;
        
        if (product.rowCount === 0) {
            return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
        }
        
        return NextResponse.json(product.rows[0], { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener el producto' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const result = await sql`DELETE FROM productos WHERE id = ${id}`;
        
        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Producto eliminado correctamente' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar el producto' }, { status: 500 });
    }
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const modificarProducto = await request.json();
        const { id } = params;

        // Verificamos que los campos necesarios para la modificación estén presentes en la solicitud.
        if (!modificarProducto.nombre || !modificarProducto.descripcion || !modificarProducto.precio || !modificarProducto.url_imagen) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        // Actualizamos el producto en la base de datos.
        const result = await sql`UPDATE productos
                                 SET nombre = ${modificarProducto.nombre},
                                     descripcion = ${modificarProducto.descripcion},
                                     precio = ${modificarProducto.precio}
                                     url_imagen: ${modificarProducto.url_imagen}

                                 WHERE id = ${id}`;

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Producto modificado correctamente' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error al modificar el producto' }, { status: 500 });
    }
}
