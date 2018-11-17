import React from 'react';
import HeaderNavigation from './HeaderNavigation'
import HeaderScanContainer from './HeaderScanContainer'
import HeaderTitle from './HeaderTitle'
import './Header.css'

const Header = () => (
    <header className='header'>
        <HeaderTitle />
        <HeaderNavigation />
        <HeaderScanContainer />
    </header>
)

export default Header