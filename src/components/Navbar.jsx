import { navIcons, navLinks } from '#constants'
import React from 'react'
import dayjs from 'dayjs'

const Navbar = () => {
  
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
        <time>{dayjs().format('ddd MMM D h:mm A')}</time>
      </div>
    </nav>
  )
}

export default Navbar
