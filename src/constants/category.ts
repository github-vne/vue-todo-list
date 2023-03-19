import {ECategory} from '../types/todo';

export const CATEGORY_TITLE: Record<ECategory, string> = {
	[ECategory.DEFAULT]: 'Default',
	[ECategory.PRIVATE]: 'Private',
};

export const CATEGORY_LIST = Object.values(ECategory).map((el) => el);
