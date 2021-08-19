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
import {emit, emitUDP, UDP} from '../../services/sokectio';

function Index(props) {
  UseLocation();
  const location = useSelector(state => {
    return state.user._geo;
  });
  const [phone, setPhone] = useState('');
  const [ip, setIp] = useState('http://bysj.servegame.com:3030');
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
        alert('Mensaje envíado');
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{textAlign: 'center'}}>
        This page for now is only going to be limited to its main functionality.
        Send information through TPC/UDP protocol. And send SMS message.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={phone}
          onChangeText={val => {
            setPhone(val);
          }}
          placeholder={'Número celular'}
          style={styles.textInput}
        />
      </View>
      <View style={{}}>
        <TouchableOpacity
          onPress={() => {
            sendSMS();
            // emit({location});
          }}
          style={styles.likeButton}>
          <Text style={styles.textButton}>Send data location SMS </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={ip}
          onChangeText={val => {
            setIp(val);
          }}
          placeholder={'IP'}
          style={styles.textInput}
        />
      </View>
      <View style={{}}>
        <TouchableOpacity
          onPress={() => {
            //sendSMS();
            emit({location, ip});
          }}
          style={styles.likeButton}>
          <Text style={styles.textButton}>Send data location IP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inputContainer: {marginTop: 50},
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
    minWidth: 100,
  },
});

export default Index;
