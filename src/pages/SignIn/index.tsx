import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../services/firebase';

import logoImg from '../../assets/logo.svg';
import eyeOffImg from '../../assets/eye-off.svg';

import { useContext } from 'react';
import { AuthContext } from '../../App';

import Particles from 'react-particles-js';
import './styles.scss';

export function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { setUser } = useContext(AuthContext);
	const history = useHistory();

	function showOrHidePassword() {
		setShowPassword(!showPassword);
	}

	async function handleSignIn(event: FormEvent) {
		event.preventDefault();

		try {
			const data = await auth.signInWithEmailAndPassword(email, password);

			if (!data.user) {
				return;
			}
			const { uid: id } = data.user;

			setUser(id);
			history.push('/admin/home');
		} catch (err) {
			throw 'User does not exists!';
		}
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
					/>

					<div>
						<label>Senha</label>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='Mínimo de 8 caracteres'
							onChange={event => setPassword(event.target.value)}
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
		</div>
	);
}
