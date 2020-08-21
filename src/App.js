import React, { useState,useEffect,Component } from 'react';
import './App.css';
import GlobalState from './contexts/GlobalState';

import {addListener, removeListener} from './utils/SumerianInterface'
import PresentationMenu from './components/PresentationMenu'
import NavBar from './components/NavBar'
import LoadingProgress from './components/LoadingProgress'
import SumerianScene from './components/SumerianScene'

function App() {
  const [state, setState] = useState({
    onLoading:true,
    onHome:true,
    onClient:true,
    onPresentation:false
  });

  //window.state makes the app state accesible to Sumerian and it updates whenever it changes
  useEffect(()=>{
    window.state=state;
    console.log("onAnyStateChange: ", window.state)
  },[state]);

  useEffect(()=>{
    console.log("should be called only once when sumerian starts")
  },[state.onLoading]);
  
  return (
    <GlobalState.Provider value={[state,setState]}>
      <div className="App">
        <NavBar />
        {state.onLoading && <LoadingProgress />}
        <div style={{ visibility: state.onLoading && 'hidden' }}>
          <SumerianScene scene='amda'
            onLoaded={() => setState(state=>({...state, onLoading:false}))} />
        </div>
        <PresentationMenu />
      </div>
    </GlobalState.Provider>
  );
}
export default App;