import React from 'react'
import './NoScan.css'
import Icon from 'react-icons/lib/md/subdirectory-arrow-left'

const NoScan = () => (
    <div className='no-scan'>
        <span className='no-scan-title'><span>Start</span> by performing your <span>first scan</span>...</span>
        <Icon size={100}/>
    </div>
)

export default NoScan