import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



const Order = ({ location, user }) => {
  const { pathname } = location;
  const [order, setOrder] = useState([]);
  const [rows, setrows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: "Nom", label: "Nom des Produits", minWidth: 170 },
    {
      id: "Prix",
      label: "Prix",
      minWidth: 170,
      align: "right",
    },
    {
      id: "Date",
      label: "Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "Etat",
      label: "Etat",
      minWidth: 170,
      align: "right",
    },
  ];
  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = () => {
    axios
      .get(`http://localhost:3200/api/get_order/${user.userId}`)
      .then((response) => {
        console.log("useruser useruser ", response.data.data);
        setOrder(response.data.data);
        createRowsTable(response.data.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  function createData(Nom, Prix, Date, Etat) {
    return { Nom, Prix, Date, Etat };
  }
  const createRowsTable = (data) => {
    let T = [];
    for (let i = 0; i < data.length; i++) {
      let products = "";
      for (let j = 0; j < data[i].productsId.length; j++) {
        products = `${data[i].productsId[j].name} ,`;
      }

      T.push(
        createData( products,data[i].prix,data[i].Order_date,data[i].etat),

      );
    }
    setrows(T);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Mes Orders </title>
        <meta
          name="description"
          content="About page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Order</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Mes Orders
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </LayoutOne>
    </Fragment>
  );
};

Order.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    user: state.userData,
  };
};

export default connect(mapStateToProps)(Order);
