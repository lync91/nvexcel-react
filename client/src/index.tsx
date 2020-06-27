import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { init, ws } from "./api/nvExcel";

initializeIcons();

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// const Office = window.Office;

Office.initialize = async () => {
  await init();
  ws?.regEvents();
  ReactDOM.render(<App />, document.getElementById('root'));
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
