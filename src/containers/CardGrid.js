import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/styles';
import { GridList, GridListTile, GridListTileBar, IconButton, Slide } from '@material-ui/core';
import { Info, StarBorder } from '@material-ui/icons';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 900,
    imageFullHeight: 450,
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  footerBar: {
    background:
    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white'
  }
});

const MyGridList = styled(GridList)({
  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
})

class CardGrid extends Component {
  render() {
    const { classes, user, pieces, handleStarClick, handleInfoClick } = this.props
    return (
      <div className={classes.root}>
        <MyGridList cellHeight={300} className={classes.gridList} cols={3} id="cardGrid">
          {pieces.map(piece => (
            <Slide key={piece.id} direction="up" in={true} mountOnEnter unmountOnExit>
              <GridListTile key={piece.id} id="gridTile">
                <img src={piece.image} className={classes.image} alt={piece.id} />
                <GridListTileBar
                  title={(user.usertype === "muralist") ? "" : piece.location}
                  subtitle={piece.rating}
                  className={classes.titleBar}
                  titlePosition="top"
                  actionPosition="left"
                  actionIcon={(user.usertype === "muralist") ?  
                    <IconButton onClick={() => handleStarClick(piece)} className={classes.icon}>
                      <StarBorder />
                    </IconButton>
                    : ""
                  }
                />
                <GridListTileBar
                  // title={piece.title}
                  title={user.name}
                  className={classes.footerBar}
                  actionIcon={
                    <IconButton onClick={handleInfoClick} className={classes.icon}>
                      <Info />
                    </IconButton>
                  }
                />
              </GridListTile>
            </Slide>
          ))}
        </MyGridList>
      </div>
    )
  }
}

CardGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CardGrid)
