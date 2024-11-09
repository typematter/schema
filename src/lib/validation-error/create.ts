import { VALIDATION_ERROR_NAME, type ValidationError } from '$types/validation-error.js';

const create: (params: Omit<ValidationError, 'name' | '__validationError'>) => ValidationError = ({
	cause,
	message,
	path,
	stack
}) =>
	({
		name: VALIDATION_ERROR_NAME,
		cause,
		message,
		path,
		stack
	}) as ValidationError;

export default create;
