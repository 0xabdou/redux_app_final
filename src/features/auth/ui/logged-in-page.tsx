import {Avatar, Button, createStyles, makeStyles, Theme} from "@material-ui/core";
import {useCallback, useContext} from "react";
import {nonDraggable, textSelectable} from "../../../styles/shared";
import {useDispatch} from "react-redux";
import {AuthActionsContext} from "../auth-actions-context";

const fakeUser = {
  accessToken: 'some_access_token',
  username: 'escanor',
  photoURL: 'https://avatars.githubusercontent.com/u/56047563?s=460&u=bec218f4b26de23ad44779a2d3cfd964fcb0732a&v=4'
};

const LoggedInPage = () => {
  const dispatch = useDispatch();
  const {logout} = useContext(AuthActionsContext);
  const classes = useStyles();

  const logoutClicked = useCallback(() => {
    dispatch(logout());
  }, [dispatch, logout]);

  return (
    <div className={classes.layout}>
      <Avatar className={classes.avatar} src={fakeUser.photoURL}/>
      <span className={classes.username}>@{fakeUser.username}</span>
      <Button variant='contained' color='primary' onClick={logoutClicked}>
        Logout
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  const pColor = theme.palette.primary.main;
  const pColorDark = theme.palette.primary.dark;
  return createStyles({
    layout: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      ...textSelectable,
    },
    avatar: {
      width: '200px',
      height: '200px',
      border: `2px solid ${pColor}`,
      '& img': {
        ...nonDraggable
      }
    },
    username: {
      fontSize: '1.5em',
      color: pColorDark,
      marginBottom: `${theme.spacing(3)}px`
    }
  });
});

export default LoggedInPage;