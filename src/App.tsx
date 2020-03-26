import React, { Suspense } from "react";
import {
  Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import history from './history';
import CommandBarMain from "./components/CommandBarMain"
import NavMenu from "./components/NavMenu";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
// import CharConvert from './CharConvert';
// const CharConvert = React.lazy(() => import('./CharConvert'))
// const PageFormat = React.lazy(() => import('./PageFormat'))
// import PageFormat from "./PageFormat";
export interface AppProps {
}

export interface AppState {
  isOpen: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      isOpen: false
    };
    this.openPanel = this.openPanel.bind(this);
    this.dismissPanel = this.dismissPanel.bind(this);
  };
  openPanel = () => this.setState({ isOpen: true });
  dismissPanel = () => this.setState({ isOpen: false });
  render() {
    // const { } = this.props;
    return (
      <Router history={ history }>
          <Panel
            isOpen={this.state.isOpen}
            onDismiss={this.dismissPanel}
            type={PanelType.smallFluid}
            // customWidth={PanelType.smallFluid}
            closeButtonAriaLabel="Close"
            headerText="Menu"
          >
            <NavMenu dismissPanel={this.dismissPanel.bind(this)}></NavMenu>
      </Panel>
        <div>
          <CommandBarMain view={this.openPanel.bind(this)}></CommandBarMain>
          <Suspense fallback="">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
