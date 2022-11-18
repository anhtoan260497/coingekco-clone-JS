import React, { useState } from "react";
import "./styles.scss";
import PropTypes from 'prop-types'

ToggleButton.propTypes = {
    getIsCheckToggleButton : PropTypes.func
}

function ToggleButton({ getIsCheckToggleButton }) {
  const [isCheck, setIsCheck] = useState(false);
  const handleChangeToggle = () => {
    setIsCheck(!isCheck);
    getIsCheckToggleButton(!isCheck);
  };
  return (
    <label className="switch">
      <input onChange={handleChangeToggle} type="checkbox" checked={isCheck} />
      <span className="slider round"></span>
    </label>
  );
}

export default ToggleButton;



