import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { database } from '../../services/firebase';

import toast, { Toaster } from 'react-hot-toast';

import logoImg from '../../assets/logo.svg';
import eyeOffImg from '../../assets/eye-off.svg';

import Particles from 'react-particles-js';
import './styles.scss';

type FirebaseUsers = Record<
	string,
	{
		id: string;
		email: string;
		password: string;
		type: string;
	}
>;

export function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const history = useHistory();

	function showOrHidePassword() {
		setShowPassword(!showPassword);
	}

	function handleSignIn(event: FormEvent) {
		event.preventDefault();
		if (email.trim() === '' || password.trim() === '') {
			return;
		}

		const userRef = database.ref('users');

		userRef.once('value', user => {
			const databaseUser = user.val();
			const firebaseUsers: FirebaseUsers = databaseUser ?? {};

			const parsedUsers = Object.entries(firebaseUsers).map(([key, value]) => {
				return {
					id: key,
					email: value.email,
					password: value.password,
					type: value.type,
				};
			});

			const dataUser = parsedUsers.find(item => {
				return item.email === email && item.password === password;
			});

			if (!dataUser) {
				toast.error('Ops, usuário não existe!', { icon: '❗️' });
				return;
			}

			if (dataUser?.type === 'admin') {
				history.push('/admin/home');

				localStorage.setItem('id', dataUser.id);
			}

			if (dataUser?.type === 'student') {
				history.push('/student/home');
				localStorage.setItem('id', dataUser.id);
			}
		});
	}

	return (
		<div className='container'>
			<Particles
				className='particles'
				params={{
					background: {
						color: {
							value: '#fafafa',
						},
					},
					particles: {
						color: {
							value: '#aeaeae',
						},
						links: {
							color: '#e9e9e9',
						},
						number: {
							value: 50,
						},
						size: {
							value: 3,
						},
					},
					interactivity: {
						events: {
							onhover: {
								enable: true,
								mode: 'repulse',
							},
						},
					},
				}}
			/>

			<div className='box'>
				<img src={logoImg} alt='Logo' />
				<span>Desafio Trainee</span>

				<form onSubmit={handleSignIn}>
					<label>Email</label>

					<input
						type='email'
						placeholder='Seu email institucional'
						onChange={event => setEmail(event.target.value)}
						required
					/>

					<div>
						<label>Senha</label>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='Mínimo de 8 caracteres'
							onChange={event => setPassword(event.target.value)}
							required
						/>
						<img
							src={eyeOffImg}
							alt='Mostrar ou esconder senha'
							onClick={showOrHidePassword}
						/>
					</div>

					<button type='submit'>Entrar</button>
				</form>
			</div>
			<Toaster position='top-right' toastOptions={{ duration: 4000 }} />
		</div>
	);
}
