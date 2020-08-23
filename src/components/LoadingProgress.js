import React from 'react';
import '../App.css';

function LoadingProgress(progress) {
    return (
        <div className="start_screen">
            <h1>{progress}</h1>
        </div>
    )
}

export default LoadingProgress;