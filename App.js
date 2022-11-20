import React from 'react';
import { useState, useEffect } from 'react';
import { Searchbar, Provider, Modal, Portal } from 'react-native-paper';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ListaPokemons from './src/componentes/ListaPokemons';

export default function App() {

  const [busca, setBusca] = useState('');
  const [list, setList] = useState([]);
  const [time, setTime] = useState([]);
  const [estado, setEstado] = useState('busca');
  console.disableYellowbox = true;

  if (estado == 'busca') {
    useEffect(() => {
      if (busca === '') {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=50', {
          method: 'GET',
          headers: {
            'Accept': 'aplication/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            setList([]),
            setList(data.results)
          })
      } else {
        setList(
          list.filter(
            (item) =>
              item.name.toLowerCase().indexOf(busca.toLowerCase()) > -1
          ));
      }
    }, [busca])

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.searchArea}>
          <Searchbar
            placeholder="Pesquise um Pokemon"
            onChangeText={(t) => setBusca(t)}
            value={busca}
          />
        </View>
        <FlatList
          data={list}
          style={styles.list}
          keyExtractor={(list) => list.name}
          renderItem={({ item }) => <ListaPokemons data={item} modal={showModal} />}
        />
        <TouchableOpacity onPress={() => setEstado('time')} style={styles.btnTime}><Text style={{ textAlign: 'center', color: 'white' }}>Gerar Time</Text></TouchableOpacity>
        <StatusBar hidden />
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <Text>Ola meu MOdal</Text>
        </Modal>
      </SafeAreaView>
    );
  } else if (estado == 'time') {

    useEffect(() => {

      fetch('https://pokeapi.co/api/v2/pokemon/?limit=50', {
        method: 'GET',
        headers: {
          'Accept': 'aplication/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          id = [];
          setList([]);
          for (let i = 0; i < 5; i++) {
            id[i] = parseInt((Math.random() * 50));
            setList(atual => [...atual, data.results[id[i]]]);
          }
        })
    }, [estado])

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
      <SafeAreaView style={styles.container}>

        <View>
          <Text style={styles.gerarTime}>Time de Pokemons Gerado</Text>
        </View>
        <FlatList
          data={list}
          style={styles.list}
          keyExtractor={(list) => list.name}
          renderItem={({ item }) => <ListaPokemons data={item} modal={showModal} />}
        />
        <TouchableOpacity onPress={() => setEstado('busca')} style={styles.btnTime}><Text style={{ textAlign: 'center', color: 'white' }}>Home</Text></TouchableOpacity>
        <StatusBar hidden />
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <Text>Ola meu MOdal</Text>
        </Modal>
      </SafeAreaView>
    );

  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#363636',
    margin: 30,
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#FFFFFF',
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderButton: {
    width: 32,
    marginRight: 30,
  },
  list: {
    flex: 1,
  },

  btnTime: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 100,
    paddindtop: 10,
    paddingBottom: 10,
    backgroundColor: '#242425',
    borderRadius: 20,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20
  },
  gerarTime:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  }
});

