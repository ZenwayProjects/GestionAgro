import React, { useState, useMemo, useCallback, useEffect, } from "react";
import { Button, Checkbox, Grid, IconButton, Stack, Typography, Modal } from "@mui/material/";

import AppBarComponent from "../../components/layouts/AppBarComponent";
import _, { result, set } from "lodash";
import DataTable from 'react-data-table-component';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";

import { dataBaseIp, dataBasePort } from "../../Backend";
import PerfilModal from "../../components/modals/PerfilModal";
import { ApiGetRequest } from "../../components/request/Crud/ApiGetRequest";
import { ApiDeleteRequest } from "../../components/request/Crud/ApiDeleteRequest";
import { ApiPostRequest } from "../../components/request/Crud/ApiPostRequest";
import { ApiUpdateRequest } from "../../components/request/Crud/ApiUpdateRequest";



const sortIcon = <ArrowDownward />;


const customSort = (rows, selector, direction) => {
  return _.orderBy(rows, selector, direction);
};



export default function PerfilTable() {

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState(false);
  const [modal, setModal] = useState(false);
  const [resultInfo, setResultInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, [modal]);

  //método para agregar una fila a la base de datos desde el modal
  const handleAddRow = async (post) => {

    await ApiPostRequest(`http://${dataBaseIp}:${dataBasePort}/api/perfil/create`, post)
   
    setModal(false);
  };

  //método para actualizar una fila a la base de datos desde el modal
  const handleUpdateRow = async (post, id) => {

    await ApiUpdateRequest(`http://${dataBaseIp}:${dataBasePort}/api/perfil/update/${id}`, post)

    setModal(false);
  };

  //metodo para borrar fila de la base de datos
  const handleDeleteRow = async (id) => {

    ApiDeleteRequest(`http://${dataBaseIp}:${dataBasePort}/api/perfil/delete/${id}`);
    fetchData();
    setModal(false);
  };


  //método para traer todos los datos de la base de datos
  const fetchData = async () => {
    await ApiGetRequest(`http://${dataBaseIp}:${dataBasePort}/api/perfil/list`)
      .then(data => {
    

        setResultInfo(data);


      })
      .catch(error => {
        console.log(error);
      });
  }


  //Manejo de la activacion del modal
  const handleModal = (selected = [], modalData = false) => {
    setData(selected);
    setModalData(modalData);
    setModal(!modal);
  }

  const options = {
    selectableRowsHideCheckboxes: false, // Mostrar siempre la barra de herramientas
  };

  const Title_button = () => {
    return (
      <Grid style={{ display: "flex", background: "none", justifyContent: "flex-end" }} >


        <Button onClick={(e) => handleModal([], false)}>

           {/*boton de agregar nueva fila*/}
          <Stack direction="row" spacing={1} style={{ marginRight: 10, paddingTop: 4, display: "flex", verticalAlign: "center" }} >


            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Agregar</Typography>
            </div>

            <IconButton color="primary" aria-label="delete" style={{ borderRadius: '0%' }} component="label">
              <AddBoxIcon fontSize="large" />
            </IconButton>




          </Stack>
        </Button>

      </Grid>

    )
  }


const handlePageChange = () => {
  console.log("cambia la pag")
}




  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
  },);

  //acciones cuando se selecciona una fila
  const contextActions = useMemo(() => {

    //se guarda la fila seleccionada
    setData(selectedRows);

    //borrar fila
    const handleDelete = () => {

      if (window.confirm(`Seguro que deseas eliminar datos del id ${selectedRows.map(r => r.id)}?`)) {
        setToggleCleared(!toggleCleared);
        selectedRows.map((row) => {
          handleDeleteRow(row.id);
        });
    
      }
    };
    //actualizar fila
    const handleUpdate = () => {
      handleModal(selectedRows, true);
      setToggleCleared(!toggleCleared);
    };



//Componente que se activa cuando se selecciona almenos una fila
    return (
      <Grid >
        <Button key="update"
         onClick={handleUpdate}
          variant="outlined"
           disabled={selectedRows.length != 1 ? true : false} //si hay mas de una fila seleccionada se deshabilita
            style={{ backgroundColor: 'transparent', margin: 10, border: "solid 2px" }} 
             icon>
          Update
        </Button>

        <IconButton onClick={handleDelete} aria-label="delete" style={{ borderRadius: '0%', marginRight: 20 }} component="label">

          <DeleteIcon style={{ color: "red" }} fontSize="large" />
        </IconButton>
      </Grid>

    );

  }, [resultInfo?.data
    , selectedRows, toggleCleared, data, modal]);



  return (
    <>


     


      {!resultInfo?.data ?
        <h1>Cargando...</h1>
        :
        <Box>

          <Modal
            open={modal}
            onClose={handleModal}
          >

            <PerfilModal setModal={setModal}
              rowData={!modalData ? [] : data[0]} //se envian los datos ya existente si se esta actualizando
              modalData={modalData} //tipo de peticion que se va a realizar -> create o update -> false o true
              resultInfo={resultInfo.data}
              handleAddRow={handleAddRow}
              handleUpdateRow={handleUpdateRow}
            />
          </Modal>


          <Title_button />
          <DataTable
            title='Perfiles'
            pagination
            columns={resultInfo.data[0] ? Object.keys(resultInfo.data[0]).map((key) => ({ name: key, selector: r => r[key] })) : []} //extrae los campos dinamicamente de la base de datos si existen datos
            data={resultInfo.data || []} //extrae los datos dinamicamente de la base de datos si existen datos
            selectableRowsComponent={Checkbox}
            sortIcon={sortIcon}
            responsive="true"
            striped="true"
            paginationRowsPerPageOptions={[1, 2, 50]}
            highlightOnHover="true"
            sortFunction={customSort}
            selectableRows
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
            options={options}
            onChangePage={handlePageChange}
      

          />
        </Box>
      }


    </>

  );
}