import { View } from 'react-native';
import AppHeader from '../components/AppHeader';
import Screen from '../components/Screen';
import SongsList from '../components/SongsList';
import { songs } from '../data/Songs';
import { globalStyles } from '../theme/GlobalStyles';

const MostPlayedScreen = () => {
    return (
        <Screen>
            <AppHeader title={"Most played songs"} searchIcon />
            <View style={globalStyles.container}>
                <SongsList songs={songs} />
            </View>
        </Screen>
    )
}

export default MostPlayedScreen;

