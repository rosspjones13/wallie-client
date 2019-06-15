import React, { Component } from 'react';
import { DialogActions, DialogTitle, Dialog, Button, TextField } from '@material-ui/core';
import { Paper, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Downshift from 'downshift'
import deburr from 'lodash/deburr';


function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function getSuggestions(value, users) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : users.filter(user => {
      const keep =
        count < 5 && user.name.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function renderSuggestion({ user, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(user.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={user.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {user.name}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  user: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  dialogPaper: {
    minHeight: 250,
  },
});

class FindDialog extends Component {
  constructor() {
    super()
    this.state = {
      userName: ''
    }
  }

  handleTextField = () => {
    this.setState({
      userName: document.querySelector('#downshift-simple-input').value
    })
  }

  render() {
    const { showFindDialog, handleFindClose, handleFindUser, users, classes } = this.props
    return (
      <div>
        <Dialog classes={{ paper: classes.dialogPaper }} open={showFindDialog} fullWidth>
          <DialogTitle id="alert-dialog-title">{"Who would you like to find?"}</DialogTitle>
          <Downshift id="downshift-simple" onChange={this.handleTextField}>
            {({
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem,
            }) => (
                <div className={classes.container}>
                  {renderInput({
                    fullWidth: true,
                    classes,
                    InputProps: getInputProps({
                      placeholder: 'Search for a user',
                    }),
                  })}
                  <div {...getMenuProps()}>
                    {isOpen ? (
                      <Paper className={classes.paper} square>
                        {getSuggestions(inputValue, users).map((user, index) =>
                          renderSuggestion({
                            user,
                            index,
                            itemProps: getItemProps({ item: user.name }),
                            highlightedIndex,
                            selectedItem,
                          }),
                        )}
                      </Paper>
                    ) : null}
                  </div>
                </div>
              )}
          </Downshift>
          <DialogActions>
            <Button onClick={handleFindClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit" onClick={() => handleFindUser(this.state.userName)} autoFocus>
              Find
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FindDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FindDialog);