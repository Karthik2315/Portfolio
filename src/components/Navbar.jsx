import { navIcons, navLinks } from '#constants'
import React, { useEffect, useRef } from 'react'
import dayjs from 'dayjs'

const Navbar = () => {
  const timeRef = useRef(null);
  useEffect(()=>{
    const interval = setInterval(() => {
      if(timeRef.current){
        timeRef.current.textContent = dayjs().format('ddd MMM D h:mm A')
      }
    }, 1000*60);
    return () => clearInterval(interval);
  },[])
  return (
    <nav>
      <div>
        <img src='/images/logo.svg' alt='logo'/>
        <p className='font-semibold'>Karthik's Portfolio</p>
        <ul>
          {navLinks.map((item)=>(
            <li key={item.id}>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map((icon)=>(
            <li key={icon.id}>
              <img src={icon.img} className='icon' alt='' />
            </li>
          ))}
        </ul>
        <time ref={timeRef}>{dayjs().format('ddd MMM D h:mm A')}</time>
      </div>
    </nav>
  )
}

export default Navbar
