import React, { useState } from 'react'
import "./user.css"
import {PermIdentity, CalendarToday, PhoneAndroid, MailOutline, LocalActivity, Publish, Public} from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'

export default function User() {

    const location = useLocation();
    const tipoUsuario = location.state.userSend;

    const [nombre, setNombre] = useState(tipoUsuario.nombre);
    
    const handleNombre = (e) =>{
        setNombre(e.target.value);
    }

    const handleSubmit = () =>{
        if(nombre != ''){
            const requesInit ={
                method : 'PUT',
                headers : {
                    'Content-Type':'application/json',
                },
                body : JSON.stringify({
                    nombre: nombre,
                })
            }
            fetch('http://localhost:3800/api/updateTipoUsuario/'+tipoUsuario._id,requesInit)
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

    return (
        <div className='user'>
            <div className='userTitleContainer'>
                <h1 className='userTitle'>Editar Usuario</h1>
                <Link to='/newUser'>
                    <button className='userAddButton'>Nuevo</button>
                </Link>
            </div>
            <div className='userContainer'>
                <div className='userShow'>
                    <div className='userShowTop'>
                        <img className='userShowPic' src='https://cdn-icons-png.flaticon.com/512/147/147144.png'/>
                        <div className='userShowTopTitle'>
                            <span className='userShowUserName'>Horacio Acebey</span>
                            <span className='userShowUserTitle'>Ingenieria de Sistemas</span>
                        </div>
                    </div>
                    <div className='userShowBottom'>
                        <span className='userShowTitle'>Detalle</span>
                        <div className='userShowInfo'>
                            <PermIdentity className='userShowIcon'/>
                            <span className='userShowInfoTitle'>horacio.acebey</span>
                        </div>
                        <div className='userShowInfo'>
                            <CalendarToday className='userShowIcon'/>
                            <span className='userShowInfoTitle'>11/12/2021</span>
                        </div>
                        
                        <span className='userShowTitle'>Contacto</span>
                        <div className='userShowInfo'>
                            <PhoneAndroid className='userShowIcon'/>
                            <span className='userShowInfoTitle'>765675675</span>
                        </div>
                        <div className='userShowInfo'>
                            <MailOutline className='userShowIcon'/>
                            <span className='userShowInfoTitle'>test@test.com</span>
                        </div>
                         <div className='userShowInfo'>
                            <LocalActivity className='userShowIcon'/>
                            <span className='userShowInfoTitle'>Tarija</span>
                        </div>
                    </div>
                </div>
                <div className='userUpdate'>
                    <span className='userUpdateTitle'>Editar</span>
                    <form className='userUpdateForm' onSubmit={handleSubmit} action='/users'>
                        <div className='userUpdateLeft'>
                            <div className='userUpdateItem'>
                                <label>Tipo Nombre</label>
                                <input type='text' placeholder='Nombre' value={nombre} onChange={handleNombre} className='userUpdateInput'/>
                            </div> 
                            <button style={{marginTop:'20px'}} className='userAddButton'>Editar</button>
                        </div>
                        
                        <div className='userUpdateRight'>
                            <div className='userUpdateUpload'>
                                <img className='userUpdatePic' src='https://cdn-icons-png.flaticon.com/512/147/147144.png'/>
                                <label htmlFor='file'><Publish/></label>
                                <input type='file' id='file' style={{display:"none"}}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
