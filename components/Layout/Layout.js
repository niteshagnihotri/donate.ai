import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    return (
        <div className='bg-gray-900 text-green-100 h-[100vh]'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout