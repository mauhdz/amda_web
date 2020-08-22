
import React, { Component } from 'react';
import { XR as AwsXR } from 'aws-amplify';
import Amplify from 'aws-amplify';
import Aws_exports from '../aws-exports';

Amplify.configure(Aws_exports);

class SumerianScene extends Component {

    async loadAndStartScene() {
        const progressCallback = (progress) => {
            //console.log(`Sumerian scene load progress: ${progress * 100}%`);
        }

        const sceneOptions = {
            progressCallback
        }

        const { scene } = this.props;
        await AwsXR.loadScene(scene, "sumerian-scene-dom-id", sceneOptions);
        window.controller = AwsXR.getSceneController(scene);
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
