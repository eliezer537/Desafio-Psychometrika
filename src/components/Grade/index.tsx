import historyIconImg from '../../assets/history-icon.svg';
import editIconImg from '../../assets/edit-icon.svg';
import changeIconImg from '../../assets/change-icon.svg';
import moveIconImg from '../../assets/move-icon.svg';
import eyeIconImg from '../../assets/eye-icon.svg';
import viewIconImg from '../../assets/view-icon.svg';

import './styles.scss';
import { useState } from 'react';

type GradeProps = {
	isAdmin?: boolean;
	grades?: SchoolTypes;
};

type SchoolTypes = Array<{
	id: string;
	gradleName: string;
	fronts: {
		id: string;
		frontName: string;
		chapters: {
			title: string;
			url: string;
		}[];
	}[];
}>;

export function Grade(props: GradeProps) {
	const [activeInput, setActiveInput] = useState(false);
	const [frontName, setFrontName] = useState('Front A');

	function handleFrontNameChange() {
		setActiveInput(!activeInput);

		//alterar o nome no banco
	}

	return (
		<div className='grade-container'>
			<div className='title'>
				<h2>1 Série</h2>

				{props.isAdmin ? (
					<button>
						<img src={historyIconImg} alt='botão de histórico' />
					</button>
				) : (
					''
				)}
			</div>

			<div className='front-content'>
				{activeInput ? (
					<div className='title'>
						<input
							type='text'
							value={frontName}
							onChange={event => setFrontName(event.target.value)}
						/>
						<img
							src={changeIconImg}
							alt='ícone para alterar o nome da frente'
							onClick={handleFrontNameChange}
						/>
					</div>
				) : (
					<div className='title'>
						<span>{frontName}</span>
						<img
							src={editIconImg}
							alt='ícone para editar'
							onClick={handleFrontNameChange}
						/>
					</div>
				)}

				<div className='chapter'>
					<div className='chapter-info'>
						{props.isAdmin ? (
							<img src={moveIconImg} alt='Ícone para mover o capítulo de posição' />
						) : (
							''
						)}

						<div className='chapter-number'>1</div>
						<span>Conjuntos</span>
					</div>

					<div className='btn-actions'>
						{props.isAdmin ? (
							<button>
								<img src={eyeIconImg} alt='Mostrar/ocultar capitulo' />
							</button>
						) : (
							''
						)}

						<button>
							<img src={viewIconImg} alt='Visualizar capitulo' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
