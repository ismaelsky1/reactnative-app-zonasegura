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
  street: string;
  city: {_id: string, name: string};
  district: {_id: string, name: string};
  complement: string;
  document: string;
  number: string;
  phone: string;
  role: string;
  state: string;
  status: string;
  postCode: string;
  coordinates: string;
  dueDate: string;
  ownerDistrict: any[]
  created_at: Date;
}

interface SignUpCredentials {
  email: string;
  name: string;
  street: string;
  city: string;
  district: string;
  complement: string;
  document: string;
  number: string;
  phone: string;
  role: string;
  state: string;
  postCode: string;
  coordinates: string;
  dueDate: string;
}

interface AuthState {
  token?: string;
  user: User;
}

interface SignInCredentials {
  document: string;
  password: string;
}

interface CheckValidationCodeCredentials {
  _id: string;
  code: String;
}
interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  checkValidationCode(
    credentials: CheckValidationCodeCredentials
  ): Promise<void>;
  setToken(
    credentials: AuthState
  ): Promise<void>,
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
    setToken(response.data);
  }, []);

  const signUp = useCallback(async (signUpDto) => {
    const { data } = await api.post("auth/singUp", signUpDto);
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
    setToken(response.data);
  }, []);

  const setToken = useCallback(async ({ token, user }) => {
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
      value={{
        user: data.user,
        setUser,
        loading,
        signIn,
        signUp,
        signOut,
        checkValidationCode,
        setToken,
      }}
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
