import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';

export default[
    {
        key : 'home',
        primaryText : 'Home',
        leftIcon : <FontIcon>view_list</FontIcon>,
        active : true
    }, {
        key : 'trade',
        primaryText : 'Trade',
        leftIcon : <FontIcon>trending_up</FontIcon>,
		defaultOpen: true,
        nestedItems : [
            {
                key: 'btc_thisweek',
                primaryText: 'aaaa'
            }, {
                key: 'btc_nextweek',
                primaryText: 'bbbb'
            }, {
                key: 'btc_quarter',
                primaryText: 'cccc'
            }
        ]
    }, {
        key : 'divider',
        divider : true
    }, {
        key : 'account',
        primaryText : 'Account',
        leftIcon : <FontIcon>mail</FontIcon>
    }, {
        key : 'affiliate',
        primaryText : 'Affiliate',
        leftIcon : <FontIcon>info</FontIcon>
    }, {
        key : 'support',
        primaryText : 'Support',
        leftIcon : <FontIcon>delete</FontIcon>
    }
];
