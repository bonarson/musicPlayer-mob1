import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/Colors";
import AppText from "./AppText";


const Song = ({ title, artist, duration, image }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container}
            onPress={() => navigation.navigate("Player")}
        >
            <View style={styles.songMainDetails}>
                <Image source={image} resizeMode="contain" style={styles.image} />
                <View style={styles.songInfo}>
                    <AppText text={title} />
                    <AppText text={artist} />

                </View>
            </View>
            <View>
                <AppText text={duration} />
            </View>
        </TouchableOpacity>
    )
}
export default Song;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginBottom: 5,
        borderBottomWidth: 0.1,
        borderBottomColor: colors.white,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,

    },
    songMainDetails: {
        flexDirection: 'row',
    },
    songInfo: {
        marginLeft: 10,
    }
});