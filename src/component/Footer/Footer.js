import React from 'react';


const Footer = (props) => {

    return (
        <div>
            <div className="count">{props.lists.length} item left</div>
        </div>
    )
}


export default Footer