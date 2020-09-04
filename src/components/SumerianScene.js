
import React, { Component, useEffect, useContext,useState } from 'react';
import { XR as AwsXR } from 'aws-amplify';
import Amplify from 'aws-amplify';
import Aws_exports from '../aws-exports';
import GlobalState from '../contexts/GlobalState';

function SumerianScene({ scene}) {
    Amplify.configure(Aws_exports);

    const [state, setState] = useContext(GlobalState);

    async function loadAndStartScene() {
        const progressCallback = (data) => {
            setState(state => ({ ...state, progress: Math.round(data*100)}))
        }

        const sceneOptions = {
            progressCallback
        }

        await AwsXR.loadScene(scene, "sumerian-scene-dom-id", sceneOptions);
        window.controller = AwsXR.getSceneController(scene);
        setState(state => ({ ...state, onLoading: false }))
        AwsXR.start("amda");
        AwsXR.enableAudio('amda');
    };

    useEffect(() => {
        async function performFunction() {
            await loadAndStartScene();
        }
        performFunction();
    }, []);

    return (
        <div>
            <div id='sumerian-scene-dom-id'
                style={{
                    width: "100%",
                    height: '100%',
                    position: "absolute",
                }} />
        </div>
    );
}

export default SumerianScene;
