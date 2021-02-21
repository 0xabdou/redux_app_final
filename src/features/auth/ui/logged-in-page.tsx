import {Avatar, Button, createStyles, makeStyles, Theme} from "@material-ui/core";
import {useCallback} from "react";
import {nonDraggable, textSelectable} from "../../../styles/shared";
import {useAppDispatch, useAppSelector} from "../../../app/redux-hooks";
import {shallowEqual} from "react-redux";
import {useAuthActions} from "../auth-actions-context";

const LoggedInPage = () => {
  const user = useAppSelector(state => state.auth.currentUser, shallowEqual);
  const dispatch = useAppDispatch();
  const {logout} = useAuthActions();

  const classes = useStyles();

  const logoutClicked = useCallback(() => {
    dispatch(logout());
  }, [dispatch, logout]);

  if (user == null) {
    // This should never happen
    throw new Error('Displaying the LoggedInPage without a logged in user');
  }

  return (
    <div className={classes.layout}>
      <Avatar className={classes.avatar} src={user.photoURL}/>
      <span className={classes.username}>@{user.username}</span>
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