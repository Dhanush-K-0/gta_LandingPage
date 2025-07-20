import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'

const App = () => {
  const maskGroupRef = useRef(null);
  const [content, setContent] = useState(false);

  useGSAP(() => {
    if (!content && maskGroupRef.current) {
      const tl = gsap.timeline();
      tl.to(maskGroupRef.current, {
        rotate: 10,
        duration: 2,
        ease: 'power4.easeInOut',
        transformOrigin: '50% 50%',
      }).to(maskGroupRef.current, {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: 'Expo.easeInOut',
        transformOrigin: '50% 50%',
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            setContent(true);
            tl.kill();
          }
        }
      });
    }
  }, [content]);

  useGSAP(() => {
    gsap.to('.main', {
      scale: 1,
      rotate: 0,
      ease: 'Expo.easeInOut',
      duration: 2,
      delay:-1,
    });
    gsap.to('.sky', {
      rotate: 0,
      ease: 'Expo.easeInOut',
      duration: 2,
      delay:-.7,
    });
    gsap.to('.bg', {
      rotate: 0,
      ease: 'Expo.easeInOut',
      duration: 2,
      delay:-.7,
    });

    const main = document.querySelector('.main');
    if (!main) return;

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to('.image .text', {
        x: `${xMove * 0.4}%`,
      });
      gsap.to('.sky', {
        x: xMove,
      });
      gsap.to('.bg', {
        x: xMove * 1.7,
      });
    };
    main.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      main.removeEventListener('mousemove', handleMouseMove);
    };
  }, [content]);

  return (
    <>
      {!content && (
        <div className='svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black'>
          <svg viewBox='0 0 800 600' preserveAspectRatio='XMidYMid slice'>
            <defs>
              <mask id='Mask'>
                <rect width='100%' height='100%' fill='black' />
                <g className='mask-group' ref={maskGroupRef}>
                  <text
                    x='50%'
                    y='50%'
                    fontSize='200'
                    textAnchor='middle'
                    fill='white'
                    dominantBaseline='middle'
                    fontFamily='Arial Black'>
                    VI
                  </text>
                </g>
              </mask>
            </defs>
            <image
              href='/bg.png'
              width='100%'
              height='100%'
              preserveAspectRatio='XMidYMid slice'
              mask='url(#Mask)'
            />
          </svg>
        </div>
      )}

      {content && (
        <div className='main hide-scrollbar  overflow-auto w-full rotate-[-10deg] scale-[1.3]'>
          <div className='landing overflow-hidden relative w-full h-screen'>
            <div className="navbar absolute top-0 z-[10] left-0 w-full px-10 py-10">
              <div className="logo flex  gap-4">
                <div className="lines flex flex-col gap-1 z-[12] mt-[10px]">
                  <div className="line w-10 h-1 bg-white  "></div>
                  <div className="line w-8 h-1 bg-white  "></div>
                  <div className="line w-5 h-1 bg-white  "></div>
                </div>
                <h3 className='text-2xl text-white ' >Rockstar</h3>
              </div>
            </div>
            <div className="image relative w-full h-screen overflow-hidden">
              <img src='/sky.png' alt='Background' className='sky absolute rotate-[-15deg] scale-[1.3] top-0 left-0 w-full h-full object-cover' />
              <img src='/bg.png' alt='Background' className='bg absolute rotate-[-15deg] scale-[1.1] top-0 left-0 w-full h-full object-cover' />
              <div className="text absolute text-white top-1 left-1/2  -translate-x-1/4 flex flex-col gap-2">
                <h1 className="text-9xl -ml-20 ">Grand</h1>
                <h1 className="text-9xl ml-20">Theif</h1>
                <h1 className="text-9xl -ml-20">auto</h1>
              </div>
              <img src='/girlbg.png' alt='girl' className='absolute left-1/2 -translate-x-1/2 -bottom-[65%] scale-64' />
            </div>
            <div className="btmba absolute  bottom-0 left-0 px-10 py-7  w-full bg-gradient-to-t from-black to-transparent ">
              <div className="scroll flex gap-2 items-center text-white pt-5 ">
                <i className=" animate-bounce text-2xl ri-arrow-down-line"></i>
                <h3 className=' font-[Helvetica_Now_Display]'>Scroll Down</h3>
              </div>
              <img src='/ps5.png' alt='Logo' className='absolute h-[50%] top-1/2 left-1/2  -translate-x-1/2' />
            </div>
          </div>
          <div className="second w-full h-screen flex items-center justify-center bg-black overflow-hidden ">
            <div className="cntr w-full h-[80%] flex items-center justify-center">
              <div className="limg relative h-full w-1/2 lg:h-full lg:w-1/4">
                <img src='/imag.png' alt='PS5' className='absolute scale-[1.3]  top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 '/>
              </div>
              <div className="rimg text-white w-1/2 flex flex-col item-start">
                <h1 className="text-3xl">Still Running,</h1>
                <h1 className="text-3xl">Not Hunting</h1>
                <p className=' mt-10 font-[Helvetica_Now_Display]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit voluptatibus hic error quia aspernatur, libero dolorum repellendus modi assumenda eos sapiente ut expedita?</p>
                <p className='mt-10 font-[Helvetica_Now_Display]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero natus quidem aut minus!</p>
                <div className="but mt-10">
                  <button className='bg-yellow-500 px-10 py-3 text-2xl text-black'>Download Now</button>
                </div>
              </div>
            </div>
            </div>
        </div>
      )}
    </>
  )
}
export default App
