import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import downArrowImg from '../../assets/down-arrow.svg';

import './styles.scss';
import { database } from '../../services/firebase';

type HeaderProps = {
	initialLetter: string;
};

type FirebaseUsers = {
	id: string;
	email: string;
	password: string;
	type: string;
};

let dataUser: FirebaseUsers;

export function Header({ initialLetter }: HeaderProps) {
	const [dropdownVisible, setDropdownVisible] = useState(false);

	useEffect(() => {
		const userId = localStorage.getItem('id');

		const userRef = database.ref(`users/${userId}`);

		userRef.once('value', user => {
			dataUser = user.val();
			dataUser.id = user.key!;
		});
	}, []);

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
	const { id, type } = dataUser;
	const [userType, setUserType] = useState(type);

	function handleLogout() {
		history.push('/');
	}

	async function handleUserTypeChange(event: FormEvent) {
		event.preventDefault();

		await database.ref(`users/${id}`).update({
			type: userType,
		});

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
						checked={userType === 'admin' && true}
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
						checked={userType === 'student' && true}
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
