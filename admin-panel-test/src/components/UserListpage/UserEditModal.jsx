import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box
  } from "@mui/material";
  import { useEffect, useState } from "react";
  
  function UserEditModal({ open, onClose, user, onSave }) {
    const [form, setForm] = useState({ name: "", email: "" , passwordHash: ""});
  
    useEffect(() => {
      if (user) {
        setForm({
          name: user.name,
          email: user.email,
          passwordHash: user.passwordHash
        });
      }
    }, [user]);
  
    const handleChange = (e) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleSubmit = () => {
      onSave(form);
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Kullanıcıyı Düzenle</DialogTitle>
        <DialogContent>
          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            <TextField
              name="name"
              label="İsim"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="email"
              label="E-posta"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="passwordHash"
              label="Şifre"
              value={form.passwordHash}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default UserEditModal;
  