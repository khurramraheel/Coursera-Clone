import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation
} from 'swiper/core';
SwiperCore.use([Navigation]);
function Numberone(){
  return(<>
  <div id='my-Image'>
  <img className='lebnan' src='Circle.png'/>
   <h1 className='my-color'>Christin B.</h1>
   <p id='country'>Lebanon</p>
   <hr id='my_ruler'/>
   <p className='last-Content'>“Coursera has helped me expand my knowledge through several important courses that are extremely impactful and helpful for my career.”</p>
   </div>
  </>)
}
function Numbertwo(){
  return(<>
 <div id='my-Image'>
<img  className='lebnan' src='Circle2.png'/>
<h1 className='my-color'>Carlos C.</h1>
<p id='country'>United states</p>
<hr id='my_ruler'/>
<p className='last-Content'>“I was able to prove to potential employers that I have a solid understanding of computers and hardware—and started to receive real, viable job offers.”</p>
</div>
  </>)
}
function Numberthree(){
  return(<>
  <div id='my-Image'>
   <img className='lebnan'  src='Circle3.png'/>
   <h1 className='my-color'>Ana S.</h1>
   <p id='country'>United states</p>
   <hr id='my_ruler'/>
    <p className='last-Content'>“For the first time, finishing my degree seemed realistic. It was online with a flexible schedule. It felt like this program was made for my situation.”</p>
    </div>
  </>)
}



export default function App() {
  return (
    <Box className="App" padding={2}>
      <Typography
        variant={'h4'}
        align={'center'}
        fontWeight={700}
      >
       
      </Typography>
      {/** Slider main container */}
      <Box marginTop={4}>
        <Swiper navigation={true} className="mySwiper">
          {/** Slides */}
          {[<Numberone/>, <Numbertwo/>, <Numberthree/>].map((item, i) => (
            <SwiperSlide key={i}>
              <Typography
                variant={'h6'}
                align={'center'}
              >
                {item}
              </Typography>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

