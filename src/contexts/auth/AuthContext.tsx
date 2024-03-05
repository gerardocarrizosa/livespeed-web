import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../../utils/types/UserType';
import { IAuthContext } from './IAuthContext';
import {
  UsersEndpoints,
  loginInput,
} from '../../utils/backendClient/users.endpoints';
import { InferType } from 'yup';
import {
  signInSchema,
  signUpSchema,
} from '../../utils/validations/yupValidations';

const AuthContext = createContext<IAuthContext>({
  loading: false,
  user: null,
  login: function (credentials: InferType<typeof signInSchema>): Promise<void> {
    throw new Error('Function not implemented.');
  },
  logout: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  signUp: function (user: InferType<typeof signUpSchema>): Promise<void> {
    throw new Error('Function not implemented.');
  },
});

const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const usersEndpoints = new UsersEndpoints();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: loginInput) => {
    const authResponse = await usersEndpoints.login(credentials);

    if (authResponse && authResponse.status == 200) {
      const userData = authResponse.data;
      setUser({
        id: userData.id,
        email: userData.email,
        uid: userData.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        photoURL: userData.photoUrl,
        phoneNumber: userData.phoneNumber,
      });
    }
  };

  const logout = async () => {
    // await signOut(auth);
    await usersEndpoints.logout();
    setUser(null);
  };

  const signUp = async (user: InferType<typeof signUpSchema>) => {
    // const createUserResponse = await createUserWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );
    // console.log('createUserResponse', createUserResponse);
    // await updateProfile(auth.currentUser!, {
    //   displayName: name,
    // });
    // setUser({
    //   email: createUserResponse.user.email!,
    //   uid: createUserResponse.user.uid!,
    //   displayName: createUserResponse.user.displayName!,
    //   photoURL: createUserResponse.user.displayName!,
    // });
  };

  useEffect(() => {
    const sessionLookup = () => {
      usersEndpoints.lookup().then((session) => {
        if (session) {
          setUser({
            id: session.id,
            email: session.email,
            uid: session.uid,
            firstName: session.firstName,
            lastName: session.lastName,
            photoURL: session.photoUrl,
            phoneNumber: session.phoneNumber,
          });
        }
        setLoading(false);
      });
    };
    return () => sessionLookup();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, login, user, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('There is no Auth provider');
  return context;
};

export { AuthContext, AuthProvider };
