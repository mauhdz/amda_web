import React, { useContext, useEffect } from 'react';
import GlobalState from '../contexts/GlobalState';

import { emitSummerianMessage, emitSumerianMessage } from "../utils/SumerianInterface"
import '../App.css';

const PresentationMenu = () => {

    const [state, setState] = useContext(GlobalState);

    const GoBackHome = () => {
        emitSumerianMessage("goBackHome");
        setState(state => ({ ...state, onClient:false, onPresentation:false }));  
        setTimeout(function(){setState(state => ({ ...state, onHome: true}));},1000);       
    }
 
    const StartPresentation = () => {
        setState(state => ({ ...state, onClient: false, onPresentation: true, onPresentationPaused:false}));
        emitSumerianMessage("startPresentation");
    }

    const PausePresentation = () => {
        setState(state => ({ ...state, onPresentationPaused:true}));
        emitSumerianMessage("pausePresentation");
    }

    const StopPresentation = () => {
        setState(state => ({ ...state, onClient: true, onPresentation: false }));
        emitSumerianMessage("stopPresentation");
    }

    const PreviousClient = () => {
        emitSumerianMessage("previousClient");
    }

    const NextClient = () => {
        emitSumerianMessage("nextClient");
    }

    const PreviousSlide = () => {
    }

    const NextSlide = () => {
        emitSumerianMessage('slide:next');
    }

    const HomeButton= ({clickAction})=>{
        return(
            <a href="#" className="nav__link" onClick={clickAction} >
                <i className="material-icons nav__icon">home</i>
            </a>
        )
    }

    const PlayButton=({clickAction})=>{
        return(
            <a href="#" className="nav__link" onClick={clickAction}>
                <i className="material-icons nav__icon">play_circle_filled</i>
            </a>
        )
    }

    const PauseButton=({clickAction})=>{
        return(
            <a href="#" className="nav__link" onClick={clickAction}>
                <i className="material-icons nav__icon">pause</i>
            </a>
        )
    }

    const StopButton=({clickAction})=>{
        return(
            <a href="#" className="nav__link" onClick={clickAction}>
                <i className="material-icons nav__icon">stop</i>
            </a>
        )
    }

    const ArrowButton=({style, clickAction})=>{
        return(
            <a href="#" className="nav__link" style={style} onClick={clickAction}>
                <i className="material-icons nav__icon">play_arrow</i>
            </a>
        )
    }

    const ContactButton=()=>{
        return(
            <a href="#" className="nav__link">
                <i className="material-icons nav__icon">help</i>
            </a>
        )
    }

    //To fix the house button css as only one component 
    const OnClientGUI = () => {
        return (
            <nav className="floating-menu">
                <HomeButton clickAction={GoBackHome}/>
                <PlayButton clickAction={StartPresentation}/>
                <ArrowButton style={{transform:"rotate(180deg)"}} clickAction={PreviousClient}/>
                <ArrowButton style={{}} clickAction={NextClient}/>
            </nav>
        )
    };

    const OnPresentationGUI = () => {
        return (
            <nav className="floating-menu">
                <HomeButton clickAction={GoBackHome}/>
                {state.onPresentationPaused ? <PlayButton clickAction={StartPresentation}/> : <PauseButton clickAction={PausePresentation}/>}
                <StopButton clickAction={StopPresentation}/>
                <ArrowButton style={{transform:"rotate(180deg)"}} clickAction={PreviousSlide}/>
                <ArrowButton style={{}} clickAction={NextSlide}/>
                <ContactButton/>
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
