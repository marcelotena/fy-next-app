import React from 'react';
// Material-ui
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  card: {
    '& .MuiCardHeader-title': {
      fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif',
      fontWeight: 'bold',
      color: 'white'
    },
    '& .MuiTypography-colorTextSecondary': {
      color: 'white'
    },
    '& .MuiCardHeader-action': {
      marginTop: 0,
      marginRight: 0
    }
  }
}));

const LightIconButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('rgba(255, 255, 255, 0.84)'),
    backgroundColor: 'rgba(255, 255, 255, 0.84)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.54)',
    },
  },
}))(IconButton);

const Sidebar = props => {
  const { name, avatar, role } = props.user;
  const classes = useStyles();

  return (
      <div className="sidebar-inner">
        <CardHeader
            avatar={
              <Avatar alt={name} src={avatar} className={classes.large} />
            }
            action={
              <LightIconButton aria-label="settings">
                <MoreVertIcon />
              </LightIconButton>
            }
            title={name}
            subheader={role}
            className={classes.card}
        />

        <span></span>

        { /* language=CSS */ }
        <style jsx>{`
          .sidebar-inner {
            padding: 15px;
          }
            `}</style>
      </div>
  );
};

export default Sidebar;
