import { List, ListItemText, Collapse, ListItem, EqualizerIcon } from '../../../muiImports'
import Visualizing from './visualizing'

export default function VisualizationMenu(props) {

    return (
        <div>
            {props.listItemHeader("Visualization", "visualization", EqualizerIcon)}

            <Collapse in={props.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText primary="Visualizing" />
                        <Visualizing />
                    </ListItem>
                        {/* <PauseCircleFilledIcon />
                        <PlayCircleFilledIcon />
                        <MoreHorizIcon />
                        <RadioButtonUncheckedOutlinedIcon fontSize="large"/> */}
                    {/* <ListItem sx={{ pl: 4 }}>
                        <ListItemText primary="Design" />
                    </ListItem> */}
                </List>
            </Collapse>
        </div>
    );
}