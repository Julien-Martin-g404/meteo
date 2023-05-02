import React from 'react';
import '../Styles/App.css';
import Header from './Header.js';
import Weather from './Weather.js';


function App() {
  return (
    <div className="App">

      <Header />

      <div class="row">
        <div class="col s12 m6 push-m3">
          <Weather />

        </div>
      </div>


    </div >

  );
}

export default App;
