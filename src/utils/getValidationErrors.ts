import type { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  // biome-ignore lint/complexity/noForEach: <explanation>
  err.inner.forEach(error => {
    validationErrors[error.message] = error.message;
  });

  return validationErrors;
}
