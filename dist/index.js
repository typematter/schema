// src/lib/array-field/is.ts
var is = (field) => field !== void 0 && field !== null && typeof field === "object" && field.type === "Array";
var is_default = is;

// src/types/validation-error.ts
var VALIDATION_ERROR_NAME = "ValidationError";

// src/lib/validation-error/create.ts
var create = ({
  cause,
  message,
  path,
  stack
}) => ({
  name: VALIDATION_ERROR_NAME,
  cause,
  message,
  path,
  stack
});
var create_default = create;

// src/lib/validation-error/is.ts
var is2 = (error) => error !== void 0 && error !== null && typeof error === "object" && error.name === VALIDATION_ERROR_NAME && typeof error.message === "string";
var is_default2 = is2;

// src/lib/validation-error/from-error.ts
var fromError = (error, path = []) => is_default2(error) ? error : create_default({
  cause: error,
  message: error.message,
  path,
  stack: error.stack
});
var from_error_default = fromError;

// src/lib/validation-error/from-string.ts
var fromString = (error, path = []) => create_default({ message: error, path });
var from_string_default = fromString;

// src/lib/validation-error/pipe.ts
var pipe = (...transformers) => (error) => transformers.reduce((acc, transform) => transform(acc), error);
var pipe_default = pipe;

// src/lib/validation-error/with-context.ts
var withContext = (context) => (error) => ({
  ...error,
  message: `${context}: ${error.message}`
});
var with_context_default = withContext;

// src/lib/validation-error/with-path.ts
var withPath = (path) => (error) => ({
  ...error,
  path: [...path, ...error.path]
});
var with_path_default = withPath;

// src/lib/validation-error/index.ts
var validationError = {
  create: create_default,
  fromError: from_error_default,
  fromString: from_string_default,
  is: is_default2,
  pipe: pipe_default,
  withContext: with_context_default,
  withPath: with_path_default
};
var validation_error_default = validationError;

// src/lib/array-field/validate.ts
var { fromString: fromString2, pipe: pipe2, withPath: withPath2 } = validation_error_default;
var validate = (value, field, path = []) => {
  const errors = [];
  const error = pipe2(withPath2(path));
  if (!is_default(field)) {
    return [error(fromString2("Expected array field"))];
  }
  if (!Array.isArray(value)) {
    return [error(fromString2(`Expected array value, got ${typeof value}`))];
  }
  if (field.minItems !== void 0 && value.length < field.minItems) {
    errors.push(error(fromString2(`Array must contain at least ${field.minItems} items`)));
  }
  if (field.maxItems !== void 0 && value.length > field.maxItems) {
    errors.push(error(fromString2(`Array must contain at most ${field.maxItems} items`, path)));
  }
  value.forEach((item, index) => {
    errors.push(...schemaField.validate(item, field.items, [...path, index.toString()]));
  });
  return errors;
};
var validate_default = validate;

// src/lib/array-field/valid.ts
var valid = (value, field) => validate_default(value, field).length === 0;
var valid_default = valid;

// src/lib/array-field/index.ts
var arrayField = {
  is: is_default,
  valid: valid_default,
  validate: validate_default
};

// src/lib/boolean-field/is.ts
var is3 = (field) => field !== void 0 && field !== null && typeof field === "object" && field.type === "Boolean";
var is_default3 = is3;

// src/lib/boolean-field/validate.ts
var { fromString: fromString3, pipe: pipe3, withPath: withPath3 } = validation_error_default;
var validate2 = (value, field, path = []) => {
  const errors = [];
  const error = pipe3(withPath3(path));
  if (!is_default3(field)) {
    return [error(fromString3("Expected boolean field"))];
  }
  if (typeof value !== "boolean") {
    return [error(fromString3(`Expected boolean value, got ${typeof value}`))];
  }
  return errors;
};
var validate_default2 = validate2;

// src/lib/boolean-field/valid.ts
var valid2 = (value, field) => validate_default2(value, field).length === 0;
var valid_default2 = valid2;

// src/lib/boolean-field/index.ts
var booleanField = {
  is: is_default3,
  valid: valid_default2,
  validate: validate_default2
};

// src/lib/date-field/is.ts
var is4 = (field) => field !== void 0 && field !== null && typeof field === "object" && field.type === "Date";
var is_default4 = is4;

