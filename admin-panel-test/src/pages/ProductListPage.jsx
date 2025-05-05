import { useEffect, useState } from "react";
import { Box, Button, Dialog } from "@mui/material";
import { deleteProduct, getAllProducts } from "../api/productApi";
import ActionableTable from "../components/shared/ActionableTable";
import ProductAddForm from "../components/ProductListpage/ProductAddForm";
import ProductEditModal from "../components/ProductListpage/ProductEditModal";
import { getAllCategories } from "../api/categoryApi";


function ProductListPage() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const getCategoryNameById = (id) => {
    return categories.find(c => c.id === id)?.name || "-";
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch {
      alert("Silme başarısız");
    }
  };


  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Yeni Ekle
        </Button>
      </Box>
      <ActionableTable
        columns={[
          { key: "name", label: "Ad" },
          { key: "price", label: "Fiyat" },
          { key: "stockQuantity", label: "Stok" },
          { key: "categoryId", label: "Kategori" }
        ]}
        rows={products}
        getRowId={(p) => p.id}
        renderCell={(row, key) => {
          if (key === "categoryId") return getCategoryNameById(row.categoryId);
          if (key === "price") return `${row.price} ₺`;
          return row[key];
        }}
        renderActions={(row) => (
          <>
            <Button size="small" variant="outlined" onClick={() => setEditProduct(row)}>Düzenle</Button>
            <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(row.id)}>Sil</Button>
          </>
        )}
      />
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="sm">
      <ProductAddForm
        onClose={() => {
          setOpenAdd(false);
          fetchProducts();
        }}
        categories={categories}
      />
      </Dialog>

      {editProduct && (
        <ProductEditModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={() => {
            setEditProduct(null);
            fetchProducts();
          }}
        />
      )}
    </Box>

  );
}

export default ProductListPage;
