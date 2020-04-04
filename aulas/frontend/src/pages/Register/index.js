import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
 
import './styles.css';

import logo from '../../assets/logo.svg';

function Register(){
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try{
            const response = await api.post('/ongs', data);
            alert(`Seu cadastro foi feito com sucesso. Seu id é ${response.data.id}`);
            history.push('/');
        }
        catch(err){
            alert("Erro ao cadastrar ONG.\nConfira seus dados e tente novamente!");
            console.log(err);
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Heroe"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataformae 
                        ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}    
                    />
                    <input type="email" name="" id="" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}   
                    />
                    <input type="text" placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}   
                    />
                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}   
                        />
                        <input placeholder="UF" style={{ width:80 }}
                            value={uf}
                            onChange={e => setUF(e.target.value)}   
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}


export default Register;