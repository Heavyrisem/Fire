import React from "react";
import FPS from "./FPS";

import '../style/Setting.css';

interface Setting_P {
    MaxParticles: number
    setMaxParticles: React.Dispatch<React.SetStateAction<number>>
    Filter: string
    setFilter: React.Dispatch<React.SetStateAction<string>>
}
function Setting(props: Setting_P) {
    return (
        <div className="Setting">
            <div>
                <span>Particles</span> <input type="number" defaultValue={props.MaxParticles} onChange={(e) => props.setMaxParticles(parseInt(e.target.value))} />
            </div>
            <div>
                <span>Filter</span> 
                <select onChange={(e) => props.setFilter(e.target.value)}>
                    <option value="normal">normal</option>
                    <option value="color-dodge">color-dodge</option>
                    <option value="screen">screen</option>
                    <option value="exclusion">exclusion</option>
                </select>
            </div>
            <div style={{textAlign: 'left'}}>
                <span>FPS </span> <FPS />
            </div>
        </div>
    )
}

export default Setting;