import logoImg from '../../assets/logo.svg';
import eyeOffImg from '../../assets/eye-off.svg';

export function SignIn() {
	return (
		<div className='container'>
			<div className='box'>
				<img src={logoImg} alt='Logo' />
				<h2>Desafio Trainee</h2>

				<form>
					<div className='input'>
						<label>Email</label>
						<input type='email' />
					</div>

					<div className='input'>
						<label>Senha</label>
						<input type='password' />
						<img src={eyeOffImg} alt='Mostrar ou esconder senha' />
					</div>

					<button type='submit'>Entrar</button>
				</form>
			</div>
		</div>
	);
}
