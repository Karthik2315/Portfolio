import useWindowStore from '#store/window'
import { useGSAP } from '@gsap/react';
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable'

const windowWrapper = (Component,windowKey) => {
  const Wrapped = (props) => {
    const {focusWindow,windows} = useWindowStore();
    const{isOpen,zIndex} = windows[windowKey];
    const ref = useRef(null);
    const prevState = useRef(isOpen);
    useEffect(()=>{
      prevState.current = isOpen;
    },[isOpen])
    useGSAP(()=>{
      const el = ref.current;
      if(!el) return;
      if(isOpen){
        el.style.display = "block";
        gsap.fromTo(el,{
          scale:0.8,
          opacity:0,
          y:40
        },{
          scale:1,
          duration:.8,
          opacity:1,
          y:0,
          ease:"power3.out"
        },); 
      }
      if(prevState.current && !isOpen)
      {
        console.log("ji")
        gsap.to(el,{
          scale:0.8,
          opacity:0,
          y:40,
          duration:.8,
          ease:"power3.in"
        })
      }else{
        return null;
      }
    },[isOpen])
    useGSAP(()=>{
      const el = ref.current;
      if(!el) return ;
      gsap.registerPlugin(Draggable);
      const instances = Draggable.create(el,{
        type: "x,y",
        onPress: () => focusWindow(windowKey),
        inertia: false,
      });
      return () => {
        if(instances && instances.length) instances.forEach(i => i && i.kill && i.kill());
      }
    },[focusWindow, windowKey]);
    useLayoutEffect(()=>{
      const el = ref.current;
      if(!el) return ;
      el.style.display = isOpen ? "block":"none";
    },[isOpen])
    return (
      <section
      id={windowKey}
      ref={ref}
      style={{zIndex}}
      className='absolute'>
        <Component {...props} />
      </section>
    )
  }
  Wrapped.displayName= `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
}

export default windowWrapper
