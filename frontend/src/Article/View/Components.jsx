import React from "react";

export const TitleForm = ({ value = "", onChange, disabled }) => (
  <label>
    Title:
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
    />
  </label>
);

export const BodyForm = ({ value = "", onChange, disabled }) => (
  <label>
    Body:
    <textarea
      value={value}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
    />
  </label>
);
