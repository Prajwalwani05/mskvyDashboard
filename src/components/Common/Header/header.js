import React from 'react'
import profileLogo from '../../../images/profile.png';
import { GoListUnordered } from "react-icons/go";

const header = ({toogleSidebar}) => {
  
  return (
    <div className='Header'>
        <div className='msaplLogoDiv'>
          <GoListUnordered onClick={toogleSidebar}  style={{color:"var(headerSidebar)", fontSize:"20px", cursor:"pointer"}} />
        </div>
        <div className='profileLogoDiv' style={{display:"flex", alignItems:"center", gap:"10px"}}>
            <img style={{width:"40px"}} src= {profileLogo} alt='profileIcon'/>
        </div>
    </div>
  )
}

export default header;