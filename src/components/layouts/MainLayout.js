import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import {Link} from 'react-router';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons';

const isActive = (to, path) => {
    return to === path;
}

class mainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    render() {
        if (this.props.CommonStore.itemList != null) {
            return (
                <NavigationDrawer navItems={[
                    {
                        component: Link,
                        to: '/',
                        primaryText: 'Home',
                        active: isActive('/', this.props.router.location.pathname),
                        leftIcon: <FontIcon>view_list</FontIcon>
                    }, {
                        key: '/trade',
                        primaryText: 'Trade',
                        leftIcon: <FontIcon>trending_up</FontIcon>,
                        defaultOpen: true,
                        active: this.props.router.isActive("/trade"),
                        nestedItems: [
                            {
                                component: Link,
                                to: '/trade/thisweek',
                                primaryText: this.props.CommonStore.itemList[0].contract_name
                            }, {
                                component: Link,
                                to: '/trade/nextweek',
                                primaryText: this.props.CommonStore.itemList[1].contract_name
                            }, {
                                component: Link,
                                to: '/trade/quarter',
                                primaryText: this.props.CommonStore.itemList[2].contract_name
                            }
                        ]
                    }
                ]} drawerTitle="Quick Menu" contentClassName="" toolbarStyle={this.props.router.isActive("/trade")?{boxShadow:"none"}:{}} mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY} tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT} desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT} toolbarTitle="Nexybit" toolbarActions={isActive('/',this.props.router.location.pathname)?<div/>:<Button icon component={Link} to={"/"}>arrow_back</Button>}>
                    {this.props.children}
                </NavigationDrawer>
            );
        } else {
            return (<div/>);
        }
    }
}

const mapStateToProps = (state) => {
    return {CommonStore: state.CommonReducer};
};

export default connect(mapStateToProps)(mainLayout);
