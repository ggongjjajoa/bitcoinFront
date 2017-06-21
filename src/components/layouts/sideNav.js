import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';

export default[
	{
		key : 'inbox',
		primaryText : 'Inbox',
		leftIcon : <FontIcon>view_list</FontIcon>,
		active : true,
	}, {
		key : 'starred',
		primaryText : 'Starred',
		leftIcon : <FontIcon>trending_up</FontIcon>,
        nestedItems : [
            {
                key: 'aaaa',
                primaryText: 'aaaa'
            }, {
                key: 'bbbb',
                primaryText: 'bbbb'
            }, {
                key: 'cccc',
                primaryText: 'cccc'
            }, {
                key: 'dddd',
                primaryText: 'dddd'
            }, {
                key: 'eeee',
                primaryText: 'eeee'
            }, {
                key: 'ffff',
                primaryText: 'ffff'
            }, {
                key: 'gggg',
                primaryText: 'gggg'
            }
        ]
	}, {
		key : 'send-mail',
		primaryText : 'Send mail',
		leftIcon : <FontIcon>send</FontIcon>
	}, {
		key : 'drafts',
		primaryText : 'Drafts',
		leftIcon : <FontIcon>drafts</FontIcon>
	}, {
		key : 'divider',
		divider : true
	}, {
		key : 'all-mail',
		primaryText : 'All mail',
		leftIcon : <FontIcon>mail</FontIcon>
	}, {
		key : 'trash',
		primaryText : 'Trash',
		leftIcon : <FontIcon>delete</FontIcon>
	}, {
		key : 'spam',
		primaryText : 'Spam',
		leftIcon : <FontIcon>info</FontIcon>
	}];
