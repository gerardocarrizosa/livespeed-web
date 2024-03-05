import { object, ref, string } from 'yup';

const requiredFieldMessage = 'Campo obligatorio';
const emailErrorMessage = 'Correo electrónico inválido';

export const signInSchema = object({
  email: string().email(emailErrorMessage).required(requiredFieldMessage),
  password: string().required(requiredFieldMessage),
});

export const signUpSchema = object({
  firstName: string().required(requiredFieldMessage),
  lastName: string().required(requiredFieldMessage),
  email: string().email(emailErrorMessage).required(requiredFieldMessage),
  password: string().required(requiredFieldMessage),
  passwordConfirm: string()
    .oneOf([ref('password')], 'Las contraseñas no coinciden')
    .required(requiredFieldMessage),
});
