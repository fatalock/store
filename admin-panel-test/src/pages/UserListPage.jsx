import { useEffect, useState } from "react";
import { Box, Button, Dialog } from "@mui/material";
import UserAddForm from "../components/UserListpage/UserAddForm";
import OrdersModal from "../components/UserListpage/OrdersModal";
import ActionableTable from "../components/shared/ActionableTable";
import { getUsers, deleteUser } from "../api/userApi";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // 🆕 seçili kullanıcı

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      alert("Kullanıcılar alınamadı.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch {
      alert("Silme işlemi başarısız.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Yeni Ekle
        </Button>
      </Box>

      <ActionableTable
        columns={[
          { key: "createdAt", label: "Oluşturulma" },
          { key: "name", label: "Ad" },
          { key: "email", label: "Email" },

        ]}
        rows={users}
        getRowId={(u) => u.id}
        renderCell={(row, key) => {
          if (key === "createdAt") {
            const d = new Date(row.createdAt);
            return isNaN(d) ? "-" : d.toLocaleString("tr-TR");
          }
          return row[key];
        }}
        renderActions={(row) => (
          <>
            <Button size="small" variant="outlined" sx={{ mr: 1 }}>Düzenle</Button>
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={() => handleDelete(row.id)}
            >
              Sil
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ ml: 1 }}
              onClick={() => setSelectedUser(row)} // 🆕 orders modal aç
            >
              Orders
            </Button>
          </>
        )}
      />

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="sm">
        <UserAddForm onClose={() => { setOpenAdd(false); fetchUsers(); }} />
      </Dialog>

      {selectedUser && (
        <OrdersModal
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          userId={selectedUser.id}
          userName={selectedUser.name}
        />
      )}
    </Box>
  );
}

export default UserListPage;
