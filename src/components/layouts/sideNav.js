import React from 'react';
import { Link } from 'react-router';
import FontIcon from 'react-md/lib/FontIcons';

const isActive = (to, path) => {
  return to === path;
}
export default[
    {
        component: Link,
        to : '/',
        primaryText : 'Home',
        active : isActive('/',pathname),
        leftIcon : <FontIcon>view_list</FontIcon>
    }, {
        key : '/trade',
        primaryText : 'Trade',
        leftIcon : <FontIcon>trending_up</FontIcon>,
		defaultOpen: true,
        active : isActive('/trade',pathname),
        nestedItems : [
            {
                component: Link,
                to: 'trade/thisweek',
                primaryText: 'aaaa'
            }, {
                component: Link,
                to: 'trade/nextweek',
                primaryText: 'bbbb'
            }, {
                component: Link,
                to: 'trade/quarter',
                primaryText: 'cccc'
            }
        ]
    }
];
