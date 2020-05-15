import React from 'react';
import PropTypes from 'prop-types';
import withAuth from '../../hocs/withAuth';
import { connect } from 'react-redux';

const Dashboard = ({ user }) => {
  return (
      <div>
        <h1>Dashboard</h1>

        <div className="row">

          <div className="col-md-3">
            <img src={user.avatar} alt={user.name} />
          </div>

          <div className="col-md-9">
            <h3>{user.name} <span>({user.role})</span></h3>
            <div>{user.email}</div>
          </div>

        </div>


      </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(withAuth(Dashboard));
