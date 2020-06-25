import React, { Component } from "react";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import NavMenu from "./NavMenu";
import { AppContext } from "../contexts/AppContext";

export interface AppProps {
}

export interface AppStates {
    dismissPanel: () => void
}

export default class MenuPanel extends Component<AppProps, AppStates> {
    render() {
        return (
            <AppContext.Consumer>
                {context => (
                    <Panel
                        isOpen={context.isOpen}
                        onDismiss={context.dismissPanel}
                        type={PanelType.smallFluid}
                        closeButtonAriaLabel="Close"
                        headerText="Menu"
                        >
                        <NavMenu/>
                    </Panel>
                )}
            </AppContext.Consumer>
        )
    }
}