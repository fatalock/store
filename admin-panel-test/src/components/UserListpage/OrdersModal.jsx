import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  CircularProgress,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";
import { useEffect, useState } from "react";
import { getOrdersByUser, deleteOrder } from "../../api/orderApi";
import CollapsableTable from "../shared/CollapsableTable";
import CreateOrderModal from "./CreateOrderModal";
import { useCallback } from "react";

function OrdersModal({ open, onClose, userId, userName }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);



  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getOrdersByUser(userId);
      setOrders(data);
    } catch (err) {
      console.error("Siparişler alınamadı:", err);
    }
    setLoading(false);
  }, [userId]);
  
  useEffect(() => {
    if (open) fetchOrders();
  }, [open, fetchOrders]);
  

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>{userName} kullanıcısının siparişleri</DialogTitle>

        <Box display="flex" justifyContent="flex-end" mt={1} mr={3}>
          <Button variant="contained" onClick={() => setShowCreate(true)}>
            Yeni Sipariş
          </Button>
        </Box>

        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress />
            </Box>
          ) : orders.length === 0 ? (
            <Typography>Kullanıcının siparişi bulunmuyor.</Typography>
          ) : (
            <Box mt={2}>
              <CollapsableTable
                rows={orders}
                columns={[
                  { key: "id", label: "Sipariş No" },
                  { key: "createdAt", label: "Tarih" },
                  { key: "totalAmount", label: "Tutar (₺)" }
                ]}
                getRowId={(o) => o.id}
                renderActions={(order) => (
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={async () => {
                      const ok = window.confirm("Bu siparişi silmek istiyor musunuz?");
                      if (!ok) return;
                      try {
                        await deleteOrder(order.id);
                        fetchOrders();
                      } catch {
                        alert("Silme işlemi başarısız.");
                      }
                    }}
                  >
                    Sil
                  </Button>
                )}
                renderCell={(row, key) => {
                  if (key === "createdAt") {
                    const d = new Date(row[key]);
                    return isNaN(d) ? "-" : d.toLocaleString("tr-TR");
                  }
                  if (key === "totalAmount") {
                    return `${row[key].toFixed(2)} ₺`;
                  }
                  return row[key];
                }}
                renderDetails={(order) => (
                  <Table size="small">
                    <TableBody>
                      {order.orderItems?.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.quantity} adet</TableCell>
                          <TableCell>{item.unitPrice.toFixed(2)} ₺</TableCell>
                          <TableCell>
                            {(item.quantity * item.unitPrice).toFixed(2)} ₺
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <CreateOrderModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        userId={userId}
        onCreated={fetchOrders}
      />
    </>
  );
}

export default OrdersModal;
