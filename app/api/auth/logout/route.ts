import { NextResponse } from "next/server";
import { usuarios } from "../../usuarios/route";




export async function POST(request : Request) {

    return NextResponse.json("Cerro Sesión con exito")

}