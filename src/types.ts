export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "checkbox"
    | "radio"
    | "select";
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  defaultValue?: any;
  min?: number;
  max?: number;
  rows?: number;
  options?: FormFieldOption[];
  validators?: {
    type: string;
    params?: any;
    message: string;
  }[];
}

export interface FormConfig {
  title?: string;
  description?: string;
  fields: FormField[];
  submitButtonText?: string;
}

export interface FormData {
  [key: string]: any;
}
