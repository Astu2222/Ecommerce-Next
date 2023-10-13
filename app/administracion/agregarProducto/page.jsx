'use client'
import React, { useState } from 'react'
import {Input} from "@nextui-org/input";
import { Button } from '@nextui-org/button';

const AgregarProducto  = () => {


  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    colorPublicacion: '',
    urlImagen: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto con los datos a enviar
    const productoData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: formData.precio,
      colorPublicacion: formData.colorPublicacion,
      urlImagen: formData.urlImagen,
    };

    // Realizar la solicitud POST a la API utilizando fetch
    fetch( '/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoData),
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta del servidor aquí
        console.log('Solicitud exitosa:', data);
      })
      .catch(error => {
        // Manejar errores aquí
        console.error('Error en la solicitud:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <div className='flex h-full w-full'>

      <form className='flex flex-col justify-center items-center w-full' onSubmit={handleSubmit}>

      <h1 className='text-bold text-4xl'>Agregar Producto</h1>


      <div className=" w-1/5 m-2 mt-7">
      <Input type="text" label="nombre:" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
      </div>

      <div className=" w-1/5 m-2 mt-7">
      <Input type="text" label="descripcion:" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
      </div>

      <div className=" w-1/5 m-2 mt-7">
      <Input type="text" label="precio:" id="precio" name="precio" value={formData.precio} onChange={handleChange} required />
      </div>

      <div className=" w-1/5 m-2 mt-7">
      <Input type="text" label="colorPublicacion:" id="colorPublicacion" name="colorPublicacion" value={formData.colorPublicacion} onChange={handleChange} required />
      </div>
      
      <div className=" w-1/5 m-2 mt-7">
      <Input type="text" label="urlImagen:" id="urlImagen" name="urlImagen" value={formData.urlImagen} onChange={handleChange} required />
      </div>

      <Button type="submit" color="primary" variant="bordered">
          Enviar
        </Button>
      </form>
    </div>
  )
}

export default AgregarProducto