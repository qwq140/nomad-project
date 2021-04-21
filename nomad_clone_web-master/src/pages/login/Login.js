import React, { useEffect } from "react";
import { LoginContainer, LoginForm } from "./style";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../../reducers/user";
import AppLayout from "../../components/AppLayout";

const Login = ({ history }) => {
  const { logInError, logInDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 로그인 성공 시
  useEffect(() => {
    if (logInDone) {
      history.push("/");
    }
  }, [logInDone, history]);

  // 로그인 실패 시
  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const googleLogin = (response) => {
    dispatch(loginRequestAction(response));
  };

  return (
    <>
      <AppLayout>
        <LoginContainer bordered={false}>
          <h2>Log in to Nomad Coders</h2>
          <LoginForm>
            <GoogleLogin
              clientId="313981373260-062a94g5hlt225s78jc4fjsa463hm2p6.apps.googleusercontent.com"
              buttonText="Google Login"
              onSuccess={googleLogin}
              onFailure={googleLogin}
              cookiePolicy={"single_host_origin"}
            />
          </LoginForm>
        </LoginContainer>
      </AppLayout>
    </>
  );
};

export default Login;
