import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { withStyles, AppBar, Toolbar, IconButton, Typography, Button, Drawer, CssBaseline } from '@material-ui/core'
import { Divider, ListItem, ListItemIcon, ListItemText, List, } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { Menu, Photo, Work, Search, ChevronLeft, ChevronRight, VpnKey, PlaylistAdd, Brush } from '@material-ui/icons'

const drawerWidth = 200

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  username: {
    flexGrow: 1
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

const MyAppBar = styled(AppBar)({
  // background: 'linear-gradient(20deg, #3949ab 30%, #039be5 80%)',
  background: 'linear-gradient(to bottom, #3949ab 0%, ' +
    '#039be5 70%, rgba(0,0,0,0) 100%)',
  // borderRadius: 5,
  // boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
})

class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLogoutClick = () => {
    this.handleDrawerClose()
    this.props.handleLogoutClick()
  }

  render() {
    const { classes, theme, showFindUser, currUser } = this.props
    return (
      <Fragment>
        <CssBaseline />
        <MyAppBar 
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton 
              className={classes.menuButton} 
              color="inherit" 
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <Menu />
            </IconButton>
            <Typography variant="h5" color="inherit" className={classes.grow}>
              Wallie <Brush />
            </Typography>
            {currUser === null ? 
              null
              :
              <Fragment>
                <Typography variant="h5" color="inherit" className={classes.username}>
                  Welcome, {currUser.name}!
                </Typography>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                  <Button onClick={this.handleLogoutClick} color="inherit">Log Out</Button>
                </Link>
              </Fragment>
            }
          </Toolbar>
        </MyAppBar>
        <Drawer
          variant={currUser ? "permanent" : "persistent"}
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>
          <Divider />
          {currUser === null ?
            <List>
              <Link to='/login'>
                <ListItem button key={'Login'} onClick={this.handleDrawerClose}>
                  <ListItemIcon><VpnKey /></ListItemIcon>
                  <ListItemText primary={'Login'}/>
                </ListItem>
              </Link> 
              <ListItem button key={'Signup'} onClick={this.handleDrawerClose}>
                <ListItemIcon><PlaylistAdd /></ListItemIcon>
                <ListItemText primary={'Signup'} />
              </ListItem>
            </List>
            :
            <List>
              <Link to={`/users/${currUser.id}`}>
                <ListItem button key={'My Pieces'} onClick={this.handleDrawerClose}>
                  <ListItemIcon><Photo /></ListItemIcon>
                  <ListItemText primary={'My Pieces'} />
                </ListItem>
              </Link>
              <Link to={`/users/${currUser.id}/jobs`}>
                <ListItem button key={'My Jobs'} onClick={this.handleDrawerClose}>
                  <ListItemIcon><Work /></ListItemIcon>
                  <ListItemText primary={'My Jobs'} />
                </ListItem>
              </Link> 
              <ListItem button key={'Find User'} onClick={showFindUser}>
                <ListItemIcon><Search /></ListItemIcon>
                <ListItemText primary={'Find User'} />
              </ListItem>
            </List>
          }
        </Drawer>
      </Fragment>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(NavBar)
