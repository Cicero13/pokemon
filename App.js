import { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  RefreshControlBase,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ListaPokemons from './src/componentes/ListaPokemons';
import uuid from 'react-native-uuid';
import Evolucao from './src/componentes/Evolucao';

export default function App() {

  const [busca, setBusca] = useState('');
  const [list, setList] = useState([]);
  const [estado, setEstado] = useState('busca');
  const [off, setOff] = useState(0);

  const [evolucao, setEvolucao] = useState([]);
  const [pokeID, setPokeID] = useState(0);

  if (estado == 'busca') {
    setList[0];
    useEffect(() => {
      if (busca === '') {
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${off}&limit=50`, {
          method: 'GET',
          headers: {
            'Accept': 'aplication/json'
          }
        })
          .then(response => response.json())
          .then(data => { setList(atual => [...atual, ...data.results]) })
      } else {
        setList(
          list.filter(
            (item) =>
              item.name.toLowerCase().indexOf(busca.toLowerCase()) > -1
          ));
        setOff(0);
      }
    }, [off, busca])

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
          keyExtractor={() => uuid.v4()}
          onEndReached={() => setOff(atual => atual + 20)}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => <ListaPokemons data={item} setEstado={setEstado} setPokeID={setPokeID} />}
        />
        <TouchableOpacity onPress={() => setEstado('time')} style={styles.btnTime}><Text style={{ textAlign: 'center', color: 'white' }}>Gerar Time</Text></TouchableOpacity>
        <StatusBar hidden />
      </SafeAreaView>
    );
  } else if (estado == 'time') {

    useEffect(() => {

      fetch('https://pokeapi.co/api/v2/pokemon/?limit=1154', {
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
            id[i] = parseInt((Math.random() * 1000));
            setList(atual => [...atual, data.results[id[i]]]);
          }
        })
    }, [estado])

    return (
      <SafeAreaView style={styles.container}>

        <View>
          <Text style={styles.gerarTime}>Time de Pokemons Gerado</Text>
        </View>
        <FlatList
          data={list}
          style={styles.list}
          keyExtractor={() => uuid.v4()}
          renderItem={({ item }) => <ListaPokemons data={item} setEstado={setEstado} setPokeID={setPokeID}/>}
        />
        <TouchableOpacity onPress={() => {setEstado('busca'); setList([])}} style={styles.btnTime}><Text style={{ textAlign: 'center', color: 'white' }}>Home</Text></TouchableOpacity>
        <StatusBar hidden />
      </SafeAreaView>
    );

  } else if (estado == 'evolucao') {
    console.log(pokeID)

    useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokeID}/`, {
        method: 'GET',
        headers: {
          'Accept': 'aplication/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.chain.evolves_to[0]);
          const auxTest = data.chain.evolves_to[0];
          console.log(auxTest);
          if (auxTest) {
            setEvolucao([auxTest.species]);
            if (auxTest.evolves_to) {
              setEvolucao(atual => [...atual, auxTest.evolves_to[0].species])
            }
          }
        })
    }, [pokeID]);



    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.gerarTime}>Possiveis Evoluções do Pokemons selecionado</Text>
        </View>
        <FlatList
          data={evolucao}
          style={styles.list}
          keyExtractor={() => uuid.v4()}
          renderItem={({ item }) => <Evolucao data={item} />}
        />
        <TouchableOpacity onPress={() => {setEstado('busca'); setList([])}} style={styles.btnTime}><Text style={{ textAlign: 'center', color: 'white' }}>Home</Text></TouchableOpacity>
        <StatusBar hidden />
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
  gerarTime: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  }
});

