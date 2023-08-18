import React, { useState, useMemo, useCallback, useEffect,  } from "react";
import { Button, Checkbox, Grid, IconButton, Stack, Typography, Modal} from "@mui/material/";

import AppBarComponent from "../../components/layouts/AppBarComponent";
import _, { result, set } from "lodash";
import DataTable from 'react-data-table-component';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";

import {dataBaseIp, dataBasePort} from "../../Backend";
import PersonaModal from "../../components/modals/PersonaModal";
import { ApiGetRequest } from "../../components/request/Crud/ApiGetRequest";
import { ApiDeleteRequest } from "../../components/request/Crud/ApiDeleteRequest";
import { ApiPostRequest } from "../../components/request/Crud/ApiPostRequest";
import { ApiUpdateRequest } from "../../components/request/Crud/ApiUpdateRequest";
import { Paper, TextField, makeStyles } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';

const sortIcon = <ArrowDownward />;

const customSort = (rows, selector, direction) => {
  return _.orderBy(rows, selector, direction);
};

//estilos
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "none",
    justifyContent: "space-between",
  },
  centeredContainer: {
    display: "flex",
    alignItems: "center",
  },
  paperSearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 350,
    height: "40px",
    margin: "auto",
    background:'#fff',
    borderRadius:"4px",
    boxShadow:"3px 2px 2px black",
  },
  stack: {
    marginRight: 10,
    paddingTop: 4,
    display: "flex",
    verticalAlign: "center",
  },
}));

export default function RegisterTable() {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState(false);
  const [modal, setModal] = useState(false);
  const [resultInfo, setResultInfo] = useState([]);
  const [limite, setLimite] = useState(10);
  const [totalRecords, setTotalRecords] = useState(1);
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [storedSearchValue, setStoredSearchValue] = useState("");

  useEffect(() => {
    fetchData();
  }, [modal, limite, offset, storedSearchValue]);

  const conditionalRowStyles = [
    {
      when: (row) => row.id === selectedRow?.id,
      style: {
        backgroundColor: "#CCE5FF",
        userSelect: "none",
      },
    },
  ];

  //Enviar datos a la tabla persona
  const handleAddRow = async (post) => {
    console.log(post);
    await ApiPostRequest(
      `http://${dataBaseIp}:${dataBasePort}/api/persona/create`,
      post
    );
    await fetchData();
    setModal(false);
  };


  //actualizar datos a la tabla persona
  const handleUpdateRow = async (post, id) => {
    await ApiUpdateRequest(
      `http://${dataBaseIp}:${dataBasePort}/api/persona/update/${id}`,
      post
    );
    await fetchData();
    setModal(false);
  };


  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
  
    const requestBody =  {
      offset: offset,
      limite: limite,
      busqueda: storedSearchValue,
    };
  


  //obtener paquete de  datos, datos totales y que coincidan con la busqueda en la tabla persona
    await ApiGetRequest(
      `http://${dataBaseIp}:${dataBasePort}/api/persona/listbyparams`,
      requestBody,
      token
    
    )
      .then((data) => {
        console.log(data);
        setResultInfo(data.data);
        setTotalRecords(data.data.totalRecords);
      })
      .catch((error) => {
        console.log(error);
      });
      setSelectedRow(null);
  };

  //selecionar un registro
  const handleRowClicked = (row) => {
    setSelectedRow(row.id === selectedRow?.id ? null : row);
  };

  //encender el modal
  const handleModal = (selected = {}, modalData = false) => {
    console.log(selectedRow);
    setData(selectedRow);
    setModalData(modalData);
    setModal(!modal);
  };

  //cambiar el limite
  const handleLimite = (newLimite) => {
    setLimite(newLimite);
  };

  //cambiar el parametro de busqueda
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  //realizar la busqueda
  const realizarBusqueda = () => {
    setStoredSearchValue(searchText);
    setOffset(0);
  };

  const handleRowSelected = useCallback((state) => {
    setSelectedRow(state.selectedRow);
  });


