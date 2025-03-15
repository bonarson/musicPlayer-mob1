import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FolderScreen from "../screens/FolderScreen";
import FolderSongsScreen from "../screens/FolderSongsScreen";

const NativeStack = createNativeStackNavigator();

const FolderNavigator = () => {
    return ( 
        <NativeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <NativeStack.Screen name="Folders" component={FolderScreen} />
            <NativeStack.Screen name="FoldersSongs" component={FolderSongsScreen} />
        </NativeStack.Navigator>
    );
};

export default FolderNavigator;
