import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    const isPaintingListPage = location.pathname === '/paintings';

    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid d-flex justify-content-between">
                <ul className="navbar-nav flex-row gap-4">
                    {/* Only render Home link if not on painting list page */}
                    {!isPaintingListPage && (
                        <li className="nav-item">
                            <Link to="/paintings" className="nav-link">Home</Link>
                        </li>
                    )}
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link">Contact Us</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <div className="input-group">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                    </div>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;
