import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';
import { Grade } from '../../components/Grade';

import './styles.scss';

export function StudentHome() {
	return (
		<div className='student-container'>
			<Header initialLetter='A' />
			<SubHeader title='Nome da Escola' />

			<main>
				<Grade />
			</main>
		</div>
	);
}
