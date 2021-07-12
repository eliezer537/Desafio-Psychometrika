import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';

import './styles.scss';

export function AdminHome() {
	return (
		<div className='admin-container'>
			<Header initialLetter='A' />
			<SubHeader title='Nome da Escola' />
		</div>
	);
}
