import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import {Link} from 'react-router' 
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom' 
import { Link } from "react-router-dom";
import { NavItems } from "./NavItems";
 




function Header() {

   const  authStatus = useSelector((state)=>state.auth.status)
  
   const NavItems = [
   {
    id: 1,
    name: "Home",
    path: "/",
    active:true
    },
   {
    id: 2,
    name: "About",
    path: "/about",
    active: !activeStatus,
    },
    {
     id: 3,
     name: "Services",
     path: "/services",
     active: !activeStatus,
    },
     {
      id: 4,
      name: "Contact",
      path: "/contact",
      active: !activeStatus,
     },
      ];


    return (
    <header className="p" >
     <Container >
      <div>
       <nav>
         <div>
            <Link>

          <Logo />

           </Link>     
         </div>
     
           <ul>
          {NavItems.map((item) => (
            item.active ? (
         <li key={item.id}>
           <Link to={item.path}>
            {item.title}
             </Link>
            </li>
            ):null
           ))
          }

          { authStatus && LogoutBtn }

</ul>
           </nav>
          </div>
     



     </Container> 
    </header>
  )

}


export default Header
