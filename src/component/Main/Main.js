import React, { Component } from "react";
import Nav from './User/nav';
import Imputuser from './User/inputuser';
import Imput from './ImputBar/ImputBar';
import ListItems from './ListItems/ListItems';
import Footer from '../Footer/Footer';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            userNoRegister: false,
            inpuList: '',
            listsServer: [{"label": "sample task", done: false}],
            lists: [],
            newUser: '',
            User: 'demo',
            isExpand: false
        }
    }

    inpuListChanged = (e) => {
        this.setState({
            inpuList: e.target.value
        });
    }

    handleList = async (e) => {
        e.preventDefault();
        let id = this.state.User;
        if (this.state.inpuList !== '') {
            await this.updateList();
            await this.updateData(id);
        }
    }

    updateList() {
        this.setState({
            lists: [...this.state.lists, {
                "label": this.state.inpuList,
                "done": false
            }],
            inpuList: ''
        });
    }

    deletList = i => {

        this.setState(state => {
            const lists = state.lists.filter((item, j) => i !== j);
            return {
                lists
            };
        });
    };

    deletLi = async (i) => {
        let id = this.state.User;
            await this.deletList(i);
            this.updateData(id);
    }

    handleToggle = (e) => {
        e.preventDefault();
        this.setState({
            isExpand: !this.state.isExpand
        })
    }

    newUserChanged = (e) => {
        this.setState({
            newUser: e.target.value.toLowerCase().replace(/ /g, "")
        });
    }

    handleUser = (e) => {
        e.preventDefault();
        if (this.state.newUser !== '') {
            this.userExist(this.state.newUser);
        }
    }
    

    refreshData(id) {
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${id}`)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isExpand: false,
                User: this.state.newUser,
                newUser: '',
                lists: json.slice(1)
            })



        })
        .catch(error => {
            console.log(error);
        });
    }

    userExist(id) {

        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${id}`, {
            method: "GET"
        })
        .then(resp => {
            if (resp.ok) {
                this.refreshData(id);
            }
            else {
                this.createUser(this.state.newUser);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    

    createUser = async (usr) => {
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${usr}`, {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            if (resp.ok) {
                this.refreshData(usr);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    deleteUser = () => {

        let id = this.state.User;

        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${id}`, {
            method: "DELETE",
        })
        .then(resp => {
            if (resp.ok) {
                this.setState({
                    newUser: '',
                    isExpand: false,
                    User: 'demo',
                    lists: []
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    

    updateData(usr) {
        
         let newArray = this.state.listsServer.concat(this.state.lists);

        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${usr}`, {
            method: "PUT",
            body: JSON.stringify(newArray),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {

        const { isExpand } = this.state;

        return (
            <div>
                <div className="user">
                    <Nav   
                        handleToggle = {this.handleToggle}
                        User = {this.state.User}
                        deleteUser = {this.deleteUser}
                    />
                </div>
                <div className={`panel  ${isExpand  ? 'panelExtend' : 'panel'}`}>
                    <div className="center">
                        <Imputuser 
                            newUser={this.state.newUser}
                            handleUser = {this.handleUser}
                            newUserChanged={this.newUserChanged}
                        />
                    </div>
                </div>
                <div>
                    <Imput 
                        inpuList={this.state.inpuList}
                        handleList = {this.handleList}
                        inpuListChanged={this.inpuListChanged}
                    />
                </div>
                <div>
                    <ListItems   
                        lists={this.state.lists} 
                        deletLi= {this.deletLi}    
                    />
                </div>
                <div className="count">
        	        <Footer 
            	         lists={this.state.lists} 
        	        />
            	</div>
            </div>
        );
    }
}

export default Main
