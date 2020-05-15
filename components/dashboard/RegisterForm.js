import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { setAlert } from "../../actions/alert";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: theme.spacing(1)
    },
  },
}));

const RegisterForm = ({ setAlert }) => {
  const classes = useStyles();
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if(password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      console.log('SUCCESS');
    }
  };

  return (
      <div>
        <h1>Register</h1>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => onSubmit(e)}>

          <div className={classes.root}>
            <TextField
                id="register-name"
                name="name"
                required
                label="Name"
                variant="outlined"
                value={name}
                onChange={e => onChange(e)}
                fullWidth
            />
          </div>

          <div className={classes.root}>
            <TextField
                id="register-email"
                name="email"
                required
                label="Email address"
                variant="outlined"
                value={email}
                onChange={e => onChange(e)}
                fullWidth
            />
          </div>

          <div className={classes.root}>
            <TextField
                id="register-password"
                name="password"
                required
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={e => onChange(e)}
                fullWidth
            />
          </div>

          <div className={classes.root}>
            <TextField
                id="register-passwordconfirm"
                name="password2"
                required
                type="password"
                label="Confirm password"
                variant="outlined"
                value={password2}
                onChange={e => onChange(e)}
                fullWidth
            />
          </div>


          <div className={classes.root}>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </div>


        </form>
      </div>
  );
};

RegisterForm.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(RegisterForm);
