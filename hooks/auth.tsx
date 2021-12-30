import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

interface User {
  _id: string;
  email: string;
  name: string;
  address: string;
  city: string;
  complement: string;
  created_at: Date;
  district: string;
  document: string;
  number: string;
  phone: string;
  responsibleAgentId: string;
  role: string;
  state: string;
  status: string;
  zipcode: string;
  coordinates: string;
}

interface SignUpCredentials {
  email: string;
  name: string;
  document: string;
  phone: string;
  role: string;
  state: string;
  status: string;
}

interface AuthState {
  token?: string;
  user: User;
}

interface SignInCredentials {
  document: string;
  password: string;
}

interface CheckValidationCodeCredentials{
  _id: string;
  code: String;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  checkValidationCode(credentials: CheckValidationCodeCredentials): Promise<void>;
  signOut(): void;
  setUser(use: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        "@Shild:token",
        "@Shild:user",
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ document, password }) => {
    const response = await api.post("auth/singIn", {
      document,
      password,
    });
    console.log('step2',response.data)
    const { token, user } = response.data;
    await AsyncStorage.multiSet([
      ["@Shild:token", token],
      ["@Shild:user", JSON.stringify(user)],
    ]);
    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signUp = useCallback(async (signUpDto) => {
    const document = signUpDto.document.replace(/[^0-9]/g,'');
    const phone = signUpDto.phone.replace(/[^0-9]/g,'');
    signUpDto.document = document;
    signUpDto.phone = phone;
    signUpDto.role = 'CLIENT';
    signUpDto.status = 'PENDING_VALIDATION';
    
     const {data} = await api.post("auth/singUp", signUpDto);
     return data;
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["@Shild:user", "@Shild:token"]);

    setData({} as AuthState);
  }, []);

  const checkValidationCode = useCallback(async ({ _id, code }) => {
    const response = await api.post(`auth/checkValidationCode/${_id}`, {
      code,
    });
    
    const { token, user } = response.data;
    await AsyncStorage.multiSet([
      ["@Shild:token", token],
      ["@Shild:user", JSON.stringify(user)],
    ]);
    
    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const setUser = useCallback(async (user) => {
    await AsyncStorage.removeItem("@Shild:user");
    await AsyncStorage.setItem("@Shild:user", JSON.stringify(user));
    setData({ user });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, setUser, loading, signIn, signUp, signOut, checkValidationCode }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
