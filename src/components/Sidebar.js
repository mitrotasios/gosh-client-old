import React, {Component} from 'react';
import SidebarIcon from './SidebarIcon';
import SidebarContent from './SidebarContent';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        }
    }
    toggleSidebar = () => {
        this.setState(prevState => ({
          isOpen: !prevState.isOpen
        }))
    }
    
    render() {
        return(
            <div className="sidebar-container">
                <SidebarContent/>
                <div className="sidebar-icon">
                    <SidebarIcon
                    isOpen={this.state.isOpen}
                    handleClick={this.toggleSidebar}
                    />
                </div>
            </div>
        );        
    }          
}

export default Sidebar;