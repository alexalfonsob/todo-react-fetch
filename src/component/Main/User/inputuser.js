import React from 'react';
import './user.css';


const Imputuser = (props) => {
    return (
        <form onSubmit={props.handleUser} >
            <input className="inputUser"  onChange={props.newUserChanged} placeholder="User"  value={props.newUser} autoComplete="off"  />
        </form>
    )
}

export default Imputuser;
