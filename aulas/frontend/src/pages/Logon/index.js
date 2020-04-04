import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

function Logon(props){
    const history = useHistory();

    const [id, setID] = useState('');

    async function handleLogon(e){
        e.preventDefault();

        try{
            const response = await api.post('/session', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        }
        catch(err){
            alert("Erro ao logar!\nTente Novamente!")
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt=""/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>
                    <input type="text" placeholder="Sua ID"
                        value={id}
                        onChange={e => setID(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}

export default Logon;