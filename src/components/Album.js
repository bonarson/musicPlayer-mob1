import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ArtworkImage from "../components/ArtworkImage";


const Album = ({ artwork, title }) => {
    const navigation = useNavigation();
    const goToAlbumsSongs = () => {
        navigation.navigate("SongsList", {
            albumName: title,
            title:`Albums - ${title}`,
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={goToAlbumsSongs}>
            <View style={styles.innerContent}>
                <ArtworkImage artwork={artwork} styles={styles.imges} />
            </View>
        </TouchableOpacity>
    )
}

export default Album;
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
        width:"90%",
        height:"100%",
        borderRadius:10,
    }
});