import React, {PureComponent} from 'react';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import sideNav from './sideNav';

const miniNav = {

}

class MainLayout extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			key: sideNav[0].key
		};
		this._setPage = this._setPage.bind(this);
		this._navItems = sideNav.map(item => {
			if (!item.divider && !item.nestedItems) {
				item.onClick = () => {this._setPage(item.key);console.log("click "+item.key);};
			}
			if(!item.divider && item.nestedItems){
				item.nestedItems.map(nestedItem => {
					if (!item.divider) {
						nestedItem.onClick = () => {this._setPage(nestedItem.key);console.log("nestedclick "+nestedItem.key+" "+item.key);};
					}
					return item;
				});
			}
			return item;
		});
	}

	_setPage(key) {
		this._navItems = this._navItems.map(item => {
			if (!item.divider) {
				item.active = item.key === key;
			}
			return item;
		});

		this.setState({key});
	}

	render() {
		const {visible, key} = this.state;
		return (
			<div>
				<NavigationDrawer navItems={this._navItems} drawerTitle="Quick Menu" contentClassName="" mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY} tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT} desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT} toolbarTitle="Nexybit">
					{this.props.children}
				</NavigationDrawer>
			</div>
		);
	}
}

export default MainLayout;
