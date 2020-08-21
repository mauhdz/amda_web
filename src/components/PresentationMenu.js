import React, { useContext, useEffect } from 'react';
import GlobalState from '../contexts/GlobalState';

import { emit } from "../utils/SumerianInterface"
import '../App.css';

const PresentationMenu = () => {

    const [state, setState] = useContext(GlobalState);

    const GoHome = () => {
        //Temporary button
        setState(state => ({ ...state, onClient: true }));
        //emit("amplify", state);

        // window.controller.sumerian.world.event("amplify").emit("hola perro");
        // console.log(window.controller.sumerian.world);
    }

    const StartPresentation = () => {
        setState(state => ({ ...state, onClient: false, onPresentation: true }));

    }

    const StopPresentation = () => {
        setState(state => ({ ...state, onClient: true, onPresentation: false }));
    }

    const PreviousClient = () => {
    }

    const NextClient = () => {
    }

    const PreviousSlide = () => {
    }

    const NextSlide = () => {
    }

    const HomeGUI= ()=>{
        return(
            <a href="#" className="nav__link" onMouseDown={GoHome} onTouchStart={GoHome} >
                <i className="material-icons nav__icon">home</i>
            </a>
        )
    }

    //To fix the house button css as only one component 
    const OnClientGUI = () => {
        return (
            <nav className="floating-menu">
                <HomeGUI/>
                <a href="#" className="nav__link" onClick={StartPresentation}>
                    <i className="material-icons nav__icon">play_circle_filled</i>
                </a>

                <a href="#" className="nav__link" style={{ transform: "rotate(180deg)" }} onMouseDown={PreviousClient} onTouchStart={PreviousClient}>
                    <i className="material-icons nav__icon">play_arrow</i>
                </a>

                <a href="#" className="nav__link" onMouseDown={NextClient} onTouchStart={NextClient}>
                    <i className="material-icons nav__icon">play_arrow</i>
                </a>
            </nav>
        )
    };

    const OnPresentationGUI = () => {
        return (
            <nav className="floating-menu">
                <HomeGUI/>

                <a href="#" className="nav__link" onClick={StopPresentation}>
                    <i className="material-icons nav__icon">stop</i>
                </a>

                <a href="#" className="nav__link" onMouseDown={PreviousSlide} onTouchStart={PreviousSlide}>
                    <i className="material-icons nav__icon" style={{ transform: "rotate(180deg)" }}>play_arrow</i>
                </a>

                <a href="#" className="nav__link" onMouseDown={NextSlide} onTouchStart={NextSlide} >
                    <i className="material-icons nav__icon">play_arrow</i>
                </a>

                <a href="#" className="nav__link">
                    <i className="material-icons nav__icon">help</i>
                </a>
            </nav>
        )
    };

    return (
        <div>
            {state.onClient && <OnClientGUI />}
            {state.onPresentation && <OnPresentationGUI />}
        </div>
    )
}

export default PresentationMenu;
