// @ts-nocheck
import React from "react";
import { useEffect, useState } from "react";
import { FormConfig, FormField } from "../../types";
import { validateField, validateForm } from "../../utils/validation";
import FormFieldComponent from "./FormFieldComponent";
import styles from "./form-builder.module.css";

interface FormBuilderProps {
  config: FormConfig;
  onDataChange: (data: FormData, isValid: boolean) => void;
  onSubmit: () => void;
  isValid: boolean;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  config,
  onDataChange,
  onSubmit,
  isValid,
}) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialData: FormData = {};
    config.fields.forEach((field: FormField) => {
      if (field.defaultValue !== undefined) {
        initialData[field.name] = field.defaultValue;
      } else {
        switch (field.type) {
          case "checkbox":
            initialData[field.name] = false;
            break;
          case "select":
          case "radio":
            initialData[field.name] =
              field.options && field.options.length > 0
                ? field.options[0].value
                : "";
            break;
          default:
            initialData[field.name] = "";
        }
      }
    });

    setFormData(initialData);

    const { isValid, errors } = validateForm(initialData, config.fields);
    setErrors(errors);
    onDataChange(initialData, isValid);
  }, [config.fields]);

  const handleFieldChange = (name: string, value: any) => {
    const newFormData = { ...formData, [name]: value };

    const error = validateField(
      value,
      config.fields.find((field) => field.name === name)!
    );
    const newErrors = { ...errors, [name]: error };

    setFormData(newFormData);
    setErrors(newErrors);

    const formValid = Object.values(newErrors).every((err) => !err);
    onDataChange(newFormData, formValid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {config.fields.map((field) => (
        <FormFieldComponent
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={handleFieldChange}
          error={errors[field.name]}
        />
      ))}
      <div className={styles.formActions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!isValid}>
          {config.submitButtonText || "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FormBuilder;
