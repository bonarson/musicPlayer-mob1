import { View } from 'react-native';
import { useSelector } from 'react-redux';
import AppHeader from '../components/AppHeader';
import Screen from '../components/Screen';
import SongsList from '../components/SongsList';
import { globalStyles } from '../theme/GlobalStyles';

const MostPlayedScreen = () => {
    const mostPlayed = useSelector((state) => state.storage.mostPlayed);

    return (
        <Screen>
            <AppHeader title={"Most played songs"} searchIcon />
            <View style={globalStyles.container}>
                <SongsList songs={mostPlayed} />
            </View>
        </Screen>
    )
}

export default MostPlayedScreen;

