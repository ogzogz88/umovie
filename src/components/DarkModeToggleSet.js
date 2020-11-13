import React from 'react';
import useDarkMode from 'use-dark-mode';

import Toggle from './Toggle';

const DarkModeToggleSet = () => {

    const darkMode = useDarkMode(false);

    return (
        <div className="darkmode-button">
            <Toggle checked={darkMode.value} onChange={darkMode.toggle} />

        </div>
    );
};

export default DarkModeToggleSet;