interface DateField {
	readonly type: 'Date';
	readonly format?: 'ISO-8601';
	readonly default?: string;
	readonly __dateField: unique symbol;
}

export type { DateField };
