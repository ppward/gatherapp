import {createDrawerNavigator} from '@react-navigation/drawer';
import SecondLayer from './SecondLayer';
const Drawer = createDrawerNavigator();

export default function FirstLayer() {
  return (
    <Drawer.Navigator
      screenOptions={{drawerPosition: 'right', headerShown: false}}>
      <Drawer.Screen name="메인탭" component={SecondLayer} />
    </Drawer.Navigator>
  );
}
