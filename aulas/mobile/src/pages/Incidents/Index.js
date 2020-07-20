import React, {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents(){
    const navigation = useNavigation();

    const [incidents, setIncidents] = useState([]);
    const [totalIncidents, setTotalIncidents] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident){
        navigation.navigate('detail', {incident});
    }

    async function loadIncidents(){
        if (loading) return;

        if (totalIncidents > 0 && incidents.length === totalIncidents){
            return;
        }

        setLoading(true);
        const response = await api.get('incidents', {
            params:{page} 
        });

        setTotalIncidents(response.headers['x-total-count']);
        setIncidents([... incidents, ... response.data]);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() =>{
        loadIncidents();
    }, []);

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold}>{totalIncidents} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Excolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                style={styles.incidentList}
                data={incidents} 
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator = {false}
                onEndReached= {loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item:incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>
                            {
                            Intl.NumberFormat('pt-BR',{style:'currency', currency: 'BRL'}).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => {navigateToDetail(incident)}}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color='#e02041' />
                        </TouchableOpacity>
                    </View>
                )}
            />

            
        </View>
    )
}