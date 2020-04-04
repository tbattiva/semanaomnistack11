import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';

import logo from '../../assets/logo.svg';

function Profile(){
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    const [incidents, setIncidents] = useState([]);

    useEffect(() =>{
        api.get('/profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);


    async function handleDeleteIncident(id){
        try{
            await api.delete(`/incidents/${id}`, {
                headers:{
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }
        catch(err){
            alert("Erro ao tentar deletar o caso");
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt=""/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} >
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</p>

                        <button onClick={() =>handleDeleteIncident(incident.id)} type='button'>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}

export default Profile;