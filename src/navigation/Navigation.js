import {Navigation} from 'react-native-navigation';
import {pushStack} from './layouts/stack';
import {HOME_SCREEN} from './screens';
import registerScreens from './registerScreens';
registerScreens();

export async function startApp() {
  Navigation.setDefaultOptions({
    sideMenu: {
      openGestureMode: 'bezel',
      left: {
        shouldStretchDrawer: false,
        width: 260,
      },
    },
    bottomTab: {
      textColor: '#FFFFFF',
      selectedIconColor: 'white',
      selectedTextColor: '#FFFFFF',
    },
    bottomTabs: {
      backgroundColor: '#272533',
      drawBehind: false,
    },

    topBar: {
      visible: false,
      // In case, visible is true
      noBorder: true,
      background: {
        color: 'transparent',
        translucent: true,
      },
      drawBehind: true,
      animate: true,
      elevation: 0,
    },
    statusBar: {
      visible: true,
      backgroundColor: 'white',
    },
    layout: {
      backgroundColor: 'transparent',
      orientation: ['portrait', 'landscape'],
    },
  });
  try {
    pushStack(HOME_SCREEN.name);
  } catch (e) {
    console.log(e);
  }
}
export const toggleMenu = bool => {
  Navigation.mergeOptions('leftSideDrawer', {
    sideMenu: {
      left: {
        visible: bool,
      },
    },
  });
};

export const pushScreen = async (componentId, toPush, props = {}) => {
  return Navigation.push(componentId, {
    component: {
      name: toPush,
      passProps: props,
      options: {
        sideMenu: {
          left: {
            enabled: false,
            visible: false,
            shouldStretchDrawer: true,
          },
        },
        animations: {
          push: {
            waitForRender: true,
          },
        },
      },
    },
  });
};

export const pushScreenNoBack = async (componentId, toPush, props = {}) => {
  return Navigation.push(componentId, {
    component: {
      name: toPush,
      passProps: props,
      options: {
        popGesture: false,
        sideMenu: {
          left: {
            enabled: false,
            visible: false,
            shouldStretchDrawer: true,
          },
        },
        animations: {
          push: {
            waitForRender: true,
          },
        },
      },
    },
  });
};

export const pushPortraitScreen = async (componentId, toPush, props = {}) => {
  return Navigation.push(componentId, {
    component: {
      name: toPush,
      passProps: props,
      options: {
        layout: {
          orientation: ['portrait'],
        },
        popGesture: false,
        sideMenu: {
          left: {
            enabled: false,
            visible: false,
            shouldStretchDrawer: true,
          },
        },
        animations: {
          push: {
            waitForRender: true,
          },
        },
      },
    },
  });
};

export const closeMenu = () => {
  return Navigation.mergeOptions('leftSideDrawer', {
    sideMenu: {
      left: {
        visible: false,
      },
    },
  });
};

export const showModal = (toShow, props) => {
  return Navigation.showModal({
    component: {
      name: toShow,
      passProps: props,
      options: {
        animations: {
          push: {
            waitForRender: true,
          },
        },
        layout: {
          componentBackgroundColor: 'transparent',
        },
        modalPresentationStyle: 'overCurrentContext',
        topBar: {
          visible: false,
          animate: true,
        },
      },
    },
  });
};

export const showOverlay = (toShow, props) => {
  return Navigation.showOverlay({
    component: {
      options: {
        overlay: {
          interceptTouchOutside: false,
        },
        layout: {
          componentBackgroundColor: 'transparent',
        },
      },
      name: toShow,
      passProps: props,
    },
  });
};

export const dismissOverlay = componentId => {
  return Navigation.dismissOverlay(componentId);
};

export const dismissModal = componentId => {
  return Navigation.dismissModal(componentId);
};

export const popComponent = componentId => {
  return Navigation.pop(componentId);
};

export const popToRoot = componentId => Navigation.popToRoot(componentId);

export const dismissAllModals = () => Navigation.dismissAllModals();
