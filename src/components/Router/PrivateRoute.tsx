import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useContext } from 'react';
import { CircularProgress, Stack } from '@mui/material';

interface IPrivateRoute {
  children: JSX.Element;
}

const PrivateRoute = (props: IPrivateRoute) => {
  const { loading, user } = useContext(AuthContext);

  if (loading)
    return (
      <Stack justifyContent="center" alignItems="center" height="90vh">
        <CircularProgress />
      </Stack>
    );

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
