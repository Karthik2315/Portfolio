import WindowControls from '#components/WindowControls';
import windowWrapper from '#hoc/windowWrapper'
import React from 'react'

const Resume = () => {
  return (
    <>
      <div id='window-header' >
        <WindowControls target="resume" />
      </div>
    </>
  )
}

const ResumeWindow = windowWrapper(Resume,"resume");
export default ResumeWindow
