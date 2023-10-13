'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {Input} from "@nextui-org/input";
import { Button } from '@nextui-org/button';

const Login = () => {

  const router = useRouter();

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'El email es requerido';
    }

    if (!formData.password) {
      errors.password = 'El password es requerido';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const responseData = await response.json();
          // console.log('Respuesta de la API:', responseData);

          // Guardar el token en una cookie
          document.cookie = `token=${responseData.token}; path=/`;

          // Guardar los datos del usuario en una cookie (puedes ajustar esto según tus necesidades)
          document.cookie = `userData=${JSON.stringify(responseData.usuarioEncontrado)}; path=/`;

          // En lugar de usar cookies, usa localStorage
          // localStorage.setItem('userData', JSON.stringify(responseData.usuarioEncontrado));



         console.log(responseData.token , responseData.usuarioEncontrado)
          

          // Restablecer el formulario o realizar cualquier otra acción
          setFormData({
            email: '',
            password: ''
          });
          
          //Funciona... pero necesitamos recargar para tener localstorage... punto para cookies jajaja
          // router.push("/")

          window.location.href = "/";
          
          
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
    <h1 className='text-bold text-4xl'>Iniciar Sesión</h1>
    <form className='flex flex-col justify-center items-center w-full' onSubmit={handleSubmit}>
      
      <div className=" w-1/5 m-2 mt-7">
        <Input type="text" label="email:" id="email" name="email" value={formData.email} onChange={handleChange} required />
        {formErrors.email && <span className="error">{formErrors.email}</span>}
      </div>
      <div className=" w-1/5 m-2 mb-7">
        <Input type="text" label="password:" id="password" name="password" value={formData.password} onChange={handleChange} required />
        {formErrors.password && <span className="error">{formErrors.password}</span>}
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

export default Login