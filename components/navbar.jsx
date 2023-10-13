'use client'
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Image } from "@nextui-org/image";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/icons";
import './navbar.css'


import { Logo } from "@/components/icons";
import { useEffect, useState } from "react";
import {User} from "@nextui-org/user";

import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownSection,
	DropdownItem
  } from "@nextui-org/dropdown";

  import { useRouter } from 'next/navigation'

export const Navbar = () => {


	const router = useRouter()



	const [userData, setUserData] = useState({}); // Puedes proporcionar un objeto vacío como valor inicial
	 // Función para obtener y analizar los datos del usuario de la cookie
	 
	 const getUserDataFromCookie = () => {
		const cookieValue = document.cookie
		  .split('; ')
		  .find(row => row.startsWith('userData='))
		  ?.split('=')[1];
	  
		if (cookieValue) {
		  const userDataObj = JSON.parse(cookieValue);
		  setUserData(userDataObj);
		}
	  };
	  

	  console.log(userData)

	  // Efecto para cargar los datos del usuario cuando se monta el componente
	  useEffect(() => {
		console.log('Efecto de carga de usuario');
		getUserDataFromCookie();
	  }, []);
	  

	

	
	function cerrarSesion() {
		// Establecer la fecha de expiración en el pasado para eliminar las cookies
		document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		
		console.log('Cookies eliminadas');
		
		// Redireccionar al usuario después de cerrar sesión
		window.location.href = '/';
	  }
	  


	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>

		
	);























	


	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						

					<img
						src="./logo.png"
						alt=""
						width={150}
						className="logo-image"
					/>


					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					
						<NavbarItem>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href='/'
							>
							
							</NextLink>
						</NavbarItem>
					
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
				<NavbarItem className="hidden md:flex">

			
				{ userData.rol === "admin" && (<>


			<Dropdown>
				<DropdownTrigger>
					<Button variant="bordered"> Hola {userData.nombre} </Button>
				</DropdownTrigger>

				<DropdownMenu aria-label="Static Actions">
					
					<DropdownItem className=".dark-text-white" key="new" onClick={() => router.push('/administracion')}><p>Administración</p></DropdownItem>
					<DropdownItem className=".dark-text-white" key="new" onClick={() => router.push('/favoritos')}><p>Favoritos</p></DropdownItem>

					<DropdownItem key="delete" className="text-danger" color="danger" onClick={cerrarSesion}>
					Cerrar Sesión
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
				
				</>) }

				{ userData.rol === "user" && (<>

				<Link href="/login">
					<Button className="mr-4" onClick={cerrarSesion}>
						Cerrar Sesión
					</Button>
				</Link>

				</>) }

				{ userData.rol === null || userData.rol === undefined && (<>

				
					<Button className="mr-4" onClick={() => router.push('/register')}>
						Crear Cuenta
					</Button>
				


				
					<Button className="mr-4" onClick={() => router.push('/login')}>
						Iniciar Sesión
					</Button>
				

				</>) }


						
					
				
				
				
			




					
				

					

	

				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{searchInput}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
