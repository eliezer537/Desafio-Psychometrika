import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { SignIn } from './pages/SignIn';
import { AdminHome } from './pages/AdminHome';
import { StudentHome } from './pages/StudentHome';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Switch>
					<Route path='/' exact component={SignIn} />
					<Route path='/admin/home/:schoolId' exact component={AdminHome} />
					<Route path='/student/home/:schoolId' exact component={StudentHome} />
				</Switch>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
