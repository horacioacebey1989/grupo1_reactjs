import React,{ useState, useEffect } from 'react'
import "./horario.css"
import {Button, ButtonGroup,ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material"; 
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


export default function Horario() {

///////////////////////////////// Constantes ////////////////////////////////////
const [hora, setHora] = React.useState("");
const [dia, setDia] = useState({});
const [selectedClase, setSelectedClase]= useState("");

///////////////////////////////// HORA ////////////////////////////////////

const handleHora = (e) => {
    setHora(e.target.value);
}

///////////////////////////////// DIA ////////////////////////////////////

const options = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const [open, setOpen] = React.useState(false);
const anchorRef = React.useRef(null);
const [selectedIndex, setSelectedIndex] = React.useState(1);
const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log(selectedIndex);
    if (index === 0) setDia("lunes");
    if (index === 1) setDia("martes");
    if (index === 2) setDia("miercoles");
    if (index === 3) setDia("jueves");
    if (index === 4) setDia("viernes");
    if (index === 5) setDia("sabado");
    console.log(dia);
    setOpen(false);
  };
  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

///////////////////////////////// CLASES ////////////////////////////////////
const [clase, setClase] = useState([]);
const [tipoClaseSend, setClaseSend] = useState("");
useEffect(() => {
    const getClase = ()=>{
        fetch('http://localhost:3800/api/getClases')
        .then(res => res.json())
        .then(res => {
            if(res){
                console.log(res.Clases);
                setClase(res.Clases);
                setClaseSend(res.Clases._id);
            }
        })
    }
    getClase()
}, [])

const handleSeleccionarClase = (event) => {
    setSelectedClase(event);
    console.log(selectedClase);
  };

///////////////////////////////// SUBMIT ////////////////////////////////////
const handleSubmit =()=>{
    if(dia != '' && hora != ''){
        const requestInit ={
            method : 'POST',
            headers : {
                'Content-Type':'application/json',
            },
            body : JSON.stringify({
                dia: dia,
                hora: hora,
                id_clase: selectedClase
            })
        }
        fetch('http://localhost:3800/api/addHorarioClase',requestInit)
        .then(res => res.json())
        .then(res => {
            if(res){console.log(res.dia);}
        })

    }
    else{ alert('Introduzca todos los campos');
    }
}
//////////////////////////////////////////////// COLUMNAS TABLA ///////////////////////////////////////////////////////////////////
const columns = [
    {
      id: "id_clase",
      label: "id_clase",
      minWidth: 170,
      align: "center",
    },
    {
      id: "Direccion",
      label: "Direccion",
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
        id: "Acciones",
        label: "Acciones",
        minWidth: 170,
        align: "center",
    },
  ];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className='nuevoHorario'>
            <h1>Nuevo Horario</h1>
            <form className='newHorarioForm' onSubmit={handleSubmit}>
            <div className='newHorarioItem'>
                <label>Elegir la clase correspondiente</label>
                <TextField
                    id="outlined-read-only-input"
                    disabled
                    value={selectedClase}
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
                            {(clase
                            ).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell style={{ width: 160 }} align="center">
                                {row._id}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                {row.Direccion}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                {row.Limite}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{ marginLeft: 16 }}
                                    onClick={() => {
                                        handleSeleccionarClase(row._id)
                                    }}
                                >
                                    Seleccionar
                                </Button>
                                </TableCell>
                            </TableRow>
                            ))}

                        </TableBody>
                       
                        </Table>
                    </TableContainer>
                </div>
            <div className='newHorarioItem'>
                    <label>Hora</label>
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
                    <label>Elegir el dia de la clase</label> 
                    <ButtonGroup
                        variant="contained"
                        ref={anchorRef}
                        aria-label="split button"
                    >
                        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                        <Button
                        size="small"
                        aria-controls={open ? "split-button-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                        >
                        <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom"
                            }}
                        >
                            <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                {options.map((option, index) => (
                                    <MenuItem
                                    key={option}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(event, index)}
                                    >
                                    {option}
                                    </MenuItem>
                                ))}
                                </MenuList>
                            </ClickAwayListener>
                            </Paper>
                        </Grow>
                        )}
                    </Popper>
                </div>


                <button className='newHorarioButton'>Crear</button>
            </form>
        </div>
    )
}