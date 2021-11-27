import React,{ useState, useEffect } from 'react'
import "./horarioAdmin.css"
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material"; 


export default function HorarioAdmin() {
///////////////////////////////// Constantes ////////////////////////////////////
    const [horario, setHorario] = useState([]);
    const [tipoHorarioSend, setHorarioSend] = useState("");
    const [selectedHorario, setSelectedHorario]= useState("");
    const [hora, setHora] = React.useState("");
    const [dia, setDia] = useState({});

    const handleSeleccionarHorario = (event) => {
        setSelectedHorario(event);
        console.log(selectedHorario);

      };

    const handleHora = (e) => {
        setHora(e.target.value);
        console.log(hora);
    }
    const handleDia = (e) => {
        setDia(e.target.value);
        console.log(dia);
    }

    
///////////////////////////////// ////////////////////////////////////
const handleSubmit = () =>{
    if(selectedHorario != ''){
        const requesInit ={
            method : 'PUT',
            headers : {
                'Content-Type':'application/json',
            },
            body : JSON.stringify({
                dia: dia,
                hora: hora,
            })
        }
        fetch('http://localhost:3800/api/updateHorarioClase/'+selectedHorario,requesInit)
        .then(res => res.json())
        .then(res => {
            if(res){
                alert("Registro completado");
            }
        })
    }
    else{
        alert('Introduzca los valores!');
    }
}
const handleDelete = (e) =>{
    
        const requesInit ={
            method : 'PUT',
            headers : {
                'Content-Type':'application/json',
            },
            body : JSON.stringify({
                visible: false,
            })
        }
        fetch('http://localhost:3800/api/deleteHorarioClase/'+e,requesInit)
        .then(res => res.json())
        .then(res => {
            if(res){
                alert("Registro completado");
            }
        })

}
///////////////////////////////////////////////////////////////////////////

    
    
    useEffect(() => {
        const getHorarios = ()=>{
            fetch('http://localhost:3800/api/getHorariosClases')
            .then(res => res.json())
            .then(res => {
                if(res){
                    setHorario(res.HorariosClases);
                    setHorarioSend(res.HorariosClases._id);
                    console.log(res.HorariosClases);
                }
            })
        }
        getHorarios()
    }, [])

//////////////////////////////////////////////// COLUMNAS TABLA ///////////////////////////////////////////////////////////////////
const columns = [
    {
      id: "id_horario",
      label: "id_horario",
      minWidth: 170,
      align: "center",
    },
    {
      id: "dia",
      label: "dia",
      minWidth: 170,
      align: "center",
    },
    
    {
        id: "hora",
        label: "hora",
        minWidth: 170,
        align: "center",
      },
    {
        id: "Acciones",
        label: "Acciones",
        minWidth: 170,
        align: "center",
    },
    {
        id: "Eliminar",
        label: "Eliminar",
        minWidth: 170,
        align: "center",
    },
  ];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className='Horario'>
        <h1>Administrar Horarios</h1>
        <form className='newHorarioForm' onSubmit={handleSubmit} >
        <div className='newHorarioItem'>
            <label>Elegir el horario correspondiente</label>
            <TextField
                    id="outlined-read-only-input"
                    disabled
                    value={selectedHorario}
                    InputProps={{
                        readOnly: true,
                    }}
                /> 
                <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ top: 57, minWidth: column.minWidth }}
                                >
                                <b>{column.label}</b>
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(horario
                            ).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell style={{ width: 160 }} align="center">
                                {row._id}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                {row.dia}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                {row.hora}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{ marginLeft: 16 }}
                                    onClick={() => {
                                        handleSeleccionarHorario(row._id)
                                        setHora(row.hora)
                                        setDia(row.dia)
                                    }}
                                >
                                    Editar
                                </Button>
                                </TableCell>

                                <TableCell style={{ width: 160 }} align="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{ marginLeft: 16 }}
                                    onClick={() => {
                                        handleDelete(row._id)
                                    }}
                                >
                                    Eliminar
                                </Button>
                                </TableCell>

                            </TableRow>
                            ))}

                        </TableBody>
                       
                        </Table>
                    </TableContainer>
            </div>
            <div className='newHorarioItem'>
                <TextField
                               
                    placeholder="Ej. 15:03 pm"
                    variant="outlined"
                    fullWidth
                    required
                    InputLabelProps={{
                    style: {
                        fontFamily: "Arial",
                        color: "black",
                            },
                            }}
                    inputProps={{
                        style: {
                        fontFamily: "Arial",
                        color: "black",
                        },
                        }}
                        value={hora}
                        onChange={(e) => {
                        handleHora(e);
                        }}
                />
            </div>
            <div className='newHorarioItem'>
                <TextField
                               
                    placeholder="Ej. Lunes"
                    variant="outlined"
                    fullWidth
                    required
                    InputLabelProps={{
                    style: {
                        fontFamily: "Arial",
                        color: "black",
                            },
                            }}
                    inputProps={{
                        style: {
                        fontFamily: "Arial",
                        color: "black",
                        },
                        }}
                        value={dia}
                        onChange={(e) => {
                        handleDia(e);
                        }}
                />
            </div>
            <button className='newHorarioButton'>Editar</button>
        </form>
    </div>
    )
}