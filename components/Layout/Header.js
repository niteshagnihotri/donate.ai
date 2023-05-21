import React from 'react'
import HeaderLogo from './components/HeaderLogo';
import HeaderNav from './components/HeaderNav';
import HeaderRight from './components/HeaderRight';

const Header = () => {
  return (
    <div className='w-100 shadow-sm sticky top-0 border-b border-gray-700'>
        <div className='w-10/12 mx-auto flex justify-between items-center py-3'>
            <HeaderLogo/>
            <HeaderNav/>
            <HeaderRight/>
        </div>
    </div>
  )
}

export default Header;