import { useEffect, useState } from "react";
import { Box, Button, Dialog } from "@mui/material";
import UserAddForm from "../components/UserListpage/UserAddForm";
import ActionableTable from "../components/shared/ActionableTable";
import { getUsers, deleteUser, updateUser } from "../api/userApi";
import OrdersModal from "../components/UserListpage/OrdersModal"
import UserEditModal from "../components/UserListpage/UserEditModal"


function UserListPage() {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // 🆕 seçili kullanıcı
  const [selectedUser2, setSelectedUser2] = useState(null);
  const [editOpen, setEditOpen] = useState(false);


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

  const handleUserUpdate = async (updatedUser) => {
    try {
      await updateUser(selectedUser2.id, updatedUser);
      await fetchUsers(); // Listeyi güncelle
      setEditOpen(false);
      setSelectedUser(null);
    } catch (err) {
      alert("Güncelleme başarısız.");
      console.error(err);
      console.log(err.response?.data);
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
          { key: "passwordHash" , label: "Şifre"}

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
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setSelectedUser2(row); // `user` burada o satırdaki kullanıcı
                setEditOpen(true);
              }}
            >
              Düzenle
            </Button>

            <Button
              size="small"
              color="error"
              variant="outlined"
              sx={{ ml: 1 }}
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
      <UserEditModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedUser2(null);
        }}
        user={selectedUser2}
        onSave={handleUserUpdate}
      />

    </Box>
  );
}

export default UserListPage;
