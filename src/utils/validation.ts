import { FormField } from "../types";

export const validateField = (value: any, field: FormField): string => {
  if (
    field.required &&
    (value === undefined || value === null || value === "")
  ) {
    return `${field.label} is required`;
  }

  switch (field.type) {
    case "email":
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Please enter a valid email address";
      }
      break;

    case "number":
      if (value !== "" && isNaN(Number(value))) {
        return "Please enter a valid number";
      }

      if (
        value !== "" &&
        field.min !== undefined &&
        Number(value) < field.min
      ) {
        return `Value must be at least ${field.min}`;
      }

      if (
        value !== "" &&
        field.max !== undefined &&
        Number(value) > field.max
      ) {
        return `Value must be at most ${field.max}`;
      }
      break;
  }

  if (field.validators && field.validators.length > 0) {
    for (const validator of field.validators) {
      switch (validator.type) {
        case "minLength":
          if (value && value.length < validator.params) {
            return validator.message;
          }
          break;

        case "maxLength":
          if (value && value.length > validator.params) {
            return validator.message;
          }
          break;

        case "pattern":
          if (value && !new RegExp(validator.params).test(value)) {
            return validator.message;
          }
          break;

        case "custom":
          try {
            const customValidatorFn = new Function(
              "value",
              `return ${validator.params}`
            );
            if (value && !customValidatorFn(value)) {
              return validator.message;
            }
          } catch (error) {
            console.error("Error in custom validator:", error);
          }
          break;
      }
    }
  }

  return "";
};

export const validateForm = (
  formData: Record<string, any>,
  fields: FormField[]
) => {
  const errors: Record<string, string> = {};
  let isValid = true;

  fields.forEach((field) => {
    const fieldValue = formData[field.name];
    const error = validateField(fieldValue, field);

    if (error) {
      errors[field.name] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};
