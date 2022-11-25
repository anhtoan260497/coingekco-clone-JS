import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import './styles.scss'
import PropTypes from 'prop-types';

Breadcrumbs.propTypes = {
   name : PropTypes.string
};

function Breadcrumbs({name}) {
    return (
        <div className='breadcrumbs flex items-center gap-2'>
            <p className='text-[#8dc647] font-bold'>Cryptocurrencies</p>
            <FontAwesomeIcon className='text-[#8dc647] font-bold' icon={faChevronRight} />
            <p>{name}</p>
        </div>
    );
}

export default Breadcrumbs;