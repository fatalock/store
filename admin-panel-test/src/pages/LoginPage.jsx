import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = (data) => {
    dispatch(loginSuccess(data));   // Kullanıcı bilgisini Redux'a kaydet
    navigate("/dashboard");         // Başarılı giriş sonrası Dashboard'a yönlendir
  };
  

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" mb={4}>
        Admin Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="email" control={control} label="Email" />
        <FormInput name="password" control={control} label="Password" type="password" />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;
