import React from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

const Navigation = props => {
    return (
        <div>
            <Navbar color="primary" dark expand="md">
                <NavbarBrand><Link className="link nav-link" to="/">Musicly </Link></NavbarBrand>
                <NavbarToggler onClick={props.toggle} />
                <Collapse isOpen={props.open} navbar>
                    <Nav className="ml-auto" navbar>
                        {props.user && (
                            <span className="navChild">
                                <NavItem>
                                    <Link className="link nav-link" to="/profile">
                                        Profile </Link>
                                </NavItem>
                               
                                <NavItem>
                                    <Link className="link nav-link" to="/discover">
                                        Discover  </Link>
                                </NavItem>
                            </span>
                        )}
                        {props.user ? (
                            <NavItem>
                                <Link className="link nav-link" to="/auth/logout"> Logout </Link>
                            </NavItem>) : (
                                <span className="navChild">
                                    <NavItem>
                                        <Link className="link nav-link" to="/auth/sign-in">Sign in </Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="link nav-link" to="/auth/sign-up">Sign Up </Link>
                                    </NavItem>
                                </span>)
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}


// const Navigation = props => {
//   return (
//     <div className="navigation">
//       <div className="container nav-content">
//         <div>
//           <Link className="link nav-link" to="/">
//             Home
//           </Link>
//           {props.user && (
//             <span>
//               &nbsp; &nbsp; &nbsp;
//               <Link className="link nav-link" to="/profile">
//                 Profile
//               </Link>
//               <Link className="link nav-link" to="/discover">
//                 Discover
//               </Link>
//             </span>
//           )}
//         </div>
//         <div>
//           {props.user ? (
//             <Link className="link nav-link" to="/auth/logout">
//               Logout
//             </Link>
//           ) : (
//             <span>
//               <Link className="link nav-link" to="/auth/sign-in">
//                 Sign in
//               </Link>
//               &nbsp; &nbsp; &nbsp;
//               <Link className="link nav-link" to="/auth/sign-up">
//                 Sign up
//               </Link>
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

export default Navigation;
