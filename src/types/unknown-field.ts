declare module '$types/schema-field-map.js' {
	export interface SchemaFieldMap {
		unknown: UnknownField;
	}
}

interface UnknownField {
	type: string;
	description?: string;
}

export type { UnknownField };
