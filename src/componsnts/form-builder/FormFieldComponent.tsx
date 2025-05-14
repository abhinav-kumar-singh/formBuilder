import React from "react";
import { FormField } from "../../types";
import styles from "./form-field-component.module.css";

interface FormFieldComponentProps {
  field: FormField;
  value: any;
  onChange: (name: string, value: any) => void;
  error?: string;
}

const FormFieldComponent: React.FC<FormFieldComponentProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      type,
      checked,
      value: inputValue,
    } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      onChange(name, checked);
    } else {
      onChange(name, inputValue);
    }
  };

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.placeholder || ""}
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            required={field.required}
            min={field.min}
            max={field.max}
          />
        );

      case "textarea":
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            placeholder={field.placeholder || ""}
            className={`${styles.textarea} ${error ? styles.inputError : ""}`}
            required={field.required}
            rows={field.rows || 3}
          />
        );

      case "checkbox":
        return (
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={value || false}
              onChange={handleChange}
              className={styles.checkboxInput}
              required={field.required}
            />
            <label htmlFor={field.name} className={styles.checkboxLabel}>
              {field.label}
            </label>
          </div>
        );

      case "radio":
        return (
          <div className={styles.radioGroup}>
            {field.options?.map((option) => (
              <div key={option.value} className={styles.radioOption}>
                <input
                  type="radio"
                  id={`${field.name}-${option.value}`}
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  className={styles.radioInput}
                  required={field.required}
                />
                <label
                  htmlFor={`${field.name}-${option.value}`}
                  className={styles.radioLabel}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case "select":
        return (
          <select
            id={field.name}
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            className={`${styles.select} ${error ? styles.inputError : ""}`}
            required={field.required}>
            <option value="" disabled>
              {field.placeholder || "Select an option"}
            </option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return <p>Unsupported field type: {field.type}</p>;
    }
  };

  return (
    <div className={styles.fieldContainer}>
      {field.type !== "checkbox" && (
        <label htmlFor={field.name} className={styles.fieldLabel}>
          {field.label}
          {field.required && (
            <span className={styles.requiredIndicator}>*</span>
          )}
        </label>
      )}

      {renderField()}

      {error && <div className={styles.errorMessage}>{error}</div>}

      {field.helpText && (
        <div className={styles.helpText}>{field.helpText}</div>
      )}
    </div>
  );
};

export default FormFieldComponent;
