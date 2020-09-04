import React from 'react';
import '../App.css';

function LoadingProgress({progress}) {
    console.log("progress on component", progress)
    return (
        <div className="start_screen">
            <h1>Loading: {progress}%</h1>
        </div>
    )
}

export default LoadingProgress;