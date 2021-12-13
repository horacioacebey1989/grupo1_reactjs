import React ,{ useState, useEffect } from 'react'
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
        {
            id: "materia",
            label: "Materia Particular",
            minWidth: 170,
            align: "center",
        },
        {
            id: "direccion",
            label: "Dirección",
            minWidth: 170,
            align: "center",
        },
        {
            id: "Limite",
            label: "Limite",
            minWidth: 170,
            align: "center",
        },      
        {
            id: "Costo",
            label: "Costo x Hora",
            minWidth: 170,
            align: "center",
        },
        {
            id: "Acciones",
            label: "Acciones",
            minWidth: 170,
            align: "center",
        },
      ];
      
return (
    <div className='userList'>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell style={{ width: 160 }} align="center">
                  {row.id_materia_particular}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.direccion}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.limite + " alumnos"}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.costo_hora + " Bs."}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <ModalReservas
                      clase={row._id}
                    />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
);


}
