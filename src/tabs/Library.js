import { ActivityIndicator, View } from "react-native";
import SongsList from "../components/SongsList";
import useMusicLibrary from "../hooks/useMusicLibrary";
import { colors } from "../theme/Colors";

const Library = () => {

    const { assets, isLoadingMore, loadMore } = useMusicLibrary();

    // Log the assets to check the songs
    // console.log("Assets: ", assets);

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
            <SongsList
                songs={assets}
                onEndReachedThreshold={0.5}
                onEndReached={loadMore}
                ListFooterComponent={() => isLoadingMore ? (
                    <ActivityIndicator size={"large"} color={colors.white} />) : null}
            />
        </View >
    )
}

export default Library;
