import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SendSMS from 'react-native-sms';
import UseLocation from '../../hooks/useLocation';
import {useSelector} from 'react-redux';
import {emit} from '../../services/sokectio';

function Index(props) {
  UseLocation();
  const location = useSelector(state => {
    return state.user._geo;
  });
  const [phone, setPhone] = useState('');
  const sendSMS = () => {
    if (
      /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone) &&
      phone.length === 10
    ) {
      SendSMS.send({
        body: `lat:${location._geoloc.lat}, lng: ${location._geoloc.lng}`,
        recipients: [phone],
        successTypes: ['sent'],
        allowAndroidSendWithoutReadPermission: true,
      }).then(res => {
        setPhone('');
        alert('Mensaje envíado');
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{textAlign: 'center'}}>
        This page for now is only going to be limited to its main functionality.
        Send information through TPC/UDP protocol
      </Text>
      <View>
        <Text>send data</Text>
        {/*<TextInput*/}
        {/*  value={phone}*/}
        {/*  onChangeText={val => {*/}
        {/*    setPhone(val);*/}
        {/*  }}*/}
        {/*  placeholder={'Número celular'}*/}
        {/*  style={styles.textInput}*/}
        {/*/>*/}
      </View>

      <TouchableOpacity
        onPress={() => emit({location})}
        style={styles.likeButton}>
        <Text style={styles.textButton}>Send data location</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  likeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 7,
  },
  textButton: {color: 'white', textAlign: 'justify'},
  textInput: {
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    maxWidth: 500,
  },
});

export default Index;
