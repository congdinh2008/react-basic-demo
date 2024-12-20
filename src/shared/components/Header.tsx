import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="flex justify-between items-center px-4 bg-blue-500 text-white">
            <Link to="/" className="brand block text-2xl font-bold">Hotel App</Link>
            <nav>
                <ul className="nav-menu flex justify-center">
                    <li className="nav-item">
                        <Link to="/" className="nav-link block p-4 hover:bg-blue-700">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/manager/dashboard" className="nav-link block p-4 hover:bg-blue-700">Admin Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link block p-4 hover:bg-blue-700">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link block p-4 hover:bg-blue-700">Contact</Link>
                    </li>
                </ul>
            </nav>
            <div className="profile-menu">
                <ul className="nav-menu flex justify-center">
                    <li className="nav-item">
                        <Link to="/" className="nav-link block p-4 hover:bg-blue-700">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link block p-4 hover:bg-blue-700">Register</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;