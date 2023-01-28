import React, { Component } from 'react';
import CardList from "./CardList"
import SearchBox from './SearchBox'
import Scroll from './Scroll'
// import { robots } from './Robots'
import './App.css';
import { robots } from './Robots';

class App extends Component {
    constructor() {
        super()
        this.state = {
            // robots: robots,
            robots: [],
            searchfield: ''            
        }
        // console.log('constructor');
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
            return response.json();
        })
        .then(users => {
            this.setState({ robots: users })
        })
        // this.setState({ robots: robots })
        // console.log('componentDidMount');
    }

    onSearchChange = (event) => {
        // console.log(event.target.value);
        this.setState({ searchfield: event.target.value });
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        // console.log('render');
        // console.log(filteredRobots);
        if (this.state.robots.length === 0) {
            return <h1>Loading...</h1>
        } else {
            return (
                <div className="tc">
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots} />
                </Scroll>
            </div>
            )
        }
    }
}

export default App