// Layout.tsx
import React from 'react';
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import styles from "./Layout.module.css";

function Layout(): JSX.Element {
    return (
        <div className={styles.layout}>
            <header>
                <Header />
            </header>
            
            <main>
                <Routing />
            </main>
        </div>
    );
}

export default Layout;