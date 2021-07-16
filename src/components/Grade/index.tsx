import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../services/firebase';

import historyIconImg from '../../assets/history-icon.svg';
import editIconImg from '../../assets/edit-icon.svg';
import changeIconImg from '../../assets/change-icon.svg';
import moveIconImg from '../../assets/move-icon.svg';
import eyeIconImg from '../../assets/eye-icon.svg';
import viewIconImg from '../../assets/view-icon.svg';
import hideIconImg from '../../assets/hide-icon.svg';

import './styles.scss';

type paramsType = {
	schoolId: string;
};

type SchoolTypes = {
	id: string;
	frontName: string;
	chapters: {
		id: string;
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
	const [selectedChapter, setSelectedChapter] = useState([] as string[]);

	const { schoolId } = useParams<paramsType>();

	async function ChangeFrontName(frontId: string) {
		await database
			.ref(`schools/${schoolId}/grades/${props.gradeId}/fronts/${frontId}`)
			.update({
				name: frontName,
			});
	}

	function handleOpenFrontName(obj: { id: string; name: string }) {
		setActiveInput(obj.id);
		setFrontName(obj.name);
	}

	function handleCloseFrontName(obj: { id: string; name: string }) {
		setActiveInput('');
		setFrontName(obj.name);

		ChangeFrontName(obj.id);
	}

	function handleWithResetDefaults() {
		while (selectedChapter.length) {
			selectedChapter.pop();
		}
		setSelectedChapter([...selectedChapter]);
	}

	return (
		<div className='grade-container'>
			<div className='title'>
				<h2>{props.name}</h2>

				{props.isAdmin ? (
					<button onClick={handleWithResetDefaults}>
						<img src={historyIconImg} alt='botão de reset' />
					</button>
				) : (
					''
				)}
			</div>

			<div className='front-content'>
				{props.fronts?.map(front => {
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
										title='Alterar nome'
										onClick={() =>
											handleCloseFrontName({ id: front.id, name: front.frontName })
										}
									/>
								</div>
							) : (
								<div className='title'>
									<span>{front.frontName}</span>
									<img
										src={editIconImg}
										alt='ícone para editar'
										title='Editar nome'
										onClick={() =>
											handleOpenFrontName({ id: front.id, name: front.frontName })
										}
									/>
								</div>
							)}

							{front.chapters.map((chapter, index) => {
								function handleWithShowChapters(id: string) {
									selectedChapter.splice(selectedChapter.indexOf(id), 1);
									setSelectedChapter([...selectedChapter]);
								}

								function handleWithHideChapters(id: string) {
									setSelectedChapter([...selectedChapter, id]);
								}

								return (
									<div
										className={`chapter ${
											selectedChapter.includes(chapter.id) ? 'hide' : ''
										}`}
										key={chapter.url}
									>
										<div className='chapter-info'>
											{props.isAdmin ? (
												<img
													src={moveIconImg}
													alt='Ícone para mover o capítulo de posição'
												/>
											) : (
												''
											)}

											<div className='chapter-number'>{index + 1}</div>
											<span>{chapter.title}</span>
										</div>

										<div className='btn-actions'>
											{props.isAdmin ? (
												<>
													{selectedChapter.includes(chapter.id) ? (
														<button
															title='Mostrar capítulo'
															onClick={() => {
																handleWithShowChapters(chapter.id);
															}}
														>
															<img src={hideIconImg} alt='Mostrar/ocultar capitulo' />
														</button>
													) : (
														<button
															title='Ocultar capítulo'
															onClick={() => handleWithHideChapters(chapter.id)}
														>
															<img src={eyeIconImg} alt='Mostrar/ocultar capitulo' />
														</button>
													)}
												</>
											) : (
												''
											)}

											<button>
												<img src={viewIconImg} alt='Visualizar capitulo' />
											</button>
										</div>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}
