'use client'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import './VisualizarProductos.scss'

import Link from 'next/dist/client/link'
import { useContext } from 'react';
import { MiContexto } from '../MiContexto';

const VisualizarProductos = () => {

    const { productos, setProductos } = useContext(MiContexto);

    return (
        <div className='visualizarProductos'>
            {productos.map((producto) => (

                 
                    <Card key={producto.id} producto={producto} />
                
                
            ))}
        </div>
    );
}

export default VisualizarProductos;
 