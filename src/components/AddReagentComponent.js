import React, { Component } from 'react';

class AddReagent extends Component {
    constructor(props) {
      super(props);
      this.state = {/* Awesome State Not Yet Used */}
    }
    
    render() {
      return (
        <div className={`sidebar-menu${this.props.isSidebarOpen === true ? ' open' : ''}`}>
          <button type="button" className="button small float-right" onClick={this.props.onSidebarToggle}>Toggle Menu</button>
          <ul className="vertical menu">
            <li><a>Menu Item</a></li>
            <li><a>Menu Item</a></li>
            <li><a>Menu Item</a></li>
            <li><a>Menu Item</a></li>
            <li><a>Menu Item</a></li>
          </ul>
        </div>
      );
    }
}

export default AddReagent;