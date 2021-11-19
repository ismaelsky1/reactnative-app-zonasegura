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
  id: string;
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

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  document: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
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
      document: "12312312389",
      password: "123123",
    });

    const { token, user } = response.data;
    await AsyncStorage.multiSet([
      ["@Shild:token", token],
      ["@Shild:user", JSON.stringify(user)],
    ]);
    console.log(token);
    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["@Shild:user", "@Shild:token"]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
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
