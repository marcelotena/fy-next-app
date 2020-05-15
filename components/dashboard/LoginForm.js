import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: theme.spacing(1)
    },
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    console.log('SUCCESS');
  };

  return (
      <div>
        <h1>Log-in</h1>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => onSubmit(e)}>

          <div className={classes.root}>
            <TextField
                id="login-email"
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
                id="login-password"
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
            <Button variant="contained" color="primary" type="submit">
              Sign in
            </Button>
          </div>


        </form>
      </div>
  );
};

export default LoginForm;
