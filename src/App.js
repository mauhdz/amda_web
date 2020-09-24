import React, { useState, useEffect } from 'react';
import './App.css';
import GlobalState from './contexts/GlobalState';

import { addSumerianListener, removeSumerianListener } from './utils/SumerianInterface'
import PresentationMenu from './components/PresentationMenu'
import NavBar from './components/NavBar'
//import LoadingProgress from './components/LoadingProgress'
import SumerianScene from './components/SumerianScene'


const LoadingProgress=({ progress }) => {
  return (
    <div className="start_screen">
      <h1>Loading: {progress}%</h1>
    </div>
  )
}

const StartButton=({clickAction})=> {
  return (
    <div className="start_screen">
     <button onClick={clickAction}>START</button>
    </div>
  )
}

function App() {
  const [state, setState] = useState({
    progress: 0,
    onLoading: true,
    onStart:false,
    onHome: true,
    onClient: false,
    onPresentation: false,
    onPresentationPaused: false
  });

  //window.state makes the app state accesible to Sumerian and it updates whenever it changes
  useEffect(() => {
    window.state = state;
    //console.log("We are finally home: ", window.state);
  }, [state.onHome]);

  //Listens to events on sumerian scene and changes state
  useEffect(() => {
    addSumerianListener("clientClicked", () => {
      setState(state => ({ ...state, onHome: false, onClient: true }))
    })
    return () => {
      removeSumerianListener("clientClicked", () => {
        console.log('Client clicked')
        setState(state => ({ ...state, onHome: false, onClient: true }))
      })
    }
  }, [state.onLoading]);
  
 /*  const startScene =()=>{
    console.log("whyyyy")
    setState(state =>({...state,onStart:true}))
  } */
  
  return (
    <GlobalState.Provider value={[state, setState]}>
      <div className="App">
        <NavBar />
        {state.onLoading && <LoadingProgress progress={state.progress} />}
        {!state.onLoading && !state.onStart && <StartButton clickAction={()=> setState(state =>({...state,onStart:true}))}/>}
        <SumerianScene scene={'amda'} />
{/*         <div style={{ visibility: !state.onStart && 'hidden' }}>
          <SumerianScene scene={'amda'} />
        </div> */}
      </div>
      <PresentationMenu />
    </GlobalState.Provider>
  );
}
export default App;