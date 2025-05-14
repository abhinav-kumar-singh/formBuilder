import { FormConfig } from "../types";

export const defaultFormConfig: FormConfig = {
  title: "Contact Information",
  description: "Please fill out the information below",
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
      validators: [
        {
          type: "minLength",
          params: 2,
          message: "Name must be at least 2 characters long",
        },
      ],
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "your.email@example.com",
      required: true,
      helpText: "We'll never share your email with anyone else",
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter your age",
      min: 18,
      max: 120,
      helpText: "You must be at least 18 years old",
    },
    {
      name: "bio",
      label: "Bio",
      type: "textarea",
      placeholder: "Tell us about yourself",
      rows: 4,
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      placeholder: "Select your role",
      options: [
        { label: "Developer", value: "developer" },
        { label: "Designer", value: "designer" },
        { label: "Product Manager", value: "pm" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "experience",
      label: "Experience Level",
      type: "radio",
      options: [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" },
      ],
      defaultValue: "intermediate",
    },
    {
      name: "subscribe",
      label: "Subscribe to newsletter",
      type: "checkbox",
      defaultValue: true,
    },
  ],
  submitButtonText: "Submit Form",
};
