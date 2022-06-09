import { useEffect, useState } from "react";
import { Button } from "react-native";
import "react-native-gesture-handler";
import MainScreen from "./screens/MainScreen";
import { useFonts } from "expo-font";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { CartReducer } from "./store/reducers/cart";
import OrderReducer from "./store/reducers/orders";
import ProductsReducer from "./store/reducers/products";
import { AuthReducer } from "./store/reducers/auth";
import thunk from "redux-thunk";
import * as Notifications from "expo-notifications";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const store = configureStore({
  reducer: {
    cart: CartReducer,
    orders: OrderReducer,
    products: ProductsReducer,
    auth: AuthReducer,
  },
  middleware: [thunk],
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  console.log(expoPushToken)
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => console.log(token));
  //   const subscription = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       console.log("NOTIFICATION RECEIVED");
  //       console.log(notification);
  //     }
  //   );

  //  const subscription2=  Notifications.addNotificationResponseReceivedListener((response) => {
  //   console.log('NOTIFICATION RESPONSE RECEIVED')  
  //   console.log(response);
  //   });
  //   return ()=>{
  //   subscription.remove()
  //   subscription2.remove()
  //   }
  // }, []);
  const [loaded] = useFonts({
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

 
  return (
    <Provider store={store}>
      <MainScreen />
      {/* <Button title="notification" onPress={async () => {
          await schedulePushNotification();
        }} /> */}
    </Provider>
  );
}
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token)

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}