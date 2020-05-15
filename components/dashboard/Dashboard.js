import React from 'react';
import PropTypes from 'prop-types';
import withAuth from '../../hocs/withAuth';

const Dashboard = props => {
  return (
      <div>
        <h1>Dashboard</h1>
      </div>
  );
};

Dashboard.propTypes = {

};

export default withAuth(Dashboard);
