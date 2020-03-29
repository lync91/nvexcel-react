import React, { Component } from "react";
import { DefaultButton } from 'office-ui-fabric-react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface AppProps {
    text: string;
    onClick: () => void;
    isLoading: boolean
}

export class NvDefButton extends Component<AppProps> {
    // constructor(props: any) {
    //     super(props)
    // }
    render() {
        return( 
            <div><DefaultButton text={this.props.text} onClick={this.props.onClick} allowDisabledFocus>
                    <Spinner size={SpinnerSize.small} className={this.props.isLoading ? '' : 'hidden'} /> 
                    <Icon iconName="CompassNW" className="fade-in" />
                </DefaultButton>
            </div>
        );
    }
}