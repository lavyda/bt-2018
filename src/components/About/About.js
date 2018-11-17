import React from 'react'
import AboutLink from './AboutLink'
import './About.css'

const About = () => (
    <div className='about'>
        <div className='about-title'>About</div>
        <div className='about-paragraph'>
            <div>What is Lynis?</div>
            <div>Lynis is an open source security auditing tool used to evaluate the security defenses
                of Linux and Unix-based systems. It runs on the host itself, so it performs more
                extensive security scans than vulnerability scanners.
                <br />
                This applicaion is graphical representation of Lynis auditing report.
            </div>
        </div>
        <div className='about-paragraph'>
            <div>What is Hardening Index?</div>
            <div>This index is  unique to Lynis. The index gives the auditor an impression on how well
                a system is hardened. This number however is just an indicator on taken measures.
                One should not confused it with a percentage on how “safe” a system might be.
            </div>
        </div>
        <div className='about-paragraph'>
            <div>How to use this application?</div>
            <div>Simply click Scan in lower left corner and wait for the results.
                <br />You need to have <AboutLink link='https://packages.cisofy.com/community/' text='Lynis' /> installed on your computer. You also need to have installed
                these <AboutLink link='https://github.com/d4t4king/lynis-report-converter' text='packages' />: on Debian/Ubuntu libjson-perl, on RHEL/CentOS/Fedora
                perl-Module-Load-Conditional and perl-JSON.
            </div>
        </div>
    </div>
)

export default About