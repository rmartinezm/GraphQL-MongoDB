import React, { Component } from 'react';
import './CreateUserComponent.css';
// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// FAB
import AddIcon from 'material-ui-icons/Add';
// Dialog
import withRoot from '../withRoot';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

class CreateUserComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            email: '',
            password: '',
            username: ''
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = (option) => {
        if (typeof(option) !== 'boolean' || !option) {
            console.log("Usuario no agregado.");
            this.setState({ 
                open: false,
                email: '',
                password: '',
                username: ''
             });
        } else {
            if (this.state.email === '' || this.state.password === '' || this.state.username === ''){
                console.log("No se puede man :V");
            } else { 
                this.props.mutate({
                    variables: {
                        email: this.state.email,
                        password: this.state.password,
                        username: this.state.username
                    }
                }).then(res => {
                    console.log(res);
                });
            }
            this.setState({ open: false });   
        }
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
                        <TextField autoFocus margin="dense" id="email" label="Email Address" 
                            type="email" fullWidth onChange={(event) => {
                                this.setState({email: event.target.value});
                            }}/>
                        <TextField margin="dense" id="password" label="Password" 
                            type="password" fullWidth onChange={(event) => {
                                this.setState({password: event.target.value});
                            }}/>
                        <TextField margin="dense" id="username" label="Username" 
                            type="text" fullWidth onChange={(event) => {
                                this.setState({username: event.target.value});
                            }}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose.bind(this, false)}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose.bind(this, true)}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const CREATE_USER = gql`
    mutation createUser($email: String!, $password: String!, $username: String!) {
        createUser(email: $email, password: $password, username: $username) {
            _id
            username
        }
    }
`;

const CreateUserWithMutation = graphql(CREATE_USER)(CreateUserComponent);


export default withRoot(CreateUserWithMutation);