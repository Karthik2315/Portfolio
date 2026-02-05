import { dockApps } from '#constants';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'
import { Tooltip } from 'react-tooltip';
import gsap from 'gsap';
import useWindowStore from '#store/window';

const Dock = () => {
  const {openWindow,closeWindow,windows} = useWindowStore();
  const dockRef = useRef(null);
  useGSAP(()=>{
    const dock = dockRef.current;
    if(!dock) return ;
    const icons = dock.querySelectorAll(".dock-icon");
    const animateIcons = (mouseX) => {
      const {left} = dock.getBoundingClientRect();
      icons.forEach((icon)=>{
        const {left:iconLeft,width} = icon.getBoundingClientRect();
        const center = iconLeft - left + width/2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.5)/20000);
        gsap.to(icon,{
          scale:1 + 0.25*intensity,
          y: -15*intensity,
          duration:0.2,
          ease:"power1.out"
        })
      })
    }
    const handleMouseMove = (e) => {
      const {left} = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    }
    const resetIcons = () => 
      icons.forEach((icon)=>
        gsap.to(icon,{
          scale:1,
          y:0,
          duration:0.2,
          ease:"power1.out"
        }),
      )
    dock.addEventListener("mousemove",handleMouseMove);
    dock.addEventListener("mouseleave",resetIcons);
    return () => {
      dock.removeEventListener("mousemove",handleMouseMove);
      dock.removeEventListener("mouseleave",resetIcons);
    }
  },[]);
  const toggleApp = (app) => {
    if(!app.canOpen) return ;
    const window_temp = windows[app.id];
    if(window_temp)
    {
      return;
    }
    if(window_temp.isOpen){
      closeWindow(app.id);
    }else{
      openWindow(app.id)
    }
    console.log(windows)
  }
  return (
    <section id='dock'>
      <div ref={dockRef} className='dock-container'>
        {dockApps.map((docks)=>(
          <div key={docks.id} className='relative flex justify-center'>
            <button
              type='button'
              className='dock-icon'
              aria-label={docks.name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={docks.name}
              data-tooltip-delay-show={150}
              disabled={!docks.canOpen}
              onClick={()=>toggleApp({id:docks.id,canOpen:docks.canOpen})}
              >
                <img src={`/images/${docks.icon}`} alt={docks.name} loading='lazy' className={`${docks.canOpen ? "":"opactity-60"}`} />
              </button>
          </div>
        ))}
        <Tooltip id='dock-tooltip' place='top' className='tooltip' />
      </div>
    </section>
  )
}

export default Dock
