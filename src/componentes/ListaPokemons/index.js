import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

const ListaPokemons = ({ data, modal }) => {

    const { name, url } = data;
    const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon', '').replace('/', '').replace('/', '');
    const imageUrl = 'https://cdn.traction.one/pokedex/pokemon/' + pokemonNumber + '.png';

    const [habilidade, setHabilidade] = useState([]);
    const habi = 'https://pokeapi.co/api/v2/ability/' + pokemonNumber + '/';

    fetch(habi, {
        method: 'GET',
        headers: {
            'Accept': 'aplication/json'
        }
    })
        .then(response => response.json())
        .then(data => {setHabilidade(data)})

    return (
        <TouchableOpacity style={styles.item} onPress={modal}>
            <Image source={{ uri: imageUrl }} style={styles.itemPhoto} />
            <View style={styles.itemInfo}>
                <Text style={styles.itemP1}>{name}</Text>
                <Text style={styles.itemP2}>Abilitie: {habilidade.name}</Text>              
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingTop: 15,
        paddingBottom: 15,
    },
    itemPhoto: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    itemInfo: {
        marginLeft: 20,
    },
    itemP1: {
        fontSize: 22,
        color: '#1f1313',
        marginBottom: 5
    },
    itemP2: {
        fontSize: 18,
        color: '#999999',
        alignItems: 'center'
    },
    itemP3: {
        fontSize: 16,
        color: '#999999',
        alignItems: 'center'
    },
});

export default ListaPokemons;