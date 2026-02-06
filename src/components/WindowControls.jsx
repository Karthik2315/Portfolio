import useWindowStore from '#store/window'
import React from 'react'

const WindowControls = ({target}) => {
  const {closeWindow} = useWindowStore();
  return (
    <div id='window-controls'>
      <div className='close cursor-pointer' onClick={()=>closeWindow(target)} />
      <div className='minimize cursor-pointer' />
      <div className='maximize cursor-pointer' />
    </div>
  )
}

export default WindowControls
