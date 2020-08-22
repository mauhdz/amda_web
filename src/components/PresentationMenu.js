import React, { useContext, useEffect } from 'react';
import GlobalState from '../contexts/GlobalState';

import { emitSummerianMessage, emitSumerianMessage } from "../utils/SumerianInterface"
import '../App.css';

const PresentationMenu = () => {

    const [state, setState] = useContext(GlobalState);

    const GoBackHome = () => {
        setState(state => ({ ...state, onHome: true, onClient:false, onPresentation:false }));
        console.log("Go back home: ", state)
        emitSumerianMessage("goBackHome");
    }

    const StartPresentation = () => {
        setState(state => ({ ...state, onClient: false, onPresentation: true }));
        emitSumerianMessage("startPresentation");
    }

    const StopPresentation = () => {
        setState(state => ({ ...state, onClient: true, onPresentation: false }));
        emitSumerianMessage("stopPresentation");
    }

    const PreviousClient = () => {
    }

    const NextClient = () => {
    }

    const PreviousSlide = () => {
    }

    const NextSlide = () => {
    }

    const HomeButton= ()=>{
        return(
            <a href="#" className="nav__link" onMouseDown={GoBackHome} >
                <i className="material-icons nav__icon">home</i>
            </a>
        )
    }

    //To fix the house button css as only one component 
    const OnClientGUI = () => {
        return (
            <nav className="floating-menu">
                <HomeButton/>
                <a href="#" className="nav__link" onClick={StartPresentation}>
                    <i className="material-icons nav__icon">play_circle_filled</i>
                </a>

                <a href="#" className="nav__link" style={{ transform: "rotate(180deg)" }} onClick={PreviousClient}>
                    <i className="material-icons nav__icon">play_arrow</i>
                </a>

                <a href="#" className="nav__link" onClick={NextClient}>
                    <i className="material-icons nav__icon">play_arrow</i>
                </a>
            </nav>
        )
    };

    const OnPresentationGUI = () => {
        return (
            <nav className="floating-menu">
                <HomeButton/>

                <a href="#" className="nav__link" onClick={StopPresentation}>
                    <i className="material-icons nav__icon">stop</i>
                </a>

                <a href="#" className="nav__link" onClick={PreviousSlide}>
                    <i className="material-icons nav__icon" style={{ transform: "rotate(180deg)" }}>play_arrow</i>
                </a>

                <a href="#" className="nav__link" onClick={NextSlide}>
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
