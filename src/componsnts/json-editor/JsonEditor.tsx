import React from "react";
import { useEffect, useState } from "react";
import styles from "./json-editor.module.css";

interface JsonEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    try {
      JSON.parse(newValue);
      setError(null);
      onChange(newValue);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className={styles.editorContainer}>
      <textarea
        className={`${styles.editor} ${error ? styles.error : ""}`}
        value={value}
        onChange={handleChange}
        spellCheck={false}
      />
      {error && (
        <div className={styles.errorMessage}>Invalid JSON: {error}</div>
      )}
    </div>
  );
};

export default JsonEditor;
