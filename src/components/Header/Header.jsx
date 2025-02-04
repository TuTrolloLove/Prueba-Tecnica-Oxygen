import Icon from '../../assets/Icon.svg';
import React from 'react';
import './Header.css';
function Header() {
    return (
        <header>
            <div className={'box'}>
                <div className={'icon-header-box'}>
                    <img className={'icon-header'} src={Icon} alt="Icon"/>
                </div>
                <div className={'h1-box'}>
                    <h1>unit converter</h1>
                </div>
            </div>
            <div className="shadow-line"></div>
        </header>
    );
}

export default Header;