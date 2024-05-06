// import logo from './logo.svg';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store'
import { JobList } from './components/jobList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <JobList />
    </div>
  </Provider>
  );
}

export default App;
