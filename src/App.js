import React, { useState, Component } from 'react';
import './App.css';
import GlobalState from './contexts/GlobalState';
import PresentationMenu from './components/Menus/PresentationMenu'
import MainMenu from './components/Menus/MainMenu'


import { XR as AwsXR } from 'aws-amplify';
import Amplify from 'aws-amplify';
import Aws_exports from './aws-exports';
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
    AwsXR.enableAudio('scene1');
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
  
  return (
    <GlobalState.Provider value={[state,setState]}>
      <div className="App">
        <MainMenu />
   {/*      {state.onLoading && <IndeterminateLoading />}
        <div style={{ visibility: state.onLoading && 'hidden' }}>
          <SumerianScene scene='amda'
            onLoaded={() => setState(state=>({...state, onLoading:false}))} />
        </div> */}
        <PresentationMenu />
      </div>
    </GlobalState.Provider>
  );
}
export default App;