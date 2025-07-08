import React from 'react';
import { redirect } from 'next/navigation';

function Navbar({}) {

    const handleLogout = () => {
        redirect('/');
    }

    return (
        <nav className="navbar fixed-top navbar-expand-lg justify-items-center primary-background-color">
            <div className="container-fluid text-white justify-content-center">
                <div><h3 className='text-center m-0'>Dashboard</h3></div>
            </div>
            <div className="collapse navbar-collapse text-white">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button type='button' className='btn btn-link text-white' style={{textDecoration: "none"}}
                        onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;