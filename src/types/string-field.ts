interface StringField {
	readonly type: 'String';
	readonly pattern?: string;
	readonly enum?: readonly string[];
	readonly default?: string;
}

export type { StringField };
