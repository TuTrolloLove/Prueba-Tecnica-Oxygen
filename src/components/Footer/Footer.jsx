import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className={'box-footer'}>
                <div className={'box-footer-tos'}>
                    <p> Terms of Service</p>
                </div>
                <div className={'box-footer-pp'}>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;