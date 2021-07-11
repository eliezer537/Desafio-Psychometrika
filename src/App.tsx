import { createContext, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { SignIn } from './pages/SignIn';
import { AdminHome } from './pages/AdminHome';
import { StudentHome } from './pages/StudentHome';

type User = string | undefined;

type AuthContextType = {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const AuthContext = createContext({} as AuthContextType);

function App() {
	const [user, setUser] = useState({} as User);

	return (
		<BrowserRouter>
			<AuthContext.Provider value={{ user, setUser }}>
				<Route path='/' exact component={SignIn} />
				<Route path='/admin/home' exact component={AdminHome} />
				<Route path='/student/home' exact component={StudentHome} />
			</AuthContext.Provider>
		</BrowserRouter>
	);
}

export default App;
