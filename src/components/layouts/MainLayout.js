import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import FontIcon from 'react-md/lib/FontIcons';

import Button from 'react-md/lib/Buttons';

import Dialog from 'react-md/lib/Dialogs';

import UserDialog from '../user/UserDialog';

const isActive = (to, path) => {
    return to === path;
}

class mainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            pageX: null,
            pageY: null
        };
    }

    openDialog(e) {
        let {pageX, pageY} = e;
        if (e.changedTouches) {
            const [touch] = e.changedTouches;
            pageX = touch.pageX;
            pageY = touch.pageY;
        }
        this.setState({visible: true, pageX, pageY});
    }

    closeDialog() {
        this.setState({visible: false});
    }

    render() {
        if (this.props.CommonStore.itemList != null) {
            const actions = [];
            actions.push(
                <Button icon onClick={(e) => {
                    this.openDialog(e)
                }}>person_outline</Button>
            )
            if (!isActive('/', this.props.router.location.pathname)) {
                actions.push(
                    <Button icon component={Link} to={"/"}>arrow_back</Button>
                );
            }
            return (
                <div>
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
                    ]} drawerTitle="Quick Menu" contentClassName="" toolbarStyle={this.props.router.isActive("/trade")
                        ? {
                            boxShadow: "none"
                        }
                        : {}} mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY} tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT} desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT} toolbarTitle="Nexybit" toolbarActions={actions}>
                        {this.props.children}
                    </NavigationDrawer>
                    <Dialog id="User" focusOnMount={false} onHide={() => {
                        this.closeDialog()
                    }} {...this.state} fullPage aria-label="User">
                        <UserDialog closeDialog={this.closeDialog.bind(this)}/>
                    </Dialog>
                </div>
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
