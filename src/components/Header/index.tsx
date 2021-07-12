import logoImg from '../../assets/logo.svg';
import downArrowImg from '../../assets/down-arrow.svg';

import './styles.scss';

type HeaderProps = {
	initialLetter: string;
};

export function Header({ initialLetter }: HeaderProps) {
	return (
		<header>
			<div className='left-side'>
				<img src={logoImg} alt='Logo' />
				<div className='line'></div>
				<span>Desafio Trainee</span>
			</div>

			<div className='right-side'>
				<div className='circle'>
					<strong>{initialLetter}</strong>
				</div>
				<img src={downArrowImg} alt='Seta para baixo' />
			</div>
		</header>
	);
}
