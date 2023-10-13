'use client'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';
import {Image} from "@nextui-org/image";

import { Pagination } from 'swiper/modules';


const Carrusel = () => {
  return (
    <>
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
      <SwiperSlide><Image src="https://images4.alphacoders.com/114/1145851.jpg" alt="" style={{objectFit:"cover" , height:"900px", borderRadius:"0",width:"100vw"}} /></SwiperSlide>
      <SwiperSlide><Image src="https://images5.alphacoders.com/901/901156.jpg" alt="" style={{objectFit:"cover" , height:"900px", borderRadius:"0",width:"100vw"}}  /></SwiperSlide>


    </Swiper>
  </>
  )
}

export default Carrusel