import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import downArrowImg from '../../assets/down-arrow.svg';

import './styles.scss';

type HeaderProps = {
	initialLetter: string;
};

export function Header({ initialLetter }: HeaderProps) {
	const [dropdownVisible, setDropdownVisible] = useState(false);

	function handleDropdown() {
		setDropdownVisible(!dropdownVisible);
	}

	return (
		<header>
			<div className='left-side'>
				<img src={logoImg} alt='Logo' />
				<div className='line'></div>
				<span>Desafio Trainee</span>
			</div>

			<div className={`right-side ${dropdownVisible && 'activeDropdown'}`}>
				<div className='circle'>
					<strong>{initialLetter}</strong>
				</div>
				<img src={downArrowImg} alt='Seta para baixo' onClick={handleDropdown} />
				{dropdownVisible ? <Dropdown /> : ''}
			</div>
		</header>
	);
}

function Dropdown() {
	const history = useHistory();
	const [userType, setUserType] = useState('');

	function handleLogout() {
		history.push('/');
	}

	function handleUserTypeChange(event: FormEvent) {
		event.preventDefault();
		history.push(`/${userType}/home`);
	}

	return (
		<div className='container-dropdown'>
			<form onSubmit={handleUserTypeChange}>
				<p>Você está atualmente com</p>

				<div>
					<input
						type='radio'
						name='user'
						id='admin'
						value='admin'
						onChange={event => setUserType(event.target.value)}
					/>
					<label htmlFor='admin'>Acesso do Admin</label>
				</div>

				<div>
					<input
						type='radio'
						name='user'
						id='student'
						value='student'
						onChange={event => setUserType(event.target.value)}
					/>
					<label htmlFor='student'>Acesso do Aluno</label>
				</div>

				<div>
					<button type='submit'>Alterar</button>
				</div>
			</form>
			<button className='logout-button' type='button' onClick={handleLogout}>
				Sair
			</button>
		</div>
	);
}
