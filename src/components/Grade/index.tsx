import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../services/firebase';

import historyIconImg from '../../assets/history-icon.svg';
import editIconImg from '../../assets/edit-icon.svg';
import changeIconImg from '../../assets/change-icon.svg';
import moveIconImg from '../../assets/move-icon.svg';
import eyeIconImg from '../../assets/eye-icon.svg';
import viewIconImg from '../../assets/view-icon.svg';

import './styles.scss';

type paramsType = {
	schoolId: string;
};

type SchoolTypes = {
	id: string;
	frontName: string;
	chapters: {
		title: string;
		url: string;
	}[];
}[];

type GradeProps = {
	isAdmin?: boolean;
	fronts: SchoolTypes;
	name: string;
	gradeId: string;
};

export function Grade(props: GradeProps) {
	const [activeInput, setActiveInput] = useState('');
	const [frontName, setFrontName] = useState('');

	const { schoolId } = useParams<paramsType>();

	// useEffect(() => {
	// 	console.log(activeInput);
	// }, [activeInput]);

	function handleOpenFrontName(obj: { id: string; name: string }) {
		console.log(obj.id);
		console.log(activeInput);

		setActiveInput(obj.id);

		setFrontName(obj.name);
		console.log();
	}

	async function handleCloseFrontName(obj: { id: string; name: string }) {
		setActiveInput('');
		setFrontName(obj.name);
		console.log(frontName);
		// console.log('abriu');

		//alterar o nome no banco

		await database
			.ref(`schools/${schoolId}/grades/${props.gradeId}/fronts/${obj.id}`)
			.update({
				name: frontName,
			});
	}

	return (
		<div className='grade-container'>
			<div className='title'>
				<h2>{props.name}</h2>

				{props.isAdmin ? (
					<button>
						<img src={historyIconImg} alt='botão de histórico' />
					</button>
				) : (
					''
				)}
			</div>

			<div className='front-content'>
				{props.fronts?.map((front, index) => {
					return (
						<div className='each-front' key={front.id}>
							{activeInput === front.id ? (
								<div className='title'>
									<input
										type='text'
										value={frontName}
										onChange={event => setFrontName(event.target.value)}
									/>
									<img
										src={changeIconImg}
										alt='ícone para alterar o nome da frente'
										title='fdf'
										onClick={() =>
											handleCloseFrontName({ id: front.id, name: front.frontName })
										}
									/>
								</div>
							) : (
								<div className='title'>
									<span>{activeInput === front.id ? frontName : front.frontName}</span>
									<img
										src={editIconImg}
										alt='ícone para editar'
										title='aqui abre'
										onClick={() =>
											handleOpenFrontName({ id: front.id, name: front.frontName })
										}
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

									<div className='chapter-number'>{index + 1}</div>
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
					);
				})}
			</div>
		</div>
	);
}
