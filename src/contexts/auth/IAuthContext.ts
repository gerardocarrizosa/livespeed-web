import { InferType } from 'yup';
import { User } from '../../utils/types/UserType';
import {
  signInSchema,
  signUpSchema,
} from '../../utils/validations/yupValidations';

export interface IAuthContext {
  loading: boolean;
  user: User | null;
  // login: (credentials: InferType<typeof signInSchema>) => void;
  login: (credentials: InferType<typeof signInSchema>) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (user: InferType<typeof signUpSchema>) => Promise<void>;
}
