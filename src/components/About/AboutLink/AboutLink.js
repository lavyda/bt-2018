import React from 'react'
import './AboutLink.css'
const shell = window.require('electron').shell

const AboutLink = ({ link, text }) => (
    <span className='about-link' onClick={() => shell.openExternal(link)}>{text}</span>
)

export default AboutLink