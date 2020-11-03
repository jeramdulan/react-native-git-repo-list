import React,{Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Image, FlatList, SafeAreaView} from 'react-native';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      isLoading:true,
      DataSource:null,
    }
  }

  componentDidMount(){
    return fetch('https://api.github.com/search/repositories?q=qwe&per_page=100&page=1').then((response)=> response.json()).then((responseJson)=>
    {
      this.setState({
        isLoading:false,
        DataSource:responseJson,
      });
    })
    .catch((error)=> {
      console.log(error)
    });
  }

  render(){
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator />
        </View>
      )
    }else{
      let Data = this.state.DataSource.items.owner.map((val,key)=>{
        return(
          <View key={key}>
            <Image style={styles.tinyLogo} source={require({val.avatar_url})}  />
            <Text>{val.repos_url}</Text>
            <Text>{val.url}</Text>
          </View>
        )
      });
      return(
      <SafeAreaView style={styles.safeAreaContainer}>
        <FlatList data={Data}  />
      </SafeAreaView>
      );
    }
  }

}

const styles = StyleSheet.create({
  container:{
    padding:50,
    textAlign:'center',
  },
  title:{
    fontSize:30,
    fontWeight:'700',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  safeAreaContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

