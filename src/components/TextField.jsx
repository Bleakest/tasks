import React from "react";
import styles from "./Form.module.css";

const TextField = ({ ...rest }) => {
  return (
    <div>
      <input {...rest} />
    </div>
  );
};

export default TextField;
