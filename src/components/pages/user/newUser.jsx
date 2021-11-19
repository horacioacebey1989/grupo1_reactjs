import React,{ useState, useEffect } from 'react'
import "./newUser.css"

export default function NewUser() {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState([]);
    const [tipoUsuarioSend, setTipoUsuarioSend] = useState("");

    useEffect(() => {
        const getTipo = ()=>{
            fetch('http://localhost:3800/api/getTipoUsuarios')
            .then(res => res.json())
            .then(res => {
                if(res){
                    console.log(res.tipo);
                    setTipoUsuario(res.tipo);
                    setTipoUsuarioSend(res.tipo[0]._id);
                }
            })
        }
        getTipo()
    }, [])

    const handleNombre = (e) =>{
        setUserName(e.target.value);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    const handleTipo = (e) =>{
        setTipoUsuarioSend(e.target.value);
    }

    const handleSubmit =()=>{
        if(username != '' && password != ''){
            const requestInit ={
                method : 'POST',
                headers : {
                    'Content-Type':'application/json',
                },
                body : JSON.stringify({
                    nombre: username,
                    password: password,
                    tipoUsuario: tipoUsuarioSend
                })
            }

            fetch('http://localhost:3800/api/addUsuario',requestInit)
            .then(res => res.json())
            .then(res => {
                if(res){
                    console.log(res.usuario);
                }
            })

        }
        else{
            alert('Introduzca todos los campos');
        }
    }

    return (
        <div className='newUser'>
            <h1>Nuevo Usuario</h1>
            <form className='newUserForm' onSubmit={handleSubmit}>
                <div className='newUserItem'>
                    <label>Nombre</label>
                    <input onChange={handleNombre} value={username} type='text' placeholder='Nombre'/>
                </div>
                <div className='newUserItem'>
                    <label>Password</label>
                    <input type='password' onChange={handlePassword} value={password} placeholder='Password'/>
                </div>
                <div className='newUserItem'>
                    <label>Confirmar Password</label>
                    <select onChange={handleTipo}>
                        {
                            tipoUsuario?
                            (tipoUsuario.map(tipo => (
                                <option value={tipo._id}>{tipo.nombre}</option>
                            )))
                            :                            <option></option>
                        }
                    </select>
                </div>
                <button className='newUserButton'>Crear</button>
            </form>
        </div>
    )
}
