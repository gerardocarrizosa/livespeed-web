import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { Form, Formik } from 'formik';
import { InferType } from 'yup';
import { signUpSchema } from '../utils/validations/yupValidations';
import TextFieldInput from '../components/formik/TextFieldInput';
import { rocallaLogo } from '../const/assetsConsts';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from '../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupScreen = () => {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (values: InferType<typeof signUpSchema>) => {
    // await signUp(
    //   `${values.firstName} ${values.lastName}`,
    //   values.email,
    //   values.password
    // );
    // navigate('/');
  };

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
            Registro
          </Typography>
        </Box>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={signUpSchema}
        >
          <Form>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1}>
                <TextFieldInput
                  name="firstName"
                  type="text"
                  label="Nombre(s)"
                />
                <TextFieldInput name="lastName" type="text" label="Apellidos" />
              </Stack>
              <TextFieldInput name="email" type="text" label="Email" />
              <TextFieldInput
                name="password"
                type="password"
                label="Contraseña"
              />
              <TextFieldInput
                name="passwordConfirm"
                type="password"
                label="Confirma tu contraseña"
              />
              <Button type="submit" variant="contained">
                Registrarse
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Box>
      <Stack direction="row" alignItems="center" pt={1} spacing={1}>
        <Typography>Ya tienes cuenta?</Typography>
        <Button onClick={() => navigate('/signin')}>Inicia sesión!</Button>
      </Stack>
    </Stack>
  );
};

export default SignupScreen;
