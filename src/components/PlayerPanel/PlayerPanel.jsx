import './PlayerPanel.css';
import React from 'react';
import Left from './assets/left.png';
import Right from './assets/right.png';
import Play from './assets/play.png';
import Pause from './assets/pause.png';
import Stop from './assets/stop.png';
import Love from './assets/love.png';
import Unlove from './assets/like.png';


const PlayerPanel = () => {
    const bandera = false;
    return (
        <div className="panel-button">
            <img src={Left} alt="Left" className="button-image" />
            { bandera ? <img src={Play} alt="Play" className="button-image" /> : <img src={Pause} alt="Pause" className="button-image" />}
            <img src={Stop} alt="Stop" className="button-image" />
            <img src={Right} alt="Right" className="button-image" />
            { bandera ? <img src={Love} alt="Love" className="button-image" /> : <img src={Unlove} alt="Unlove" className="button-image" />}
        </div>
    );
};

export default PlayerPanel;