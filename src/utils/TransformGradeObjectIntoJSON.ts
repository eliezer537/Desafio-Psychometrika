type FirebaseGradeDataTypes = Record<
	string,
	{
		name: string;
		fronts: {
			name: string;
			chapters: {
				title: string;
				url: string;
			}[];
		}[];
	}
>;

export function TransformGradeObjectIntoJSON(db: any) {
	const firebaseData: FirebaseGradeDataTypes = db.grades ?? {};
	const parsedData = Object.entries(firebaseData);

	const mapData = parsedData.map(([key, value]) => {
		return {
			id: key,
			gradeName: value.name,
			fronts: Object.entries(value.fronts).map(([key, value]) => {
				return {
					id: key,
					frontName: value.name,
					chapters: Object.entries(value.chapters).map(([key, value]) => {
						return {
							id: key,
							title: value.title,
							url: value.url,
						};
					}),
				};
			}),
		};
	});

	return mapData;
}
