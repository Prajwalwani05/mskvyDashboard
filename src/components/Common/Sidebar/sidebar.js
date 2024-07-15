import React, { useEffect, useState } from 'react'
import msapl from '../../../images/Msapl_loho_new.jpg';
import axios from "axios";
import {NavLink} from 'react-router-dom';
import { GoHome, GoChecklist,GoCodeReview, GoTasklist, GoPerson } from "react-icons/go";
import { HiChevronDown} from "react-icons/hi2";

const SideBar = ({isOpen}) => {
  const [menuData, setMenuData] = useState([]);
  const [activeLink, setActiveLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Add event listener to track changes in the location
    const handleActiveLink = () => {
      setActiveLink(window.location.pathname);
    };

    // Initial check for active link
    handleActiveLink();

    // Listen for changes in the location
    window.addEventListener('popstate', handleActiveLink);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleActiveLink);
    };
  }, []);


    useEffect(() => {
      setLoading(true);
         axios.get(`/api/Login/Menu?userId=1`)
        .then((response) => {
          // Check if response status is 200
          if (response.status === 200) {
            // Data is now available here
            console.log("Menu_DATA>>>", response.data);
            setMenuData(response.data);
            setLoading(false);
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=>{
          setLoading(false);
        })
      
    }, [])

    const handleExpandMenu = (e, index) => {
      e.stopPropagation();
      setOpenSubmenus((prevState) => {
      const newState = { ...prevState };

    // Close all other submenus
    Object.keys(newState).forEach((key) => {
      if (key !== index.toString()) {
        newState[key] = false;
      }
    });

    // Toggle the state for the clicked submenu
      newState[index] = !newState[index];

      return newState;
     });
    };
    const iconMap = {
      "icon fa-solid fa-house": <GoHome className='sidebarIcon' style={{color:"white", fontSize:"16px"}}/>,
      "icon fa-solid fa-file-contract": <GoChecklist className='sidebarIcon' style={{color:"white", fontSize:"16px"}}/>,
      " ": <GoChecklist className='sidebarIcon' style={{color:"white", fontSize:"16px"}}/>,
      "icon fa-solid fa-layer-group": <GoCodeReview className='sidebarIcon' style={{color:"white", fontSize:"16px"}}/>,


    };
  
  return (
    <div className={isOpen ? 'SideBarOpen' : 'SideBar'}>
        <div className='img'>
        <img style={{width:"180px"}} src={msapl} alt='msaplLogo'/>
        </div>

        <div className='sidebar-body'>
          {
            <>
            {
              isOpen ? 
              <div>
                <div className='isOpenDiv'>
              <GoHome className='sidebarIcon' style={{ color: "white", fontSize: "16px" }} />
              <GoChecklist className='sidebarIcon' style={{ color: "white", fontSize: "16px" }} />
              <GoTasklist className='sidebarIcon' style={{ color: "white", fontSize: "16px" }} />
              <GoChecklist className='sidebarIcon' style={{ color: "white", fontSize: "16px" }} />
              <GoChecklist className='sidebarIcon' style={{ color: "white", fontSize: "16px" }} />
              <GoChecklist className='sidebarIcon' style={{ color: "white", fontSize: "16px" }} />
              <GoCodeReview className='sidebarIcon' style={{ color: "white", fontSize: "16px" }} />
            </div>
              </div>
              :
              <div className='mainMenu' >
                {
                  menuData && menuData.MenuItems && menuData.MenuItems.length > 0 ? menuData.MenuItems.map((element , index)=>(
                     <li key={index} onClick={(e)=> handleExpandMenu(e, index)} >
                       {
                         element.SubMenu.length > 0 ?
                         <>
                         <div style={{width:"100%"}}>
                          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
                           <div style={{display:"flex", alignItems:"5px", gap:"8px", width:"100%"}}>
                             {/* <GoHome className='sidebarIcon' style={{color:"white", fontSize:"16px"}}/> */}
                             {iconMap[element.Icon]} 
                             <h5  className='links' to='/SPVDashboard' >{element.Title}</h5>
       
                           </div>
                           <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                             <HiChevronDown className="sidebarIcon2" style={{ color: "white", fontSize: "16px", marginLeft: "15px" }} />      
                           </div>
                          </div>
                             {openSubmenus[index] &&(
                                 <ul>
                                   {
                                     element.SubMenu.map((ele, index) => (
                                       <li style={{padding:"10px 25px 0"}} key={index}>
                                         <NavLink style={{fontSize:"12px", fontWeight:"300"}} className='links' to='/'>{ele.Title}</NavLink>
                                       </li>
                                     ))
                                   }
                                 </ul>
                             )}
                         </div>
                         </> 
                         :
                         <>
                         <div style={{display:"flex", alignItems:"5px", gap:"5px"}}> 
                         <GoTasklist className='sidebarIcon' style={{color:"white", fontSize:"16px"}}/>
                         <NavLink className='links' to='/home' >{element.Title}</NavLink>  
                         </div>
                         </>
                       }
                     </li>
                  ))
                   :
                   <div>No Menu</div>
                }
              </div>
              }
            </>
          }
       </div>
    </div>
  )
}

export default SideBar;