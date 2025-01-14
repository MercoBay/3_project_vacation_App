// Layout.tsx
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import styles from './Layout.module.css';

const Layout = () => (
    <div className={styles.layout}>
        <Header />
        <Sidebar />
        <Content />
        <Footer />
    </div>
);

export default Layout;

// Layout.module.css
.layout {
    display: flex;
    flex-direction: column;
    height: 100%;
}