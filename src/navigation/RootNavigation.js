import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "../screens/FavoriteScreen";
import HomeScreen from "../screens/HomeScreen";
import LibraryScreen from "../screens/LibraryScreen";
import MostPlayedScreen from "../screens/MostPlayedScreen";
import PlayListScreen from "../screens/PlayListScreen";
import PlayerScreen from "../screens/PlayerScreen";
import RecentAddScreen from "../screens/RecentAddScreen";
import RecentPlayScreen from "../screens/RecentPlayScreen";
import SearchScreen from "../screens/SearchScreen";
import SongsListScreen from "../screens/SongsListScreen";
import SplashScreen from "../screens/SplashScreen";
import FolderNavigator from "./FolderNavigator";



const NativeStack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NativeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <NativeStack.Screen name="Splash" component={SplashScreen} />
            <NativeStack.Screen name="Home" component={HomeScreen} />
            <NativeStack.Screen name="Library" component={LibraryScreen} />
            <NativeStack.Screen name="FolderNavigator" component={FolderNavigator} />
            <NativeStack.Screen name="Favorites" component={FavoriteScreen} />
            <NativeStack.Screen name="MostPlayed" component={MostPlayedScreen} />
            <NativeStack.Screen name="Player" component={PlayerScreen} />
            <NativeStack.Screen name="PlayList" component={PlayListScreen} />
            <NativeStack.Screen name="RecentPlay" component={RecentPlayScreen} />
            <NativeStack.Screen name="RecentAdd" component={RecentAddScreen} />
            <NativeStack.Screen name="Search" component={SearchScreen} />
            <NativeStack.Screen name="SongsList" component={SongsListScreen} />
        </NativeStack.Navigator>
    );
};


export default RootNavigator;

