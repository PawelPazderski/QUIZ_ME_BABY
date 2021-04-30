import React, {Component} from 'react'

import {NavLink} from 'react-router-dom'

const MENU_URL = "http://localhost:3001/menu";

class Nav extends Component {
    state = {
        menuItems: []
    } 

    componentDidMount() {
        fetch(MENU_URL)
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            throw new Error("Błąd")
        } )
        .then(menuItems => this.setState( {menuItems} ))
        .catch(err => console.log(err))
    }

    render() {

        const { menuItems } = this.state;
        return (
            <>
            <div className="menu-container">
            <ul className="menu">
                {menuItems.map(item => (
                <li key={item.id}>
                    <NavLink exact to={item.link} activeClassName="active" className="menuLink">{item.name}</NavLink>
                </li>
                )
                )}
            </ul>
            </div>
           
            
            </>
        )
    }
}


export default Nav