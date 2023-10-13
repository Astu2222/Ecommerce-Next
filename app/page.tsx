'use client'

import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import VisualizarProductos from '../components/VisualizarProductos/VisualizarProductos'
import Carrusel from '../components/Carrusel/Carrusel'


export default function Home() {
	return (
		<div className="page">
			<Carrusel/>
			<VisualizarProductos/>
		</div>
	);
}
