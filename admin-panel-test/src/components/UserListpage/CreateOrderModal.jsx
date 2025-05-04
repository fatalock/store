import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Box, MenuItem, TextField, Typography, IconButton
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getAllProducts } from "../../api/productApi";
import { createOrder } from "../../api/orderApi";

function CreateOrderModal({ open, onClose, userId, onCreated }) {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (open) {
      fetchProducts();
      resetForm();
    }
  }, [open]);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const resetForm = () => {
    setSelectedProductId("");
    setQuantity(1);
    setOrderItems([]);
  };

  const handleAdd = () => {
    const product = products.find(p => p.id === selectedProductId);
    if (!product || quantity <= 0) return;

    const alreadyExists = orderItems.find(item => item.productId === selectedProductId);
    if (alreadyExists) {
      alert("Bu ürün zaten eklendi.");
      return;
    }

    setOrderItems(prev => [
      ...prev,
      {
        productId: product.id,
        productName: product.name,
        quantity,
        unitPrice: product.price
      }
    ]);

    setSelectedProductId("");
    setQuantity(1);
  };

  const handleRemove = (productId) => {
    setOrderItems(prev => prev.filter(item => item.productId !== productId));
  };

  const handleSubmit = async () => {
    if (orderItems.length === 0) {
      alert("En az bir ürün eklemelisiniz.");
      return;
    }

    const orderData = {
      userId,
      orderItems: orderItems.map(({ productId, quantity }) => ({ productId, quantity }))
    };
    console.log(orderData);
    try {
      await createOrder(orderData);
      onCreated();
      onClose();
    } catch (err) {
      let msg = "Sipariş oluşturulamadı.";
    
      const data = err.response?.data;
      if (Array.isArray(data)) {
        msg = data[0];
      } else if (typeof data === "string") {
        msg = data;
      }
    
      alert(msg);
      console.error(err);
    }
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Yeni Sipariş Oluştur</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={2} mt={2}>
          <TextField
            select
            label="Ürün"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            fullWidth
          >
            {products.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
            ))}
          </TextField>

          <TextField
            label="Birim Fiyat"
            value={
              selectedProductId
                ? selectedProduct?.price.toFixed(2)
                : ""
            }
            disabled // kullanıcı değiştiremesin
            fullWidth
          />

          <TextField
            label="Stok Miktarı"
            value={
              selectedProductId
                ? selectedProduct?.stockQuantity
                : ""
            }
            disabled // kullanıcı değiştiremesin
            sx={{ width: 200 }}
          />

          <TextField
            label="Adet"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            slotProps={{
              input: { min: 1 }
            }}
            sx={{ width: 200 }}
          />

          <Button onClick={handleAdd} variant="contained">Ekle</Button>
        </Box>

        {orderItems.length > 0 && (
          <Box mt={3}>
            <Typography variant="subtitle1">Sipariş İçeriği:</Typography>
            {orderItems.map((item) => (
              <Box key={item.productId} display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <span>{item.productName} — {item.quantity} adet × {item.unitPrice.toFixed(2)} ₺ — Total {(item.quantity * item.unitPrice).toFixed(2)} ₺</span>
                <IconButton size="small" onClick={() => handleRemove(item.productId)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            <Typography variant="subtitle1" mt={2}>
              Grand Total:{" "}
              {orderItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2)} ₺
            </Typography>

          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={orderItems.length === 0}
        >
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateOrderModal;
