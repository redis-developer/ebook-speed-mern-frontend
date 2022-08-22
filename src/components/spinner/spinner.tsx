import './spinner.css';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

//#region types 
interface ISpinnerProps {
    show?: boolean
}
//#endregion


function Spinner(props: ISpinnerProps) {
    return (
        <div className={'spinner-container ' + (props.show ? 'active' : '')}>

            <div className='spinner-elm'>
                <div className="spinner-icon">
                    <FontAwesomeIcon icon={faSpinner} spin={true} />
                </div>
                <div className='spinner-label'>
                    Loading
                </div>
            </div>

        </div>
    );
}

export default Spinner;