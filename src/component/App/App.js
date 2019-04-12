import React from "react";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';

class App extends React.Component {
    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        return (
            <div>
            	<div className = "title">
            	    <Header />
            	</div>
                <div className="containerr" >
            		<Main />
                </div>
    	    </div>
        );
    }
}

export default App
