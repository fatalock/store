import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { createUser } from "../api/userApi";

function UserAddPage() {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
          name: '',
          email: '',
          passwordHash: '',
        },
      });
      

    const onSubmit = async (data) => {
        try {
            console.log(data)
            await createUser(data);
            alert("Kullanıcı eklendi");
            reset();
        } catch (error) {
            alert("Kayıt başarısız: " + error.response?.data || error.message);
            reset();
        }
    };

    return (
        <Box maxWidth={400}>
            <Typography variant="h5" mb={2}>Yeni Kullanıcı Ekle</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput name="name" control={control} label="İsim" />
                <FormInput name="email" control={control} label="Email" />
                <FormInput name="passwordHash" control={control} label="Şifre" type="password" />
                <Button type="submit" variant="contained" fullWidth>Kullanıcı Ekle</Button>
            </form>
        </Box>
    );
}

export default UserAddPage;
