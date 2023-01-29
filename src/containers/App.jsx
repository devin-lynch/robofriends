import React, { Component } from 'react';
import CardList from "../components/CardList"
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';
// import { robots } from './Robots'
import './App.css';
import { robots } from '../Robots';

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
        const { robots, searchfield } = this.state; // destructuring to avoid having to add 'this.state' when calling state
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        // console.log('render');
        // console.log(filteredRobots);
        if (robots.length === 0) { // could also do if(!robots.length) as it would return false
            return <h1>Loading...</h1>
        } else {
            return (
                <div className="tc">
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
            )
        }
    }
}

export default App