declare const VALIDATION_ERROR_NAME = "ValidationError";
interface ValidationError extends Error {
    readonly name: typeof VALIDATION_ERROR_NAME;
    readonly path: readonly string[];
    readonly __validationError: unique symbol;
}

declare const schemaField: {
    readonly valid: (value: unknown, field: unknown) => boolean;
    readonly validate: (value: unknown, field: unknown, path?: string[]) => ValidationError[];
};

export { type ValidationError, schemaField as default };
