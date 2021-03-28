import React from "react"
import PropTypes from "prop-types"

import CssBaseline from '@material-ui/core/CssBaseline'

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, createStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import { Box } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#000000'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    }
  }),
);

//Colors
// #8B8BBF - Purple - News
// #EA7271 - Red - Caption
// #9FC3D1 - Blue - Story
// #CDC37C - Yellow - Comic
// #A5CF87 - Green - DeviantArt

function selectionBorderColor(cardType) {
  switch (cardType) {
    case 'news':
      return '#8B8BBF'
    case 'captions':
      return '#EA7271'
    case 'stories':
      return '#9FC3D1'
    case 'comics':
      return '#CDC37C'
    case 'deviantart':
      return '#A5CF87'
    case 'non-fiction':
      return '#FCC282'
    default:
      return 'white'
  }
}

const Layout = ({ children }) => {
  ReactGA.initialize('UA-173188205-1');
  if (typeof window !== `undefined`) {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function handleClick(menuItem) {
    if (menuItem === 'Old Site') {
      ReactGA.outboundLink(
        {
          label: menuItem
        },
        function () {
          console.log(menuItem)
        },
      )
    } else {
      ReactGA.event({
        category: 'Menu',
        action: 'Click',
        label: menuItem
      })
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Home', 'Captions', 'Comics', 'Stories', 'DeviantArt', 'Non-Fiction', 'News', 'World of TG Blog'].map((text, index) => (
          <Box border={1} style={{ color: selectionBorderColor(text.toLowerCase()), margin: 5 }} key={index}>
            {text === "World of TG Blog" ?
              <ListItem button key={text} component="a" href='/blog' onClick={()=>handleClick(text)} style={{ backgroundColor: theme.palette.primary.main }}>
                <ListItemText primary={text} style={{ color: 'white' }} />
              </ListItem> :
              <ListItem button key={text} component="a" href={index === 0 ? "/" : "/" + text.toLowerCase()}onClick={()=>handleClick(text)} style={{ backgroundColor: theme.palette.primary.main }}>
                <ListItemText primary={text} style={{ color: 'white' }} />
              </ListItem>
            }
          </Box>
        ))}
      </List>
      <Divider style={{ margin: 10 }} />
      <List>
        {['Old Site', 'Search', 'Promote', 'About', 'Contact'].map((text, index) => (
          <Box border={1} style={{ color: 'white', margin: 5 }} key={index}>
            {text === "Old Site" ?
              <ListItem button key={text} component="a" href={"http://old.worldoftg.com"} onClick={()=>handleClick(text)} style={{ backgroundColor: theme.palette.primary.main }}>
                <ListItemText primary={text} style={{ color: 'white' }} />
              </ListItem> :
              <ListItem button key={text} component="a" href={"/" + text.toLowerCase()} onClick={()=>handleClick(text)} style={{ backgroundColor: theme.palette.primary.main }}>
                <ListItemText primary={text} style={{ color: 'white' }} />
              </ListItem>
            }
          </Box>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              World of TG
          </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
