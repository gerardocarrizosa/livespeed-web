import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { InferType } from 'yup';
import { signInSchema } from '../utils/validations/yupValidations';
import { AuthContext } from '../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { rocallaLogo } from '../const/assetsConsts';
import TextFieldInput from '../components/formik/TextFieldInput';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '../components/LoadingButton';

const SigninScreen = () => {
  const { login, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: InferType<typeof signInSchema>) => {
    console.log(values);
    setIsLoading(true);
    await login(values);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (
    <Stack justifyContent="center" alignItems="center" height="95vh">
      <Box
        border="1px solid #EBEBEB"
        borderRadius={1}
        p={3}
        bgcolor="#F1F1F1"
        boxShadow={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="0px 0px 16px 0px"
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box component="img" src={rocallaLogo} width={200} />
          <Typography component="h1" variant="h5">
            Inicia sesión
          </Typography>
        </Box>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={signInSchema}
        >
          <Form>
            <Stack spacing={1}>
              <TextFieldInput name="email" type="text" label="Email" />
              <TextFieldInput
                name="password"
                type="password"
                label="Password"
              />
              <LoadingButton
                text="Iniciar sesión"
                type="submit"
                isLoading={isLoading}
              />
            </Stack>
          </Form>
        </Formik>
      </Box>
      <Stack direction="row" alignItems="center" pt={1} spacing={1}>
        <Typography>No tienes cuenta?</Typography>
        <Button onClick={() => navigate('/signup')}>Registrate!</Button>
      </Stack>
    </Stack>
  );
};

export default SigninScreen;
