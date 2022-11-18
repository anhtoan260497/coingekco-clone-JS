import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
Breadcrumbs.propTypes = {
    
};

function Breadcrumbs() {
    return (
        <div className='breadcrumbs'>
            <p>Cryptocurrencies</p>
            <FontAwesomeIcon icon={faCircleChevronRight} />
        </div>
    );
}

export default Breadcrumbs;