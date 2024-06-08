import React from 'react';

import Desktop from './mode/Desktop';
import WhisperFrame from './mode/WhisperFrame';
import { useSelector} from 'react-redux';
import { RootState, DisplayStatus } from './react-redux&middleware/redux/typesImports';

import './App.css';

function App() {
  const display = useSelector((state: RootState) => {
    return state.DisplayReducer as DisplayStatus;
 }); 
  return (
    <div className="App" style = {{ color:  display.primaryColor, background: display.primaryColor}}>
      <header className="App-header" style = {{ color:  display.primaryColor, background: display.primaryColor, minWidth: "360px", height:"100vh", minHeight: "900px"}}>
        <Desktop/>
        <WhisperFrame />
      </header>
    </div>
  );
}

export default App;
