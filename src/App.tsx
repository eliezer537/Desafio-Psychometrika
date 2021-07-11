import { BrowserRouter, Route } from 'react-router-dom';

import { SignIn } from './pages/SignIn';
import { AdminHome } from './pages/AdminHome';
import { StudentHome } from './pages/StudentHome';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Route path='/' exact component={SignIn} />
				<Route path='/admin/home' exact component={AdminHome} />
				<Route path='/student/home' exact component={StudentHome} />
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
