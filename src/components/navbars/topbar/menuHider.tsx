import React from 'react'
import {  useDispatch } from 'react-redux'
import { IconButton, LockIcon, LockOpenIcon } from '../../../muiImports'
export default function MenuHider(props){
    const dispatch = useDispatch();

    return (
        <div>
            <IconButton className = "c2" color = "inherit" onClick = {()=>dispatch({type: 'HIDE_MENU'})}>
                {props.menuVisible ? <LockIcon fontSize="large"/> : <LockOpenIcon fontSize="large"/>}
            </IconButton>
        </div>
    )
}
