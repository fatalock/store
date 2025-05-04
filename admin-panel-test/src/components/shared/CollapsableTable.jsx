import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Collapse, Paper, Box
  } from "@mui/material";
  import React from "react";

  import { useState } from "react";
  import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
  import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
  
  function CollapsableTable({ rows, columns, renderDetails, getRowId }) {
    const [openRowId, setOpenRowId] = useState(null);
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((col) => (
                <TableCell key={col.key}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
  
          <TableBody>
            {rows.map((row) => {
              const id = getRowId(row);
              const isOpen = openRowId === id;
  
              return (
                <React.Fragment key={id}>
                  <TableRow>
                    <TableCell>
                      <IconButton size="small" onClick={() => setOpenRowId(isOpen ? null : id)}>
                        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        {row[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
  
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} sx={{ p: 0 }}>
                      <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <Box p={2}>
                          {renderDetails(row)}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  export default CollapsableTable;
  