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
		isVisible: boolean;
	}[];
}[];

type GradeProps = {
	isAdmin?: boolean;
	fronts: SchoolTypes;
	name: string;
	gradeId: string;
};

type updateChapterStatusTypes = {
	status: boolean;
	frontId: string | undefined;
	chapterId: string | undefined;
};

export function Grade(props: GradeProps) {
	const [activeInput, setActiveInput] = useState('');
	const [frontName, setFrontName] = useState('');
	const { schoolId } = useParams<paramsType>();

	async function ChangeFrontName(frontId: string) {
		await database
			.ref(`schools/${schoolId}/grades/${props.gradeId}/fronts/${frontId}`)
			.update({
				name: frontName,
			});
	}

	async function updateChapterStatus({
		status,
		frontId,
		chapterId,
	}: updateChapterStatusTypes) {
		await database
			.ref(
				`schools/${schoolId}/grades/${props.gradeId}/fronts/${frontId}/chapters/${chapterId}`
			)
			.update({
				isVisible: status,
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
		const justInvisible = props.fronts.map(front => {
			const chapterList = front.chapters.map(chapter => {
				if (!chapter.isVisible) {
					return {
						frontId: front.id,
						chapterId: chapter.id,
					};
				}
			});
			const removeUndefinedFields = chapterList.filter(item => item);

			return removeUndefinedFields;
		});

		justInvisible.map(front =>
			front.map(chapter => {
				updateChapterStatus({
					status: true,
					frontId: chapter?.frontId,
					chapterId: chapter?.chapterId,
				});
			})
		);
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
								function HandleWithShowOrHideChapters(status: boolean) {
									updateChapterStatus({
										status,
										frontId: front.id,
										chapterId: chapter.id,
									});
								}

								if (
									(props.isAdmin && chapter.isVisible === false) ||
									chapter.isVisible
								) {
									return (
										<div
											className={`chapter ${
												props.isAdmin && !chapter.isVisible && 'hide'
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

												{chapter.isVisible ? (
													<div className='chapter-number'>{index + 1}</div>
												) : (
													<div className='chapter-number'></div>
												)}
												<span>{chapter.title}</span>
											</div>

											<div className='btn-actions'>
												{props.isAdmin ? (
													<>
														{!chapter.isVisible ? (
															<button
																title='Mostrar capítulo'
																onClick={() => HandleWithShowOrHideChapters(true)}
															>
																<img src={hideIconImg} alt='Mostrar/ocultar capitulo' />
															</button>
														) : (
															<button
																title='Ocultar capítulo'
																onClick={() => HandleWithShowOrHideChapters(false)}
															>
																<img src={eyeIconImg} alt='Mostrar/ocultar capitulo' />
															</button>
														)}
													</>
												) : (
													''
												)}

												<a href={chapter.url} target='_blank' rel='noreferrer'>
													<button>
														<img src={viewIconImg} alt='Visualizar capitulo' />
													</button>
												</a>
											</div>
										</div>
									);
								} else {
									return '';
								}
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}