// src/lib/date-field/date-format/iso8601.ts
var ISO8601_FORMATS = {
  CALENDAR: /^(\d{4})-([01]\d)-([0-3]\d)(?:T([012]\d):([0-5]\d):([0-5]\d)(?:\.(\d+))?(Z|([+-])([01]\d):([0-5]\d))?)?$/,
  ORDINAL: /^(\d{4})-(\d{3})$/,
  WEEK: /^(\d{4})-W([0-5]\d)(?:-([1-7]))?$/
};
var parseWeekDate = (year, week, day = 1) => {
  const jan4th = new Date(year, 0, 4);
  const startOfWeek1 = new Date(jan4th);
  startOfWeek1.setDate(jan4th.getDate() - jan4th.getDay() + 1);
  const targetDate = new Date(startOfWeek1);
  targetDate.setDate(startOfWeek1.getDate() + (week - 1) * 7 + (day - 1));
  if (targetDate.getFullYear() !== year) {
    throw new Error("Invalid week date");
  }
  return targetDate;
};
var parseOrdinalDate = (year, ordinalDay) => {
  const date = new Date(year, 0, 1);
  date.setDate(ordinalDay);
  if (date.getFullYear() !== year) {
    throw new Error("Invalid ordinal date");
  }
  return date;
};
var parseDate = (dateString) => {
  const dateMatch = dateString.match(ISO8601_FORMATS.CALENDAR);
  if (dateMatch) {
    const [, y, m, d, h, min, s, ms, tz, o, hoff, minoff] = dateMatch;
    const year = Number(y);
    const month = Number(m);
    const day = Number(d);
    const hour = h ? Number(h) : 0;
    const minute = min ? Number(min) : 0;
    const second = s ? Number(s) : 0;
    const millisecond = ms ? Number(ms) : 0;
    const hourOffset = hoff ? Number(`${o}${hoff}`) : 0;
    const minuteOffset = minoff ? Number(`${o}${minoff}`) : 0;
    const date = new Date(dateString);
    if (date instanceof Date === false) {
      throw new Error("Invalid calendar date");
    } else if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day || date.getHours() !== hour - hourOffset || date.getMinutes() !== minute - minuteOffset || date.getSeconds() !== second || date.getMilliseconds() !== millisecond) {
      throw new Error("Invalid calendar date");
    } else {
      return date;
    }
  }
  const weekMatch = dateString.match(ISO8601_FORMATS.WEEK);
  if (weekMatch) {
    const [, y, w, d] = weekMatch;
    const year = Number(y);
    const week = Number(w);
    const day = d ? Number(d) : 1;
    if (week < 1 || week > 53) {
      throw new Error("Invalid week number");
    }
    if (week === 53) {
      const dec31 = new Date(year, 11, 31);
      const lastWeek = Math.floor((dec31.getTime() - new Date(year, 0, 1).getTime()) / (864e5 * 7)) + 1;
      if (lastWeek !== 53) {
        throw new Error("Invalid week number");
      }
    }
    return parseWeekDate(year, week, day);
  }
  const ordinalMatch = dateString.match(ISO8601_FORMATS.ORDINAL);
  if (ordinalMatch) {
    const [, y, od] = ordinalMatch;
    const year = Number(y);
    const ordinalDay = Number(od);
    const isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    const maxDays = isLeapYear ? 366 : 365;
    if (ordinalDay < 1 || ordinalDay > maxDays) {
      throw new Error("Invalid ordinal day number");
    }
    return parseOrdinalDate(year, ordinalDay);
  }
  throw new Error("Invalid ISO-8601 date format");
};
var isValidDate = (date) => {
  try {
    return parseDate(date) instanceof Date;
  } catch {
    return false;
  }
};

// src/lib/date-field/validate.ts
var { fromString: fromString4, pipe: pipe4, withPath: withPath4 } = validation_error_default;
var validate3 = (value, field, path = []) => {
  const errors = [];
  const error = pipe4(withPath4(path));
  if (!is_default4(field)) {
    return [error(fromString4("Expected date field"))];
  }
  if (typeof value !== "string") {
    return [error(fromString4(`Expected date value, got ${typeof value}`))];
  }
  if (field.format === "ISO-8601" && isValidDate(value) === false) {
    errors.push(error(fromString4("Invalid date format")));
  }
  return errors;
};
var validate_default3 = validate3;

// src/lib/date-field/valid.ts
var valid3 = (value, field) => validate_default3(value, field).length === 0;
var valid_default3 = valid3;

// src/lib/date-field/index.ts
var dateField = {
  is: is_default4,
  valid: valid_default3,
  validate: validate_default3
};

// src/lib/number-field/is.ts
var is5 = (field) => field !== void 0 && field !== null && typeof field === "object" && field.type === "Number";
var is_default5 = is5;

