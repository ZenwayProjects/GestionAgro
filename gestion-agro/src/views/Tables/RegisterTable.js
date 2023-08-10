import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Button, Checkbox, Divider, Grid, IconButton, Stack, Typography} from "@mui/material/";

import AppBarComponent from "../../components/layouts/AppBarComponent";
import _, { result } from "lodash";
import DataTable from 'react-data-table-component';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import { PersonaApiGetRequest } from "../../requests/Persona/PersonaApiGetRequest";
import { PersonaApiDeleteRequest } from "../../requests/Persona/PersonaApiDeleteRequest";
import {dataBaseIp, dataBasePort} from "../../Backend";



const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  
const customSort = (rows, selector, direction) => {
    return _.orderBy(rows, selector, direction);
};




   


const data1 = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
   
]

const  Title_button = () => {
return(
    <Grid  style={{display:"flex", background:"none", justifyContent:"flex-end"}} >



<Stack direction="row" spacing={1} style={{ marginRight:10, paddingTop:4, display:"flex", verticalAlign:"center"}} >

     
<div style={{ display: 'flex', alignItems: 'center' }}>
  <Typography>Agregar</Typography>
</div>
 

      <IconButton  color="primary" aria-label="delete"  style={{borderRadius: '0%'}} component="label">
        
        <AddBoxIcon  fontSize="large"/>
      </IconButton>
   

           
    
            </Stack>
            
            </Grid>
          
)
}


 
  
  export default function RegisterTable() {


    let ResultInfo = PersonaApiGetRequest(`http://${dataBaseIp}:${dataBasePort}/api/persona/list`);
  

    const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [data, setData] = useState(data1);
  



  

  


	const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, );

    
    const contextActions = useMemo(() => {
        const handleDelete = () => {
            
            if (window.confirm(`Seguro que deseas eliminar datos del id ${selectedRows.map(r => r.id)}?`)) {
                setToggleCleared(!toggleCleared);
                selectedRows.map((row)=>{
                  PersonaApiDeleteRequest(`http://${dataBaseIp}:${dataBasePort}/api/persona/delete/${row.id}`);
                  
                
                });
       
                // ResultInfo.data =(_.differenceBy(ResultInfo.data, selectedRows));
               // PersonaApiDeleteRequest(http://192.168.192.225:8080/api/persona/)
                ResultInfo.data =(_.differenceBy(ResultInfo.data, selectedRows));
            }
        };
            const handleUpdate = () => {
            
            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
                setToggleCleared(!toggleCleared);
             
            }
        };

    
    
        return (
            <Grid >
           
             <Button key="update" onClick={handleUpdate} variant="outlined" disabled={selectedRows.length != 1 ? true : false} style={{ backgroundColor: 'transparent',margin:10, border:"solid 2px" }} icon>
             Update
         </Button>

         <IconButton onClick={handleDelete} aria-label="delete"  style={{borderRadius: '0%', marginRight:20}} component="label">
        
        <DeleteIcon  style={{color:"red"}} fontSize="large"/>
      </IconButton>
            </Grid>
            
        );

    }, [ResultInfo.data, selectedRows, toggleCleared]);


  
    return (
        <>

        <AppBarComponent/>


        {ResultInfo.loading ? 
        <h1>Cargando...</h1>
        :
        <Box>
        
        <Title_button/>
        <DataTable
             title='Personas'
            pagination
            columns={Object.keys(ResultInfo.data[0]).map((key) => ({ name: key, selector: r => r[key]}))}
            data={ResultInfo.data}
            selectableRowsComponent={Checkbox}
            sortIcon={sortIcon}
            responsive="true"
            striped="true"
            highlightOnHover="true"
            sortFunction={customSort}
            selectableRows
            contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
        
        />
        </Box>    
    }

      
       </>
        
    );
  }