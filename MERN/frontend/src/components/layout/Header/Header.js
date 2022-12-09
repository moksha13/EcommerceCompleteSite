import React from "react";
import {ReactNavbar} from "overlay-navbar"
import moksha from '../../../images/moksha.webp'


const options={
  burgerColorHover : "#eb4034",
  logo:moksha,
  logoWidth:"20vmax",
  navColor1:"white",
  logoHoverSize:"10px",
  logoHoverColor:"#eb4034",
  link1Text:"Home",
  link2Text:"Product",
  link3Text:"Contact",
  link4Text:"About",
  link1Url:"/",
  link2Url:"/products",
  link3Url:"/contact",
  link4Url:"/about",
  link1Size:"1.3vmax",
  link1Color:"rgba(35, 35, 35, 0.8)",
  nav1justifyContent:"flex-end",
  nav2justifyContent:"flex-end",
  nav3justifyContent:"flex-start",
  nav4justifyContent:"flex-start",
  link1ColorHover:"#eb4034",
  link1Margin:"2.5vmax",
  profileIconColor:"rgb(35, 35, 35, 0.8)",
  searchIconColor:"rgb(35, 35, 35, 0.8)",
  cartIconColor:"rgb(35, 35, 35, 0.8)",
  profileIconColorHover:"#eb4034",
  searchIconColorHover:"#eb4034",
  cartIconColorHover:"#eb4034",
  link1AnimationTime:"1.5",
  //searchIcon="true"
  //cartIcon="true"
}
const Header = ()=> {
  return (
    <ReactNavbar
    {...options}  
    />

  );
}

export default Header;
