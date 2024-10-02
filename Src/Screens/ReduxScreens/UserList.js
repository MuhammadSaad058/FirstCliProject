import React ,{useEffect} from 'react';
import { View,StyleSheet,Text } from 'react-native';

import {useDispatch,useSelector} from 'react-redux';
import { getUserList } from '../../Components/redux/action';
const UserList = () => {
    const dispatch = useDispatch();
    const userList = useSelector((state)=>state.cart.cart)
    useEffect(() => {
        dispatch(getUserList());
        console.warn("userdata are that",userList)
      },[dispatch, userList]);
  return (
    <View style={styles.container}>
        {
            userList.length?
            userList.map((item)=>(<Text>{item.firstName}</Text>))
            :null
        }
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
 
});

export default UserList;
