import React from 'react'
import { Tab, Tabs, withStyles } from "@material-ui/core";

// TABS
const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 60,
      width: '100%',
      backgroundColor: 'hsl(190,80%,60%)',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

  
// TAB
const StyledTab = withStyles((theme) => ({
root: {
  textTransform: 'none',
  color: '#fff',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  boxShadow:'none',
  '&:focus': {
    opacity: 1,
  },
},
}))((props) => <Tab disableRipple {...props} />);


export {StyledTabs, StyledTab}