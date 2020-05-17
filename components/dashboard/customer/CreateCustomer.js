import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const CreateCustomer = props => {
  const [formData, setFormData] = useState({
    name: '',
    companyId: '',
    address: '',
    email: '',
  });

  const { name, companyId, address, email } = formData;

  const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    createCustomer({ name, companyId, address, email });
  };

  return (
      <div>
        <h1>Create new customer</h1>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => onSubmit(e)}>

          <div className={classes.root}>
            <TextField
                id="register-name"
                name="name"
                required
                label="Name / Company name"
                variant="outlined"
                value={name}
                onChange={e => onChange(e)}
                fullWidth
            />
          </div>

          <div className={classes.root}>
            <TextField
                id="register-companyId"
                name="companyId"
                required
                label="ID"
                variant="outlined"
                value={companyId}
                onChange={e => onChange(e)}
                fullWidth
            />
          </div>

          <div className={classes.root}>
            <TextField
                id="register-address"
                name="address"
                required
                label="Address"
                variant="outlined"
                value={address}
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
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </div>


        </form>
      </div>
  );
};

CreateCustomer.propTypes = {
  
};

export default connect(null, { createCustomer })(CreateCustomer);
