import React from 'react'
import * as FaIcons from 'react-icons/fa';

const SidebarIcon = ({handleClick, isOpen}) => {
  return <span onClick={handleClick}>
    {isOpen ? <FaIcons.FaWindowClose /> : <FaIcons.FaBars/>}
  </span>
}
export default SidebarIcon