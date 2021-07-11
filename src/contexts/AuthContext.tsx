import { ReactNode, createContext, useState } from 'react';

type User = string | undefined;

type AuthContextType = {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<string | undefined>>;
};

type AuthContextTypeProps = {
	children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextTypeProps) {
	const [user, setUser] = useState({} as User);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}
