import {
    Table, TableHead, TableRow, TableCell, TableBody,
    TableContainer, Paper, TablePagination, TableSortLabel
  } from "@mui/material";
  import { useState } from "react";
  
  function ActionableTable({
    columns,
    rows,
    getRowId,
    renderCell,
    renderActions
  }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState(columns[0].key);
    const [order, setOrder] = useState("desc");
  
    const handleSort = (columnKey) => {
      const isAsc = orderBy === columnKey && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(columnKey);
    };
  
    const sortedRows = [...rows].sort((a, b) => {
      const aVal = a[orderBy];
      const bVal = b[orderBy];
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
  
    const paginatedRows = sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  
    return (
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <TableSortLabel
                      active={orderBy === col.key}
                      direction={orderBy === col.key ? order : "asc"}
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="right">İşlemler</TableCell>
              </TableRow>
            </TableHead>
  
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow key={getRowId(row)}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {renderCell(row, col.key)}
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    {renderActions(row)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    );
  }
  
  export default ActionableTable;
  