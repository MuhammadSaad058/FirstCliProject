import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import Images from './Src/Screens/DoctorProfilingScreens/Images';
import ROUTE from './Src/Screens/navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ApiProvider} from './Src/Components/ApiContext'; // Import your ApiProvider
import {Provider} from 'react-redux';
import store from './Src/Components/redux/store';
import CustomDrawerContent from './Src/Screens/CustomDrawerContent';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color, size}) => {
          let Icon;

          switch (route.name) {
            case 'Home':
              Icon = Images.HomeIcon;
              break;
            case 'AssistantIcon':
              Icon = Images.AssistantIcon;
              break;
            case 'Appointments':
              Icon = Images.AppointmentsIcon;
              break;
            case 'TelemedicineIcon':
              Icon = Images.TelemedicineIcon;
              break;
            case 'MenuIcon':
              Icon = Images.MenuIcon;
              break;
          }

          return <SvgXml xml={Icon} width={size} height={size} fill={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={ROUTE.DoctorProfile} />
      <Tab.Screen name="AssistantIcon" component={ROUTE.AddToCartScreen} />
      <Tab.Screen name="Appointments" component={ROUTE.ApiScreen} />
      <Tab.Screen name="TelemedicineIcon" component={ROUTE.PatientsList} />
      <Tab.Screen name="MenuIcon" component={ROUTE.CommunitiesScreen} />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeDrawer"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="MyPostScreen"
        component={ROUTE.MyPostScreen}
        options={{headerShown: false}}
      />
       <Drawer.Screen
        name="ChatUserScreen"
        component={ROUTE.ChatUserScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}
function App() {
  return (
    // Wrap the NavigationContainer with ApiProvider to provide context to all screens
    <Provider store={store}>
      <ApiProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="FirstOnboardScreen">
            <Stack.Screen
              options={{headerShown: false}}
              name="FirstOnboardScreen"
              component={ROUTE.FirstOnboardScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="SecondOnboardScreen"
              component={ROUTE.SecondOnboardScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ThirdOnboardScreen"
              component={ROUTE.ThirdOnboardScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="SignUpScreen"
              component={ROUTE.SignUpScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="SignInScreen"
              component={ROUTE.SignInScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="CompleteProfile"
              component={ROUTE.CompleteProfile}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="DoctorProfile"
              component={DrawerNavigator}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ForgotPasswordScreen"
              component={ROUTE.ForgotPasswordScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="OtpVerificationScreen"
              component={ROUTE.OtpVerificationScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="NewPasswordScreen"
              component={ROUTE.NewPasswordScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="PatientListScreen"
              component={ROUTE.PatientsList}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ContactScreen"
              component={ROUTE.ContactScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="CallScreen"
              component={ROUTE.CallScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="VideoCallScreen"
              component={ROUTE.VideoCallScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="LabTestsScreen"
              component={ROUTE.LabTestsScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="PostDetailScreen"
              component={ROUTE.PostDetailScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="AdminDashboardScreen"
              component={ROUTE.AdminDashboardScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="UserDetailScreen"
              component={ROUTE.UserDetailScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="UserPostsScreen"
              component={ROUTE.UsersPostScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ReportedPostScreen"
              component={ROUTE.ReportedPostScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="AddToCartScreen"
              component={ROUTE.AddToCartScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="UserList"
              component={ROUTE.UserList}
            />
                <Stack.Screen
              options={{headerShown: false}}
              name="ChatScreen"
              component={ROUTE.ChatScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApiProvider>
    </Provider> // End of ApiProvider wrapping
  );
}

export default App;
