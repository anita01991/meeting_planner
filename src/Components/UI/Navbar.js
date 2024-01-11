import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Navbar = () => {
    let [flag, setFlag] = useState(false)
    return (



        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            {/* <div className="container-fluid"> */}


            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link " to="/" >Dashboard</Link>
                    </li>
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
                        <Link className="nav-link " to="booking" > Booking</Link>
                    </li>

                    



                </ul>
                <div className="d-flex form-group">

                    {!flag && <button className=" btn btn-outline-success me-2" type="button"><Link to='Login'><FontAwesomeIcon icon={faUserPlus} />Login</Link></button>}


                    {flag && <button className='btn btn-outline-success me-2' type='button'>Log out</button>}




                </div>


            </div>

        </nav>




    );
};

export default Navbar;