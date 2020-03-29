import React, {Component, Suspense} from 'react';
import {
  Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import history from './history';
import './App.css';
import CommandBarMain from "./components/CommandBarMain";
import MenuPanel from "./components/MenuPanel";
import { AppContext } from "./contexts/AppContext";
// import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
const CharConvert = React.lazy(() => import('./components/CharConvert'));
const PageFormat = React.lazy(() => import('./components/PageFormat'));
const PageFormatG8 = React.lazy(() => import('./components/PageFormatG8'));

export interface AppState {
  isOpen: boolean;
  selectedKey: string;
  dismissPanel: (item: any) => void
}

class App extends Component<{}, AppState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      isOpen: false,
      selectedKey: history.location.toString(),
      dismissPanel: (item: any) => {
        history.push(item.key)
        this.setState({selectedKey: item.key})
        this.setState({isOpen: false})
      }
    };
  };
  openPanel () { this.setState({ isOpen: true })};
  dismissPanel () {this.setState({ isOpen: false })}
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <CommandBarMain view={this.openPanel.bind(this)}></CommandBarMain>
          <MenuPanel/>
          <Router history={history}>
            <Suspense fallback="Đang tải">
                <section className="App-body">
                  <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/charConvert" component={CharConvert} />
                    <Route path="/PageFormat" component={PageFormat} />
                    <Route path="/PageFormatG8" component={PageFormatG8} />
                  </Switch>
                </section>
              </Suspense>
          </Router>
        </div>
      </AppContext.Provider>
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
// function SpinnerLoadinng() {
//   return (
//     <Spinner size={SpinnerSize.small} />
//   )
// }

export default App;
