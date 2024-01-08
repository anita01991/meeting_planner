import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>


            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>
                                </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="roomcreation">Room</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " to="userpage" >Users</Link>
                            </li>
                            <li className="nav-item">
                                    <Link className="nav-link " to="package" >Package</Link>
                                </li>
                        </ul>

                    </div>
                </div>
            </nav>

        </div>


    );
};

export default Navbar;