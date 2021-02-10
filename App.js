import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image, onError } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
     const url = 'http://www.recipepuppy.com/api/?q='+ingredient;
  try {
    const response = await fetch(url);
    const data = await response.json();
       setRecipes(data);
       setIngredient('');
    }
    catch(error) {
      Alert.alert('Error' , error);
    }
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          margin: 10
        }}
      />
    );
  };


  return (
    <View style={styles.container}>
      <FlatList
        style={{marginLeft : "5%"}}
        data={recipes.results}
        keyExtractor={item => item.href}
        ItemSeparatorComponent={listSeparator}
        renderItem={({item}) =>(
          <View><Text>{item.title}</Text>
          <Image
          style={styles.thumbnail}
          source={{uri: item.thumbnail !== '' ? 
            item.thumbnail : 'https://reactnative.dev/img/tiny_logo.png'}}
      /></View>
)
  }
    />
      <TextInput
        style={{fontSize: 14, width: 200, margin:10, borderWidth:1, padding:5}}
        value={ingredient}
        placeholder="Ingredient"
        onChangeText={(ingredient) => setIngredient(ingredient)}
      />

     <Button title="Find recipes" onPress={getRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  margin:20,
 },
 thumbnail: {
  width: 30,
  height: 30,
 
},
});
