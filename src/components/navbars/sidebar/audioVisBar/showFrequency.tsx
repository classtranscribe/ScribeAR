import React, { } from 'react'
import { RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { ControlStatus } from '../../../../react-redux&middleware/redux/typesImports';
import Theme from '../../../theme'
import {  ThemeProvider, Switch } from '../../../../muiImports'


   export default function ShowFrequency() {
      const dispatch = useDispatch()
      let controlStatus = useSelector((state: RootState) => {
         return state.ControlReducer as ControlStatus;
      });

      const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
         dispatch({type: 'FLIP_SHOWFREQ'});
         // if (controlStatus.showTimeData) {dispatch({type: 'FLIP_SHOWTIMEDATA'})};
      }

      const {myTheme} = Theme();

      return (
         <div>
            <ThemeProvider theme={myTheme}>
               {controlStatus.showFrequency === true ? <Switch onClick={toggleDrawer} checked={true} /> : <Switch onClick={toggleDrawer} checked={false}/>}
            </ThemeProvider>
         </div>
      );
   }
