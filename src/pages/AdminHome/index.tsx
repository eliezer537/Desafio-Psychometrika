import { useState, useEffect } from 'react';
import { database } from '../../services/firebase';
import { useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';
import { Grade } from '../../components/Grade';

import { TransformGradeObjectIntoJSON } from '../../utils/TransformGradeObjectIntoJSON';

import './styles.scss';

type paramsType = {
	schoolId: string;
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

export function AdminHome() {
	const { schoolId } = useParams<paramsType>();
	const [schoolName, setSchoolName] = useState('');
	const [gradeArray, setGradeArray] = useState<SchoolTypes>();

	useEffect(() => {
		const schoolRef = database.ref(`schools/${schoolId}`);

		schoolRef.once('value', school => {
			const databaseSchool = school.val();
			setSchoolName(school.val().name);

			TransformGradeObjectIntoJSON(databaseSchool);

			setGradeArray(TransformGradeObjectIntoJSON(databaseSchool));
		});
	}, [schoolId]);

	return (
		<div className='admin-container'>
			<Header initialLetter='A' />
			<SubHeader title={`${schoolName}`} />
			<main>
				{gradeArray?.map(gradle => (
					<Grade isAdmin key={gradle.id} grades={gradeArray} />
				))}
			</main>
		</div>
	);
}
