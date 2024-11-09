interface NumberField {
	readonly type: 'Number';
	readonly min?: number;
	readonly max?: number;
	readonly default?: number;
	readonly __numberField: unique symbol;
}

export type { NumberField };
