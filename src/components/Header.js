import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import SelectField from 'react-md/lib/SelectFields';
import Avatar from 'react-md/lib/Avatars';

import randomImage from './randomImage';
import LoremIpsum from './LoremIpsum';
import inboxListItems from './inboxListItems';
const avatarSrc = randomImage();

const drawerHeaderChildren = [
  <Avatar
    key={avatarSrc}
    src={avatarSrc}
    role="presentation"
    iconSized
    style={{ alignSelf: 'center', marginLeft: 16, marginRight: 16, flexShrink: 0 }}
  />,
  <SelectField
    id="account-switcher"
    defaultValue="Jonathan"
    menuItems={['Jonathan', 'Fred']}
    key="account-switcher"
    position={SelectField.Positions.BELOW}
    className="md-select-field--toolbar"
  />,
];

/**
 * OK.. This isn't really a _simple example_ because both the dialog and the navigation
 * drawer use the portal component.
 *
 * To get the Navigation Drawer rendered correctly, we can only display it once we have correctly
 * found the Dialog's container to render inside of. After it has been found, that render node is set
 * for the NavigationDrawer and finally rendered.
 *
 * Finally, we can't rely on the only focusOnMount of the dialog, so once the dialog has finished animating
 * and the Drawer has also been rendered, the menu button is focused.
 */
export default class SimpleExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { visible: false, dialog: null, key: inboxListItems[0].key };
    this._setPage = this._setPage.bind(this);
    this._navItems = inboxListItems.map(item => {
      if (!item.divider) {
        item.onClick = () => this._setPage(item.key);
      }
      return item;
    });
  }

  _setPage(key) {
	console.log(key);
    this._navItems = this._navItems.map(item => {
      if (!item.divider) {
        item.active = item.key === key;
      }
      return item;
    });

    this.setState({ key });
  }

  render() {
    const { visible, dialog, key } = this.state;
    return (
      <div>
		  <NavigationDrawer
            navItems={this._navItems}
			contentClassName=""
            drawerHeaderChildren={drawerHeaderChildren}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
            tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            toolbarTitle="Nexybit"
          >
            {this.props.children}
          </NavigationDrawer>
      </div>
    );
  }
}
