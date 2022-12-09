import React from 'react';
import playstore from "../../../images/playStore.png"
import appstore from "../../../images/appstore.png"
import './Footer.css'

const Footer = () =>{
    return(
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playstore} alt="playstore" />
                <img src={appstore} alt="Appstore" />
            </div>
            <div className="midFooter">
                <h1>ECOMMERCE.</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2022 &copy; Moksha</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href='https://instagram.com/moksha_veula'>Instagram</a>
                <a href='https://instagram.com/moksha_veula'>Youtube</a>
                <a href='https://instagram.com/moksha_veula'>Facebook</a>
            </div>
        </footer>
    )
}

export default Footer