import { View } from "react-native";
import AppSearchHeader from "../components/AppSearchHeader";
import Screen from "../components/Screen";
import SongsList from "../components/SongsList";
import { songs } from "../data/Songs";
import { globalStyles } from "../theme/GlobalStyles";


const SearchScreen = () => {
    return (
        <Screen>
            <AppSearchHeader title={"Search"} searchIcon />
            <View style={globalStyles.container}>
                <SongsList songs={songs} />
            </View>
        </Screen>
    )
}
export default SearchScreen;