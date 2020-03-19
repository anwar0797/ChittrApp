import React from 'react';
import {Image, Dimensions} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {IMAGE} from './src/constants/Image';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Root } from "native-base";

console.disableYellowBox = true;


import {
  SideMenu,
  Feed,
  FeedDetail,
  Search,
  SearchDetail,
  Profile,
  Setting,
  Login,
  Register,
  postChit,
  Location
} from './src/component';

const navOptionHandler = navigation => ({
  header: null,
});

const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: navOptionHandler,
  },
  FeedDetail: {
    screen: FeedDetail,
    navigationOptions: navOptionHandler,
  },
});

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: navOptionHandler,
  },
  SearchDetail: {
    screen: SearchDetail,
    navigationOptions: navOptionHandler,
  },
});

const MainTabs = createBottomTabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({focused}) => (
        // <Image
        //   source={IMAGE.ICON_MENU}
        //   resizeMode="contain"
        //   style={{width: 20, height: 20}}
        // />
        <FontAwesome
          name="home"
          size={30}
          color={focused ? 'rgb(29, 161, 242)' : 'rgb(136, 153, 166)'}
        />
      ),
    },
  },
  Search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({focused}) => (
        // <Image
        //   source={IMAGE.ICON_MENU}
        //   resizeMode="contain"
        //   style={{width: 20, height: 20}}
        // />
        <FontAwesome
          name="search"
          size={30}
          color={focused ? 'rgb(29, 161, 242)' : 'rgb(136, 153, 166)'}
        />
      ),
      //tabBarOptions:{
        //style:{

        //}
      //}
    },
  },
});

const MainStack = createStackNavigator(
  {
    Home: {
      screen: MainTabs,
      navigationOptions: navOptionHandler,
    },
    Setting: {
      screen: Setting,
      navigationOptions: navOptionHandler,
    },
    Profile: {
      screen: Profile,
      navigationOptions: navOptionHandler,
    },
    postChit: {
      screen: postChit,
      navigationOptions: navOptionHandler
    },
    Location: {
      screen: Location,
      navigationOptions: navOptionHandler
    },
  },
  {initialRouteName: 'Home'},
);

const appDrawer = createDrawerNavigator(
  {
    drawer: MainStack,
  },
  {
    contentComponent: SideMenu,
    drawerWidth: (Dimensions.get('window').width * 3) / 4,
  },
);

const authStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: navOptionHandler,
  },
  Register: {
    screen: Register,
    navigationOptions: navOptionHandler,
  },
});

const MainApp = createSwitchNavigator(
  {

    app: appDrawer,
    auth: authStack,
  },
  {
    //initialRouteName: 'auth',
    initialRouteName: 'app'
  },
);

const AppNavigator = createAppContainer(MainApp);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;

// export default class App extends React.Component {
//   render() {
//     return <AppNavigator />;
//   }
// }
