import React from 'react';

function Navbar({}) {
    return (
        <nav className="navbar fixed-top navbar-expand-lg justify-items-center primary-background-color">
            <div className="container-fluid text-white justify-content-center">
                <div><h3 className='text-center m-0'>Dashboard</h3></div>
            </div>
            <div class="collapse navbar-collapse text-white">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/">Logout</a>
                    </li>
                </ul>
            </div>

        </nav>
    )
}

export default Navbar;