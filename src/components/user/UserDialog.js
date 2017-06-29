import React from 'react'

import Toolbar from 'react-md/lib/Toolbars';

import Button from 'react-md/lib/Buttons/Button';

import TextField from 'react-md/lib/TextFields';

import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';

import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import Login from './Login';
import SignUp from './SignUp';
import Forget from './Forget';

class UserDialog extends React.Component {
    render() {
        const actions = <Button icon onClick= {() => {this.props.closeDialog()}}>close</Button>;
        return (
            <div>
                <Toolbar colored title="User"  fixed actions={actions}/>
                <TabsContainer activeTabIndex={0} className="md-toolbar-relative" panelClassName="md-grid">
                    <Tabs tabId="tab">
                        <Tab label="Login" style={{
                            color: "#000000"
                        }}>
                            <Login/>
                        </Tab>
                        <Tab label="Signup" style={{
                            color: "#000000"
                        }}>
                            <SignUp/>
                        </Tab>
                        <Tab label="Forget" style={{
                            color: "#000000"
                        }}>
                         <Forget/>
                        </Tab>
                    </Tabs>
                </TabsContainer>
            </div>
        );
    }
}

export default UserDialog;
