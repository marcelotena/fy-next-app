import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from 'react-redux';
import { compose } from "redux";
import useTranslation from '../hooks/useTranslation'

const withAuth = Component => ({ isAuthenticated, loading, ...rest }) => {
  const { locale } = useTranslation();

  useEffect(() => {
    if(!isAuthenticated && !loading) {
      Router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, loading]);

  if(!isAuthenticated) {
    return <div>Not logged in...</div>
  } else {
    return <Component {...rest} />;
  }

};

withAuth.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

const composedWithAuth = compose(
    connect(mapStateToProps),
    (withAuth)
);

export default composedWithAuth;