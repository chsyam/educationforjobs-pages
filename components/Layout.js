import React from 'react';
import Navbar from './navbar/Navbar';
import GoogleAnalytics from './GoogleAnalytics';

const Layout = ({ children }) => {
    return (
        <>
            <GoogleAnalytics />
            <Navbar />
            <main>{children}</main>
        </>
    );
};

export default Layout;