//borrar el registro de la tabla
  const handleDelete = async  () => {
    if (
      window.confirm(`Seguro que deseas eliminar datos del id ${selectedRow?.id}?`)
    ) {
      setToggleCleared(!toggleCleared);
      await ApiDeleteRequest(
        `http://${dataBaseIp}:${dataBasePort}/api/persona/delete/${selectedRow.id}`
      );
      await fetchData();
    }
  };

  const handleUpdate = () => {
    handleModal(selectedRow, true);
    setToggleCleared(!toggleCleared);
  };

  //En caso de presionar enter en el parametro de busqueda, realizar la busqueda.
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      realizarBusqueda();
    }
  };

  const selectableRowSelected = (row) => {
    return row.id === selectedRow?.id;
  };

  return (
    <>
      <Modal open={modal} onClose={handleModal}>
        <PersonaModal
          setModal={setModal}
          fetchData={fetchData}
          rowData={!modalData ? [] : data}
          modalData={modalData}
          resultInfo={resultInfo?.data}
          handleAddRow={handleAddRow}
          handleUpdateRow={handleUpdateRow}
        />
      </Modal>

    

      {!resultInfo?.data ? (
        <h1>NO hay Datos</h1>
      ) : (
        <Box>
          <Grid className={classes.root}>
            <Grid className={classes.centeredContainer}>
              <form className={classes.paperSearch} component="form">
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Buscar"
                  onChange={handleSearch}
                  value={searchText}
                  inputProps={{ "aria-label": "Buscar" }}
                  onKeyDown={handleKeyDown}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  onClick={realizarBusqueda}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </form>
            </Grid>


          <Typography variant="h3" style={{textAlign:"center", marginBottom:"10px"}}>Tabla Persona</Typography>

            <Stack direction="row" spacing={1} className={classes.stack}>
              <Button
                key="agregar"
                onClick={() => handleModal([], false)}
                variant="outlined"
                style={{
                  backgroundColor: "transparent",
                  margin: 10,
                  border: "solid 2px",
                }}
                endIcon={<AddIcon/>}
              >
                Agregar
              </Button>
              <Button
                key="update"
                onClick={handleUpdate}
                variant="outlined"
                disabled={!selectedRow}
                style={{
                  backgroundColor: "transparent",
                  margin: 10,
                  border: "solid 2px",
                }}
                endIcon={<UpdateIcon/>}
              >
                Update
              </Button>
              <IconButton
                onClick={handleDelete}
                aria-label="delete"
                disabled={!selectedRow}
                style={{ borderRadius: "0%", marginRight: 20 }}
                component="label"
         
              >
                <DeleteIcon
                  style={selectedRow ? { color: "red" } : { color: "grey" }}
                  fontSize="large"
                />
              </IconButton>
            </Stack>
          </Grid>


          <DataTable
     
            search
            searchText={searchText}
            pagination
            paginationServer
            columns={
              resultInfo.data[0]
                ? Object.keys(resultInfo.data[0]).map((key) => ({
                    name: key,
                    selector: (r) => r[key],
                  }))
                : []
            }
            data={resultInfo.data || []}
            sortIcon={sortIcon}
            responsive="true"
            striped="true"
            highlightOnHover="true"
            sortFunction={customSort}
            onSelectedRowChange={handleRowSelected}
            clearSelectedRow={toggleCleared}
            paginationPerPage={limite}
            paginationRowsPerPageOptions={[10, 20, 50]}
            paginationTotalRows={totalRecords}
            onChangePage={(newOffset) => setOffset(newOffset - 1)}
            onChangeRowsPerPage={(newLimite) => setLimite(newLimite)}
            contextMessage={false}
            onRowClicked={handleRowClicked}
            conditionalRowStyles={conditionalRowStyles}
            selectableRowSelected={selectableRowSelected}
          />
        </Box>
      )}
    </>
  );
}