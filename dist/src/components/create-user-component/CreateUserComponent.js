import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CreateUserComponent.css';
// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// FAB
import { FloatingActionButton } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
// Dialog
import withRoot from '../withRoot';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class CreateUserComponent extends Component {

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return(
            <div>
                <Button 
                    className="fab"
                    variant="fab"
                    color="primary"
                    onClick={this.handleClickOpen}>
                    <AddIcon />
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create new user</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="email"
                            label="Email Address" type="email" fullWidth/>
                        <TextField margin="dense" id="password"
                            label="Password" type="password" fullWidth/>
                        <TextField margin="dense" id="username"
                            label="Username" type="text" fullWidth/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default withRoot(CreateUserComponent);