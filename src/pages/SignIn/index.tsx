import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../services/firebase';

import toast, { Toaster } from 'react-hot-toast';

import logoImg from '../../assets/logo.svg';
import eyeOffImg from '../../assets/eye-off.svg';

import Particles from 'react-particles-js';
import './styles.scss';
import { useAuth } from '../../hooks/useAuth';

export function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { setUser } = useAuth();
	const history = useHistory();

	function showOrHidePassword() {
		setShowPassword(!showPassword);
	}

	async function handleSignIn(event: FormEvent) {
		event.preventDefault();

		if (email.trim() === '' || password.trim() === '') {
			return;
		}

		try {
			const data = await auth.signInWithEmailAndPassword(email, password);
			const id = data.user?.uid;

			setUser(id);
			history.push('/admin/home');
		} catch (err) {
			toast.error('Ops, usuário não existe!', { icon: '❗️' });
			return;
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
			<Toaster position='top-right' toastOptions={{ duration: 4000 }} />
		</div>
	);
}
