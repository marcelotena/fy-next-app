import React from 'react';
// Material-ui
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import Router from "next/router";
import useTranslation from "../../hooks/useTranslation";

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
      color: 'white',
      fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif'
    },
    '& .MuiCardHeader-action': {
      marginTop: 0,
      marginRight: 0
    }
  },
  lighticon: {
    color: 'rgba(255, 255, 255, 0.9)'
  }
}));

const LightIconButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('rgba(255, 255, 255, 0.9)'),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
}))(IconButton);

const LightListItemButton = withStyles((theme) => ({
  root: {
    color: 'rgba(255, 255, 255, 0.9)',
    '&:hover': {
      color: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
  }
}))(ListItem);

const Sidebar = props => {
  const { name, avatar, role } = props.user;
  const { locale, t } = useTranslation();
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

        <List component="nav" aria-label="main mailbox folders">
          <LightListItemButton button onClick={() => Router.push(`/${locale}/dashboard`)}>
            <ListItemIcon>
              <AssessmentOutlinedIcon className={classes.lighticon} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </LightListItemButton>
          <LightListItemButton button onClick={() => Router.push(`/${locale}/invoices`)}>
            <ListItemIcon>
              <AssessmentOutlinedIcon className={classes.lighticon} />
            </ListItemIcon>
            <ListItemText primary="Invoices" />
          </LightListItemButton>
          <LightListItemButton button>
            <ListItemIcon>
              <AssessmentOutlinedIcon className={classes.lighticon} />
            </ListItemIcon>
            <ListItemText primary="Quotations" />
          </LightListItemButton>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <LightListItemButton button>
            <ListItemIcon>
              <AssessmentOutlinedIcon className={classes.lighticon} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </LightListItemButton>
          <LightListItemButton button>
            <ListItemIcon>
              <AssessmentOutlinedIcon className={classes.lighticon} />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </LightListItemButton>
          <LightListItemButton button>
            <ListItemIcon>
              <AssessmentOutlinedIcon className={classes.lighticon} />
            </ListItemIcon>
            <ListItemText primary="Issuers" />
          </LightListItemButton>
        </List>

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
