import React from 'react';
import { slide as Menu } from 'react-burger-menu';

function Sidebar(props) {
  return (
    <Menu>
      <a className="menu-item" href="/invenotry">
        Inventory
      </a>
      <a className="menu-item" href="/testhistory">
        Test History
      </a>
      <a className="menu-item" href="/assays">
        Assays
      </a>
      <a className="menu-item" href="/account">
        Account
      </a>
    </Menu>
  );
};

export default Sidebar;