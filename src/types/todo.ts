export enum ECategory {
	DEFAULT = 'default',
	PRIVATE = 'private',
}

export type TTodo = {
	done: boolean;
	content: string;
	createdAt: number;
	category: ECategory | null;
};
