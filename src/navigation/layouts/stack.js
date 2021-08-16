import {Navigation} from 'react-native-navigation';

export const pushStack = (name, passProps) => {
  return Navigation.setRoot({
    root: {
      stack: {
        options: {
          topBar: {
            elevation: 0,
            background: {
              color: 'transparent',
            },
            drawBehind: true,
            visible: false,
          },
        },
        children: [
          {
            component: {
              name,
              passProps,
            },
          },
        ],
      },
    },
  });
};
