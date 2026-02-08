import Dock from '#components/Dock'
import Navbar from '#components/Navbar'
import Welcome from '#components/Welcome'
import React from 'react'
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import Terminal from '#windows/Terminal';
import Resume from '#windows/Resume';
import Finder from '#windows/Finder';
import Text from '#windows/Text';
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Resume />
      <Finder />
      <Text />
    </main>
  )
}

export default App
