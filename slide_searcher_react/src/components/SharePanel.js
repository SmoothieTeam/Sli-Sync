import React from "react";
import './SharePanel.css';

function SharePanel({className}) {

    return (
        <div className={className}>
            <button>URL</button><button>Email</button>
            <hr></hr>
        </div>
    );
}

export default SharePanel;