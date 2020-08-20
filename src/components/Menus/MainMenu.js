import React from 'react';
import './Menus.css';


function MainMenu() {
    return (
        <header>
            <img className="logo" src="img/logo.svg" alt="logo"/>
            <nav>
                <ul className="nav__links">
                    <li><a href="#">Servicios</a> </li>
                    <li><a href="#">Exhibición</a> </li>
                    <li><a href="#">Nosotros</a> </li>
                </ul>
            </nav>
            <a className="cta" href="#"><button>Contacto</button></a>
        </header>
    )
}

export default MainMenu;