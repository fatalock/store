import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FormInput({ name, control, label, type = "text" }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth
          margin="normal"
        />
      )}
    />
  );
}

export default FormInput;
