import React from 'react';
import './user.css';


const Nav = (props) => {
    return (
        <div className="user">
            <div>
                <strong className="change" onClick={props.handleToggle}>Change User</strong>
            </div>
            <div>
                <p className="parrafo">user: <strong>{props.User}</strong></p> 
            </div>
            <div>
                <strong className="alert" onClick={props.deleteUser}>Delete User</strong>
            </div>
 
        </div>
    )
}

export default Nav;
