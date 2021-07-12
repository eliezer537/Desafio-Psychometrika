import { Link } from 'react-router-dom';
import leftArrowImg from '../../assets/left-arrow.svg';

import './styles.scss';

type HeaderProps = {
	title: string;
	hasBackIcon?: boolean;
	goBackLink?: string | undefined;
};

export function SubHeader({
	title,
	hasBackIcon = false,
	goBackLink = '',
}: HeaderProps) {
	return (
		<div className='header-container'>
			{hasBackIcon ? (
				<Link to={goBackLink}>
					<img src={leftArrowImg} alt='seta para voltar' />
				</Link>
			) : (
				''
			)}

			<h4>{title}</h4>
		</div>
	);
}
