import WindowControls from '#components/WindowControls'
import { socials } from '#constants'
import windowWrapper from '#hoc/windowWrapper'
import React from 'react'

const Contact = () => {
  return (
    <>
      <div id='window-header'>
      <WindowControls target='contact' />
        <h2>Contact Me</h2>
      </div>
      <div className='p-5 space-y-5'>
        <img src='/images/adrian.jpg' alt='Karthik' className='w-20 rounded-full' />
        <h3>Lets Connect</h3>
        <p>Got an idea? A bug to squash? or just wanna talk tech? I'm in</p>
        <p>Contact Number : +919497280315</p>
        <p>Email : padiyil2004@gmail.com</p>
        <ul>
          {socials.map((social)=>(
            <li key={social.id} style={{backgroundColor:social.bg}}>
              <a href={social.link} target='_blank' rel='noopener noreferrer' title={social.text}>
                <img src={social.icon} alt={social.text} className='size-5' />
                <p>{social.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const contactWrapper = windowWrapper(Contact,"contact")

export default contactWrapper
