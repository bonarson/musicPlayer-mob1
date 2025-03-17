import { ActivityIndicator, View } from "react-native";
import AppSearchHeader from "../components/AppSearchHeader";
import Screen from "../components/Screen";
import SongsList from "../components/SongsList";
import useMusicLibrary from "../hooks/useMusicLibrary";
import { colors } from "../theme/Colors";
import { globalStyles } from "../theme/GlobalStyles";

const SearchScreen = () => {
    const { filteredAssets, search, isLoadingMore, loadMoreSearch } = useMusicLibrary();

    return (
        <Screen>
            <AppSearchHeader title="Search" searchIcon onSearch={search} />
            <View style={globalStyles.container}>
                <SongsList
                    songs={filteredAssets}
                    onEndReachedThreshold={0.5}
                    onEndReached={loadMoreSearch}
                    listFooterComponent={() =>
                        isLoadingMore ? (
                            <ActivityIndicator size="large" color={colors.white} />
                        ) : null
                    }
                />
            </View>
        </Screen>
    );
};

export default SearchScreen;
