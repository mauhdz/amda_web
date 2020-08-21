import React, { useState,useEffect,Component } from 'react';
import './App.css';
import GlobalState from './contexts/GlobalState';

import { XR as AwsXR } from 'aws-amplify';
import Amplify from 'aws-amplify';
import Aws_exports from './aws-exports';

import {addListener, removeListener} from './utils/SumerianInterface'
import PresentationMenu from './components/PresentationMenu'
import NavBar from './components/NavBar'

//import '@aws-amplify/ui/dist/style.css';

Amplify.configure(Aws_exports);

//UI starts

/* function NavBar() {
  return (
      <nav className="navigation-bar">
          <a className="nav-title" href="#">LOGO CLIENT</a>
      </nav>
  )
}  */

function IndeterminateLoading() {
  return (
    <div className="start_screen">
      <h1>LOADING</h1>
    </div>
  )
}

class SumerianScene extends Component {

  async loadAndStartScene() {
    const { scene } = this.props;
    await AwsXR.loadScene(scene, "sumerian-scene-dom-id");
    window.controller = AwsXR.getSceneController(scene);
    console.log(window.controller);
    this.props.onLoaded();
    AwsXR.start("amda");
    AwsXR.enableAudio('amda');
  }

  async componentDidMount() {
    await this.loadAndStartScene();
  }

  render() {
    return (
      <div id='sumerian-scene-dom-id'
        style={{
          width: "100%",
          height: '100%',
          position: "absolute",
        }} />
    )
  }
}

// async function SumerianScene() {

//   async function loadAndStartScene() {
//     const { scene } = this.props;
//     await AwsXR.loadScene(scene, "sumerian-scene-dom-id");
//     window.controller = AwsXR.getSceneController(scene);
//     console.log(window.controller);
//     this.props.onLoaded();
//     AwsXR.start("amda");
//   }

//   await loadAndStartScene();

//   return (
//     <div id='sumerian-scene-dom-id'
//       style={{
//         width: "100%",
//         height: '100%',
//         position: "absolute",
//       }} />
//   );
// }

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
        {state.onLoading && <IndeterminateLoading />}
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