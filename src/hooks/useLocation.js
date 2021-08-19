import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_USER} from '../redux/types';

function UseLocation() {
  const dispatch = useDispatch();

  const userCity = {};

  const grantedLocation = async () => {
    if (Platform.OS === 'ios') {
      await Geolocation.requestAuthorization();
      return setLocation();
    } else {
      const c = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return setLocation();
    }
  };
  function setLocation() {
    return new Promise((resolve, reject) => {
      try {
        Geolocation.getCurrentPosition(
          info => {
            console.log(JSON.stringify(info));
            // dispatch(
            //   _SET_USER(null, {
            //     _geoloc: {
            //       lat: info.coords.latitude,
            //       lng: info.coords.longitude,
            //     },
            //   }),
            // );
            // dispatch(
            //   _SET_USER_HISTORY_LOCATION({
            //     lat: info.coords.latitude,
            //     long: info.coords.longitude,
            //   }),
            // );
            dispatch({
              type: UPDATE_USER,
              payload: {
                _geoloc: {
                  lat: info.coords.latitude,
                  lng: info.coords.longitude,
                },
              },
            });
            resolve({
              _geoloc: {lat: info.coords.latitude, lng: info.coords.longitude},
            });
          },
          info => {
            // alert(JSON.stringify(info));
            grantedLocation();
            console.log(JSON.stringify(info));

            // dispatch(
            //   _SET_USER(null, {
            //     _geoloc: {
            //       lat: (userCity || {}).lat || 11.001004,
            //       lng: (userCity || {}).lng || -74.250761,
            //       permission_location: false,
            //     },
            //   }),
            // );
            dispatch({
              type: UPDATE_USER,
              payload: {
                _geoloc: {
                  lat: userCity.lat || 11.001004,
                  lng: userCity.lng || -74.250761,
                },
              },
            });
            resolve({
              _geoloc: {
                lat: (userCity || {}).lat || 11.001004,
                lng: (userCity || {}).lng || -74.250761,
              },
            });
          },
          {timeout: 500},
        );
      } catch (e) {
        console.log(JSON.stringify(e));

        resolve({
          _geoloc: {
            lat: (userCity || {}).lat || 11.001004,
            lng: (userCity || {}).lng || -74.250761,
          },
        });
      }
    });
  }
  useEffect(() => {
    grantedLocation();
  }, []);
}

export default UseLocation;
