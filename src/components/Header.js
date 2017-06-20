import React from 'react';
import {SideNav, SideNavItem} from 'react-materialize';

const Header = (props) => {
	return (
			<nav>
				<div className="nav-wrapper">
					<a href="#!" className="brand-logo">Logo</a>
					<SideNav trigger={< div className = "button-collapse right" > <i className="material-icons">menu</i> < /div>} options={{
						closeOnClick: true,
						menuWidth: 400,
						edge: 'right'
					}}>
						<SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
						<SideNavItem href='#!second'>Second Link</SideNavItem>
						<SideNavItem divider/>
						<SideNavItem subheader>Subheader</SideNavItem>
						<SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
					</SideNav>
				</div>
			</nav>
	)
}

export default Header
