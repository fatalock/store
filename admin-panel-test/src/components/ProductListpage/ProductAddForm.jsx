import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../shared/FormInput";
import { createProduct } from "../../api/productApi";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";



function ProductAddForm({ onClose, categories = [] }) {

    const { control, handleSubmit, reset, setValue } = useForm();
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const onSubmit = async (data) => {
    try {
      await createProduct(data);
      alert("Ürün başarıyla eklendi");
      reset();
      onClose();
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
        Yeni Ürün Ekle
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="name" control={control} label="Ürün Adı" />
        <FormInput name="description" control={control} label="Açıklama" />
        <FormInput name="price" control={control} label="Fiyat" type="number" />
        <FormInput name="stockQuantity" control={control} label="Stok Miktarı" type="number" />
        <FormInput name="imageUrl" control={control} label="Görsel URL" />
        <TextField
            select
            fullWidth
            label="Kategori"
            value={selectedCategoryId}
            onChange={(e) => 
                {
                setValue("categoryId", e.target.value);
                setSelectedCategoryId(e.target.value)
            }}
            margin="normal"
            >
            {categories
                .filter((cat) => cat.parentCategoryId !== null)
                .map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                </MenuItem>
                ))}
            </TextField>


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

export default ProductAddForm;
