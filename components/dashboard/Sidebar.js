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
import useTranslation from "../../hooks/useTranslation";
import Link from "next/link";
// Icons
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';


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
  },
  lightdivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  }
}));

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
              <Avatar alt={name} src={avatar} />
            }
            title={name}
            subheader={role}
            className={classes.card}
        />

        <List component="nav" aria-label="dashboard summary">
          <Link href={`/${locale}/dashboard`}>
            <a>
              <LightListItemButton button>
                <ListItemIcon>
                  <DashboardOutlinedIcon className={classes.lighticon} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </LightListItemButton>
            </a>
          </Link>
        </List>

        <Divider className={classes.lightdivider} />

        <List component="nav" aria-label="main admin folders">
          <Link href={`/${locale}/users`}>
            <a>
              <LightListItemButton button>
                <ListItemIcon>
                  <PeopleAltOutlinedIcon className={classes.lighticon} />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </LightListItemButton>
            </a>
          </Link>

          <Link href={`/${locale}/issuers`}>
            <a>
              <LightListItemButton button>
                <ListItemIcon>
                  <WorkOutlineOutlinedIcon className={classes.lighticon} />
                </ListItemIcon>
                <ListItemText primary="Issuers" />
              </LightListItemButton>
            </a>
          </Link>

          <Link href={`/${locale}/customers`}>
            <a>
              <LightListItemButton button>
                <ListItemIcon>
                  <MonetizationOnOutlinedIcon className={classes.lighticon} />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </LightListItemButton>
            </a>
          </Link>
        </List>

        <Divider className={classes.lightdivider} />

        <List component="nav" aria-label="secondary document folders">
          <Link href={`/${locale}/invoices`}>
            <a>
              <LightListItemButton button>
                <ListItemIcon>
                  <DescriptionOutlinedIcon className={classes.lighticon} />
                </ListItemIcon>
                <ListItemText primary="Invoices" />
              </LightListItemButton>
            </a>
          </Link>

          <Link href={`/${locale}/quotations`}>
            <a>
              <LightListItemButton button>
                <ListItemIcon>
                  <BarChartOutlinedIcon className={classes.lighticon} />
                </ListItemIcon>
                <ListItemText primary="Quotations" />
              </LightListItemButton>
            </a>
          </Link>
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
