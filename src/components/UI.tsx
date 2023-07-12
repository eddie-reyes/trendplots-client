import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDownLeftRight, faComputerMouse } from '@fortawesome/free-solid-svg-icons';

const UI = () => {
    return (
        <div className="controls">
            <h2>Controls:</h2>
            <h2>
                <FontAwesomeIcon icon={faArrowsUpDownLeftRight} fixedWidth={true}></FontAwesomeIcon>
                &nbsp;Pan
            </h2>
            <h2>
                <FontAwesomeIcon icon={faComputerMouse} fixedWidth={true}></FontAwesomeIcon>
                &nbsp;Zoom
            </h2>
        </div>
    );
};

export default UI;
