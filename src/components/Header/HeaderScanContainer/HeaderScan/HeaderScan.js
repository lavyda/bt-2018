import React from 'react'
import Loading from 'react-loading-animation'
import './HeaderScan.css'

const HeaderScan = ({ actionScan, inProgress, lynisAvailable, packagesAvailable }) => (
    <div className='header-scan'>
        {lynisAvailable
            ?
            <div>
                {packagesAvailable.state
                    ?
                    <div className='scan-available'>
                        {inProgress
                            ?
                            <div className='scan-in-progress'>
                                <Loading />
                            </div>
                            :
                            <div className='scan-no-progress'>
                                <button onClick={() => actionScan()}>SCAN</button>
                            </div>
                        }
                    </div> 
                    :
                    <div className='scan-unavailable'>
                        <span>Package(s) {packagesAvailable.missing} not found.</span>
                        <span>Please install packages and restart application.</span>
                    </div>
                }
            </div>
            :
            <div className='scan-unavailable'>
                <span>Lynis was not found.</span>
                <span>Please install Lynis and restart application.</span>
            </div>
        }
    </div>
)

export default HeaderScan