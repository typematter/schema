interface StringField {
	readonly type: 'String';
	readonly pattern?: string;
	readonly enum?: readonly string[];
	readonly default?: string;
	readonly __stringField: unique symbol;
}

export type { StringField };
