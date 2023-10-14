import ProductOverview from "../screens/ProductOverview";
import ProductsDetails from "../screens/ProductsDetails";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import {
  NavigationContainer,
  DrawerActions,
  useNavigationContainerRef,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { IoniconsHeaderButton } from "../UI/HeaderButton";
import { StyleSheet, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../constans/colors";
import { useRoute } from "@react-navigation/native";
import {
  FontAwesome,
  Feather,
  AntDesign,
  Ionicons,
  Foundation,
} from "@expo/vector-icons";
import {useDispatch} from 'react-redux'
import AdminScreen from "../screens/AdminScreen";
import EditScreen from "../screens/EditScreen";
import { logOut } from "../store/actions/auth";


const Drawer = createDrawerNavigator();


const defaulFunction = (nav) => {
  return {
    headerStyle: { backgroundColor: Colors.primary },
    orientation:'all',
    headerTintColor: "white",
    drawerActiveTintColor: Colors.primary,
    drawerActiveBackgroundColor: "#F2F0F0",
    drawerInactiveTintColor: "black",
    drawerLabelStyle: { fontFamily: "OpenSans-Bold", fontSize: 17 },
    headerTitleStyle: { fontFamily: "OpenSans-Bold" },
    drawerItemStyle: {
      borderRadius: 0,
      width: "100%",
      marginLeft: 0,
    },
  };
};

function CustomDrawerContent(props) {
  const dispatch =useDispatch()
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        labelStyle={{
          color: "white",
          fontFamily: "OpenSans-Bold",
          fontSize: 17,
          marginLeft: 90,
        }}
        style={styles.toggle}
        label="LOGOUT"
        onPress={() => dispatch(logOut())}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  toggle: {
    backgroundColor: Colors.primary,
    marginHorizontal: 0,
    borderRadius: 0,
    height: 50,
  },
});

const Product = createNativeStackNavigator();
const Admin = createNativeStackNavigator();

const productDefaultFunction = (nav) => {
  return {
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            IconComponent={Ionicons}
            title="list"
            iconName="menu-outline"
            iconSize={30}
            style={{ marginRight: 15, marginLeft: -15 }}
            color="white"
            onPress={() => nav.dispatch(DrawerActions.openDrawer())}
          />
        </HeaderButtons>
      );
    },
    headerTitle: "All Products",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            IconComponent={AntDesign}
            title="shoppingcart"
            iconName="shoppingcart"
            color="white"
            onPress={() => nav.navigate("CartItems")}
          />
        </HeaderButtons>
      );
    },
  };
};

const AdminDefaultFunction = (nav) => {
  return {
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            IconComponent={Ionicons}
            title="list"
            iconName="menu-outline"
            iconSize={30}
            style={{ marginRight: 15, marginLeft: -15 }}
            color="white"
            onPress={() => nav.dispatch(DrawerActions.openDrawer())}
          />
        </HeaderButtons>
      );
    },
    headerTitle: "Admin",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            IconComponent={Feather}
            title="edit"
            iconName="edit"
            style={{marginRight:-15}}
            color="white"
            onPress={() => nav.navigate("Edit Product",{productId:''})}
          />
        </HeaderButtons>
      );
    },
  };
};

const defaultHeader = {
  headerStyle: { backgroundColor: Colors.primary },
  headerTitleStyle: { color: "white" },
  fontFamily: "OpenSans-Bold",
  headerTintColor: "white",
};

const ProductsNavigator = () => {
  return (
    <Product.Navigator screenOptions={defaultHeader}>
      <Product.Screen
        name="Product"
        component={ProductOverview}
        options={({ navigation }) => productDefaultFunction(navigation)}
      />
      <Product.Screen name="Details" component={ProductsDetails} />
      <Product.Screen name="CartItems" component={CartScreen} />
    </Product.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <Admin.Navigator screenOptions={defaultHeader}>
      <Admin.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={({navigation})=>AdminDefaultFunction(navigation)}
      />
      <Admin.Screen name="Edit Product" component={EditScreen}/>
    </Admin.Navigator>
  );
};

function ShopNavigator() {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        screenOptions={({ navigation }) => defaulFunction(navigation)}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Products"
          component={ProductsNavigator}
          options={{
            drawerIcon: ({ color }) => {
              return (
                <FontAwesome name="shopping-cart" size={24} color={color} />
              );
            },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            drawerIcon: ({ color }) => {
              return <Feather name="list" size={24} color={color} />;
            },
            headerTitle: "Your Orders",
          }}
        />
        <Drawer.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            drawerIcon: ({ color }) => {
              return <Feather name="edit" size={24} color={color} />;
            },
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default ShopNavigator;
