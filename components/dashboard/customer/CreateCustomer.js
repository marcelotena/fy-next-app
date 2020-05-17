import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCustomer } from "../../../actions/customer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: theme.spacing(1)
    },
  },
}));

const CreateCustomer = ({ createCustomer, success }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    companyId: '',
    address: '',
    email: '',
  });

  useEffect(() => {
    if(success) {
      setFormData({
        name: '',
        companyId: '',
        address: '',
        email: '',
      });
    }
  }, [success]);

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

        <form id="create-customer-form" className={classes.root} noValidate autoComplete="off" onSubmit={e => onSubmit(e)}>

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
  createCustomer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  success: state.customer.success
});

export default connect(mapStateToProps, { createCustomer })(CreateCustomer);
