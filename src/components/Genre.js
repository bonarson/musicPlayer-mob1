import { StyleSheet, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/Colors";
import AppText from "./AppText";

const Genre = ({ id, title }) => {
    const navigation = useNavigation();
    const goToAlbumsSongs = () => {
        navigation.navigate("SongsList", {
            genreId: id,
            title: `Genres - ${title}`,
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={goToAlbumsSongs}>
            <View style={styles.innerContent}>
                <MaterialCommunityIcons name="music-box" size={50} color={colors.white} />
                <AppText text={title} customStyles={{ textAlign: "center" }} />
            </View>
        </TouchableOpacity>
    )
}
export default Genre;

const styles = StyleSheet.create({

    container: {
        width: "50%",
        height: 150,
        padding: 5
    },
    innerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: 10,

    },
    imges: {
        flex: 1,
        width: "90%",
        height: "100%",
        borderRadius: 10,
    }
});

