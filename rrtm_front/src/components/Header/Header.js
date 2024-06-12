import React from "react";
import './Header.css';
import UserProfile from './UserProfile';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate('/'); // Reindirizza alla homepage
    };

    return (
        <div className='header'>
            <h1 className='title' onClick={handleTitleClick}>RRTM</h1>
            <UserProfile/>
        </div>
    );
}

export default Header;
