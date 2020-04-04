import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

function NewIncident(){
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }

        try{        
            const response = await api.post('/incidents',data, {
                headers:{
                    Authorization: ongId
                }
            });  
            history.push('/profile'); 
        } 
        catch(err){
            alert('Erro ao cadastrar');
        }

    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Heroe"/>
                    <h1>Cadastro</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home 
                    </Link>
                </section>
                <form action="">
                    <input type="text" placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea  name="" id="" placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input type="text" placeholder="Valor em reis"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
             
                    <button className="button" onClick={handleNewIncident} type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default NewIncident;