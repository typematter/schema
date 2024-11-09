interface BooleanField {
	readonly type: 'Boolean';
	readonly default?: boolean;
	readonly __booleanField: unique symbol;
}

export type { BooleanField };
