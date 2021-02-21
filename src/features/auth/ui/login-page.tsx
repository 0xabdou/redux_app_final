import Logo from '../../../assets/logo.png';
import {Button, CircularProgress, createStyles, makeStyles, TextField, Theme} from "@material-ui/core";
import React, {useCallback, useState} from "react";
import {nonDraggable, nonSelectable} from "../../../styles/shared";
import ErrorSnackbar from "../../../shared/components/error-snackbar";
import AuthError from "../types/auth-error";
import {useAppDispatch, useAppSelector} from "../../../app/redux-hooks";
import {useAuthActions} from "../auth-actions-context";

const validators = {
  validateEmail(email: string): string | null {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (regex.test(email)) return null;
    return 'Please enter a valid email';
  },
  validatePassword(password: string): string | null {
    if (password.length === 0) return 'Please enter a password';
    if (password.length < 8) return 'Password too short';
    if (password.length > 50) return 'Password too long';
    return null;
  },
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const {loginWithEmailAndPass} = useAuthActions();
  const dispatch = useAppDispatch();

  const {loading, error} = useAppSelector(state => {
    return {loading: state.auth.loading, error: state.auth.error};
  });

  const classes = useStyles();

  const emailChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  }, []);

  const passwordChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  }, []);

  const validate = useCallback(() => {
    const eError = validators.validateEmail(email);
    const pError = validators.validatePassword(password);
    setEmailError(eError);
    setPasswordError(pError);
    return !(eError || pError);
  }, [email, password]);

  const loginClicked = useCallback((e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(loginWithEmailAndPass({email, password}));
    }
  }, [dispatch, validate, loginWithEmailAndPass, email, password]);

  const stringifyError = useCallback((error: AuthError | null): string => {
    switch (error) {
      case AuthError.network:
        return 'Check your internet connection';
      case AuthError.invalidEmailOrPassword:
        return 'Wrong email or password';
      default:
        return 'Something weird happened';
    }
  }, []);

  return (
    <div className={classes.layout}>
      <img className={classes.logo} src={Logo} alt='logo'/>
      <form className={classes.form}>
        <TextField
          className={classes.textField}
          variant='outlined' label='email'
          value={email}
          onChange={emailChanged}
          error={!!emailError}
          helperText={emailError ?? undefined}
        />
        <TextField
          className={classes.textField}
          variant='outlined'
          label='password'
          type='password'
          value={password}
          onChange={passwordChanged}
          error={!!passwordError}
          helperText={passwordError ?? undefined}
        />
        <div className={classes.buttonWrapper}>
          {!loading && <Button color='primary' variant='contained' onClick={loginClicked} type='submit'>
            Login
          </Button>}
          {loading && <CircularProgress/>}
        </div>
      </form>
      <ErrorSnackbar<AuthError>
        currentError={error}
        stringify={stringifyError}
      />
    </div>
  );
};


const useStyles = makeStyles((theme: Theme) => {
  const spacing = `${theme.spacing(3)}px`;
  return createStyles({
    layout: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      ...nonSelectable,
    },
    logo: {
      width: '150px',
      height: '150px',
      margin: spacing,
      animation: '$rotate 5s linear infinite',
      ...nonDraggable,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    textField: {
      width: '300px',
      marginBottom: spacing,
    },
    buttonWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50px',
    },
    '@keyframes rotate': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      }
    },
  });
});

export default LoginPage;