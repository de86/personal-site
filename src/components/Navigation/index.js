import React from 'react';
import { Link } from 'gatsby';

import styles from './styles.module.css';

const navItems = [
    {text: 'Game Dev', slug: '/game-dev'},
    {text: 'Dev', slug: '/dev'},
    {text: 'Other', slug: '/other'}
]

const Navigation = () => {
    return (
        <nav className={styles.navWrapper}>
            {
                navItems.map((navItem, i) => (
                    <Link to={navItem.slug} key={`nav-item-${i}-${navItem.slug}`}>
                        {navItem.text}
                    </Link>
                ))
            }
        </nav>
    );
}

export default Navigation;
