
import React, { useState,useEffect,Component} from 'react';
import { XR as AwsXR } from 'aws-amplify';
import Amplify from 'aws-amplify';
import Aws_exports from '../aws-exports';

Amplify.configure(Aws_exports);

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

export default SumerianScene;
  