import type { Validator } from '$types/validator.js';
import registry from './registry.js';

const register = (type: string, validator: Validator) => {
	registry[type] = validator;
};

export default register;