// src/lib/number-field/validate.ts
var { fromString: fromString5, pipe: pipe5, withPath: withPath5 } = validation_error_default;
var validate4 = (value, field, path = []) => {
  const errors = [];
  const error = pipe5(withPath5(path));
  if (!is_default5(field)) {
    return [error(fromString5("Expected number field"))];
  }
  if (typeof value !== "number") {
    return [error(fromString5(`Expected number value, got ${typeof value}`))];
  }
  if (field.min !== void 0 && value < field.min) {
    errors.push(error(fromString5(`Value must be >= ${field.min}`)));
  }
  if (field.max !== void 0 && value > field.max) {
    errors.push(error(fromString5(`Value must be <= ${field.max}`)));
  }
  return errors;
};
var validate_default4 = validate4;

// src/lib/number-field/valid.ts
var valid4 = (value, field) => validate_default4(value, field).length === 0;
var valid_default4 = valid4;

// src/lib/number-field/index.ts
var numberField = {
  is: is_default5,
  valid: valid_default4,
  validate: validate_default4
};

// src/lib/object-field/is.ts
var is6 = (field) => field !== void 0 && field !== null && typeof field === "object" && field.type === "Object";
var is_default6 = is6;

// src/lib/object-field/validate.ts
var { fromString: fromString6, pipe: pipe6, withPath: withPath6 } = validation_error_default;
var validate5 = (value, field, path = []) => {
  const errors = [];
  const error = pipe6(withPath6(path));
  if (!is_default6(field)) {
    return [error(fromString6("Expected object field"))];
  }
  if (value === void 0 || value === null || typeof value !== "object") {
    return [error(fromString6(`Expected object value, got ${typeof value}`))];
  }
  field.required?.forEach((requiredProp) => {
    if (!(requiredProp in value)) {
      errors.push(error(fromString6("Required property missing", [...path, requiredProp])));
    }
  });
  if (field.properties) {
    Object.entries(field.properties).forEach(([key, propSchema]) => {
      if (key in value) {
        errors.push(
          ...schemaField.validate(value[key], propSchema, [
            ...path,
            key
          ])
        );
      }
    });
  }
  return errors;
};
var validate_default5 = validate5;

// src/lib/object-field/valid.ts
var valid5 = (value, field) => validate_default5(value, field).length === 0;
var valid_default5 = valid5;

// src/lib/object-field/index.ts
var objectField = {
  is: is_default6,
  valid: valid_default5,
  validate: validate_default5
};

// src/lib/string-field/is.ts
var is7 = (field) => field !== void 0 && field !== null && typeof field === "object" && field.type === "String";
var is_default7 = is7;

// src/lib/string-field/validate.ts
var { fromString: fromString7, pipe: pipe7, withPath: withPath7 } = validation_error_default;
var validate6 = (value, field, path = []) => {
  const errors = [];
  const error = pipe7(withPath7(path));
  if (!is_default7(field)) {
    return [error(fromString7("Expected string field"))];
  }
  if (typeof value !== "string") {
    return [error(fromString7(`Expected string value, got ${typeof value}`))];
  }
  if (field.enum && !field.enum.includes(value)) {
    errors.push(error(fromString7(`Value must be one of: ${field.enum.join(", ")}`)));
  }
  if (field.pattern && !new RegExp(field.pattern).test(value)) {
    errors.push(error(fromString7(`Value does not match pattern: ${field.pattern}`)));
  }
  return errors;
};
var validate_default6 = validate6;

// src/lib/string-field/valid.ts
var valid6 = (value, field) => validate_default6(value, field).length === 0;
var valid_default6 = valid6;

// src/lib/string-field/index.ts
var stringField = {
  is: is_default7,
  valid: valid_default6,
  validate: validate_default6
};

// src/lib/schema-field/validate.ts
var { fromString: fromString8, pipe: pipe8, withPath: withPath8 } = validation_error_default;
var validate7 = (value, field, path = []) => {
  const error = pipe8(withPath8(path));
  if (arrayField.is(field)) {
    return arrayField.validate(value, field, path);
  } else if (booleanField.is(field)) {
    return booleanField.validate(value, field, path);
  } else if (dateField.is(field)) {
    return dateField.validate(value, field, path);
  } else if (numberField.is(field)) {
    return numberField.validate(value, field, path);
  } else if (objectField.is(field)) {
    return objectField.validate(value, field, path);
  } else if (stringField.is(field)) {
    return stringField.validate(value, field, path);
  } else {
    return [error(fromString8(`No validator found for field: ${JSON.stringify(field)}`))];
  }
};
var validate_default7 = validate7;

// src/lib/schema-field/valid.ts
var valid7 = (value, field) => validate_default7(value, field).length === 0;
var valid_default7 = valid7;

// src/lib/schema-field/index.ts
var schemaField = {
  valid: valid_default7,
  validate: validate_default7
};

export { schemaField as default };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map