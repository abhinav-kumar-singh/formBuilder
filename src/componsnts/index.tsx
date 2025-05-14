import React from "react";
import { useState } from "react";
import { defaultFormConfig } from "../utils/defaultFormConfig";
import styles from "./comp.module.css";
import JsonEditor from "./json-editor/JsonEditor";
import FormBuilder from "./form-builder/FormBuilder";

const Index = () => {
  const [formConfig, setFormConfig] = useState(defaultFormConfig);
  const [formData, setFormData] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleFormDataChange = (data: any, valid: boolean) => {
    setFormData(data);
    setIsValid(valid);
  };

  const handleJsonChange = (newConfig: any) => {
    try {
      setFormConfig(JSON.parse(newConfig));
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      console.log("Form submitted with data:", formData);
      alert("Form submitted successfully! Check console for data.");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dynamic Form Builder</h1>
        <p>Edit the JSON on the left to customize your form</p>
      </header>

      <div className={styles.content}>
        <div className={styles.editorPanel}>
          <h2>Form Configuration</h2>
          <JsonEditor
            initialValue={JSON.stringify(formConfig, null, 2)}
            onChange={handleJsonChange}
          />
        </div>

        <div className={styles.formPanel}>
          <h2>Form Preview</h2>
          <FormBuilder
            config={formConfig}
            onDataChange={handleFormDataChange}
            onSubmit={handleSubmit}
            isValid={isValid}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
