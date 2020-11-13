import React from "react";
import DarkModeToggle from "react-dark-mode-toggle";

const Toggle = ({ checked, onChange }) => {
    return (
        <DarkModeToggle

            onChange={onChange}
            checked={checked}
            size={50}
        />
    );
};

export default Toggle;
