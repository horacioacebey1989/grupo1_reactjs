import React ,{ useState, useEffect } from 'react'
import { DataGrid} from '@material-ui/data-grid'
import './claseList.css'
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import ModalReservas from "../modals/ModalReservas";
export default function ClaseList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getClases = () =>{
            fetch('http://localhost:3800/api/getClases')
            .then(res => res.json())
            .then(res => {
                if(res) {
                    setData(res.Clases)
                }
            })
        }
        getClases()
    }, [])

    const columns = [
      { field: 'id_materia_particular', headerName: 'ID_Materia', width: 250 },
      { field: 'direccion', headerName: 'Direccion', width: 150 },
      { field: 'limite', headerName: 'Limite', width: 150 },
      { field: 'costo_Hora', headerName: 'Costo x Hora', width: 150,},
      { field: 'Acciones', headerName: 'Asignar', width: 150, headerStyle: {textjustify: 'center'},
      renderCell: (params) =>{
          return(
              <>  
                   <ModalReservas clase={params.row._id}/>
              </>
          )
      }
      }
    ];
      
return (
    <div className='userList'>
        <DataGrid
          getRowId={(row)=>row._id}
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          />
    </div>
);


}
