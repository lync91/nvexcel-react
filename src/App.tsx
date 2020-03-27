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
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
// import charConverter from "./reducers/charConverter";
// import CharConvert from './CharConvert';
const CharConvert = React.lazy(() => import('./components/CharConvert'));
const PageFormat = React.lazy(() => import('./components/PageFormat'));
const PageFormatG8 = React.lazy(() => import('./components/PageFormatG8'));
// import PageFormat from "./PageFormat";
export interface AppProps {
}

export interface AppState {
  isOpen: boolean;
  selectedKey: string;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      isOpen: false,
      selectedKey: '/home'
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
            <NavMenu dismissPanel={this.dismissPanel} selectedKey={this.state.selectedKey} ></NavMenu>
      </Panel>
        <div>
          <CommandBarMain view={this.openPanel.bind(this)}></CommandBarMain>
          <Suspense fallback={sSpinner}>
            <section className="App-body">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/charConvert" component={CharConvert} />
                <Route path="/pageFormat" component={PageFormat} />
                <Route path="/pageFormatG8" component={PageFormatG8} />
              </Switch>
            </section>
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

function sSpinner() {
  return (
    <div>
        <Label>Spinner with label positioned to left</Label>
        <Spinner label="Đang tải..." ariaLive="assertive" labelPosition="left" />
      </div>
  );
}
