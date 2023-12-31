'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {Input} from "@nextui-org/input";
import { Button } from '@nextui-org/button';



const Register = () => {
    const router = useRouter()


  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contraseña: '',
        url_imagen: '',
        rol: 'user',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.nombre) {
      errors.nombre = 'El nombre es requerido';
    }

    if (!formData.apellido) {
      errors.apellido = 'El apellido es requerido';
    }

    
    if (!formData.email) {
      errors.email = 'El correo electrónico es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData.url_imagen) {
      errors.url_imagen = 'La URL de la imagen es requerida';
    }

    if (!formData.contraseña) {
      errors.contraseña = 'La contraseña es requerida';
    } else if (formData.contraseña.length < 6) {
      errors.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (validateForm()) {
      try {
        const response = await fetch( '/api/database/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Respuesta de la API:', responseData);

          // Restablecer el formulario o realizar cualquier otra acción
          setFormData({
            nombre: '',
            apellido: '',
            email: '',
            contraseña: '',
            url_imagen: '',
            rol: 'user',
          });

          router.push('/login');
        } else {
          console.error('Error al enviar la solicitud:', response.statusText);
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    }
  };

  return (

    <div className='flex flex-col min-h-full items-center justify-center min-w-full'>
      <h1 className='text-bold text-4xl'>Crear Usuario</h1>
      <form className='flex flex-col justify-center items-center w-full' onSubmit={handleSubmit}>
        <div className=" w-1/5 m-2">
          <Input type="text" label="Nombre:" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
          {formErrors.nombre && <span className="error">{formErrors.nombre}</span>}
        </div>
        <div className=" w-1/5 m-2">
          <Input type="text" label="Apellido:" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
          {formErrors.apellido && <span className="error">{formErrors.apellido}</span>}
        </div>

        <div className=" w-1/5 m-2">
          <Input type="email" label="Correo Electrónico:" id="email" name="email" value={formData.email} onChange={handleChange} required />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>
        <div className=" w-1/5 m-2">
          <Input type="password" label="Contraseña:" id="contraseña" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
          {formErrors.contraseña && <span className="error">{formErrors.contraseña}</span>}
        </div>
        <div className=" w-1/5 m-2">
          <Input type="text" label="URL de la imagen:" id="url_imagen" name="url_imagen" value={formData.url_imagen} onChange={handleChange} required />
          {formErrors.url_imagen && <span className="error">{formErrors.url_imagen}</span>}
        </div>

        <div>
          <Button type="submit" color="primary" variant="bordered">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Register