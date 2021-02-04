import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Redax/state';

// ReactDOM.render(
//   <React.StrictMode>
//     <App appState={state} addPost={addPost} />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

let renderEntireTree = (store) => {
  ReactDOM.render(
    <React.StrictMode>
      <App appStore={store} />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

renderEntireTree(store);
store.subscribe(renderEntireTree);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
