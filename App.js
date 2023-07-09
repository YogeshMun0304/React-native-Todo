
import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.log('Error loading todos:', error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.log('Error saving todos:', error);
    }
  };


  const addTodo = () => {
    if (todoInput.trim() === '') {
      return; // Ignore empty todo input
    }

    setTodos([...todos, todoInput]);
    setTodoInput('');
    setmodalVisible(false);
  };
  const addgoalhandler = () =>{
    setmodalVisible(true);
  }
  const closeModal = ()=>{
    setmodalVisible(false);
  }
  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <View  style={styles.list}>
        <Text style={{paddingBottom:10, fontSize:30, borderBottomWidth:2, borderColor:'grey'}}>Your Todo's</Text>
      {/* Render todos */}
      <ScrollView >
      
      {todos.map((todo, index) => (
          <TouchableOpacity key={index}  onPress={() => deleteTodo(index)}>
            <View key={index} android_ripple={{color: 'purple'}} style={styles.todoItem}>
          <Text>{todo}</Text>
        </View>
          </TouchableOpacity>))}
      </ScrollView>
      </View>
      <Button title = 'Add Goal' onPress={addgoalhandler} />
      {  modalVisible && <Modal transparent={true} visible={modalVisible} animationType='slide'  style={styles.Modal}>
      <View style={styles.todoContainer}>
        <TextInput
          style={styles.input}
          value={todoInput}
          onChangeText={setTodoInput}
          placeholder="Enter a todo"
          
        />
        <View style={styles.button}> 
        <Button title="Add Todo" onPress={addTodo} color='green' />
        <View style={styles.buttonGap} />
         <Button title="Cancel" onPress={closeModal} color='red' />
        </View>
      </View>
      </Modal>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#D8BFD8',
  },
  todoContainer: {
    flex:1,
    flexDirection: 'column',
    marginBottom: 10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    height:50,
    width:'80%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    color:'white',
  },
  list:{
    flex:5,
    marginTop:50,
  },
  todoItem: {
    justifyContent:'center',
    margin: 10,
    height:50,
    // Add styling for each todo item
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,

  },
  Modal :{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#D8BFD8',
    padding:20

  },
  button:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-end',
    marginTop:10,


  },
  buttonGap: {
    width: 30,
  },
});

export default App;