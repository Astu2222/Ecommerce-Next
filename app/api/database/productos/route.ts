import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const products = await sql`SELECT * FROM productos`;
        
        // Mapear los resultados para obtener solo los datos de productos.
        const productData = products.rows.map(row => ({
            id: row.id,
            nombre: row.nombre,
            descripcion: row.descripcion,
            precio: row.precio,
            url_imagen: row.url_imagen
        }));

        return new Response(JSON.stringify(productData), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response('Error al recuperar los productos', { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        
        if (requestData.nombre && requestData.descripcion && requestData.precio && requestData.url_imagen) {
            const result = await sql`INSERT INTO productos (nombre, descripcion, precio, url_imagen) VALUES (${requestData.nombre}, ${requestData.descripcion}, ${requestData.precio}, ${requestData.url_imagen});`;
            return new Response('Datos insertados correctamente', { status: 200 });
        } else {
            return new Response('Faltan campos obligatorios', { status: 400 });
        }
    } catch (error) {
        return new Response('Error en la solicitud', { status: 500 });
    }
}