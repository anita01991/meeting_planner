import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <div>

            
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Meeting Room</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="" to="client">Client</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="roomcreation">Room</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " to="userpage" >Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="package" >Package</Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link " to="clientpackage" > Client Package</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " to="dashboard" >Dashboard</Link>
                            </li>

                            {/* <li className="nav-item">
                                <Link className="nav-link " to="package" >Package</Link>
                            </li> */}
                        </ul>

                    </div>
                </div>
            </nav>

        </div>


    );
};

export default Navbar;