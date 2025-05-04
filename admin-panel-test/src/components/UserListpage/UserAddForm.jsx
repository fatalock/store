import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../shared/FormInput";
import { createUser } from "../../api/userApi";

function UserAddForm({ onClose }) {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await createUser(data);
      alert("Kullanıcı başarıyla eklendi");
      reset();
      onClose(); // modalı kapat + listeyi güncelle
    } catch (error) {
      const err = error.response?.data;
      if (Array.isArray(err)) {
        alert("Hatalar:\n" + err.join("\n"));
      } else if (err?.errors) {
        const messages = [];
        for (const key in err.errors) {
          messages.push(...err.errors[key]);
        }
        alert("Hatalar:\n" + messages.join("\n"));
      } else {
        alert("Kayıt başarısız: " + JSON.stringify(err));
      }
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>
        Yeni Kullanıcı Ekle
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="name" control={control} label="İsim" />
        <FormInput name="email" control={control} label="Email" />
        <FormInput name="passwordHash" control={control} label="Şifre" type="password" />
        <Button type="submit" variant="contained" fullWidth>
          Kaydet
        </Button>
        <Button onClick={onClose} fullWidth sx={{ mt: 1 }}>
          İptal
        </Button>
      </form>
    </Box>
  );
}

export default UserAddForm;
