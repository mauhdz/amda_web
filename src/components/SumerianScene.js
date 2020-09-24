
import React, { useEffect, useContext } from 'react';
import { XR as AwsXR } from 'aws-amplify';
import Amplify from 'aws-amplify';
import Aws_exports from '../aws-exports';
import GlobalState from '../contexts/GlobalState';

function SumerianScene({scene}) {
    Amplify.configure(Aws_exports);

    const [state, setState] = useContext(GlobalState);

    async function load_and_start_scene() {
        const progressCallback = (data) => {
            setState(state => ({ ...state, progress: Math.round(data*100)}))
        }

        const sceneOptions = {
            progressCallback
        }

        await AwsXR.loadScene(scene, "sumerian-scene-dom-id", sceneOptions);
        window.controller = AwsXR.getSceneController(scene);
        setState(state => ({ ...state, onLoading: false }))
        AwsXR.start(scene);
    };

    function enableScene(){
        //This function should change the style for the scn to be shown
        AwsXR.enableAudio(scene);
    }

    //OnMount
    useEffect(() => {
        async function performFunction() {
            await load_and_start_scene();
        }
        performFunction();
    }, []);

    useEffect(()=>{
        if(!state.onLoading){
            enableScene()
        }
    }
    ,[state.onStart]);

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
