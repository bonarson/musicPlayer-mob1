import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { formatDuration } from "../algo/FormatDuration";
import { colors } from "../theme/Colors";
import AppText from "./AppText";
import ArtworkImage from "./ArtworkImage";

const Song = ({ id, filename, title, uri, artist, duration, image, artwork }) => {
    const navigation = useNavigation();

    const goToPlayerScreen = () => {
        navigation.navigate("Player", {
            id,
            filename,
            title,
            uri,
            artist,
            duration,
            artwork,

        });
    };


    return (
        <TouchableOpacity
            style={styles.container}
            onPress={goToPlayerScreen}
        >
            <View style={styles.songMainDetails}>
                {/* <Image source={image} resizeMode="contain" style={styles.image} /> */}
                <ArtworkImage artwork={artwork} styles={styles.image} />
                <View style={styles.songInfo}>
                    <AppText text={filename || title} numberOfLines={2} />
                    <AppText text={artist || "<unknown>"} />
                </View>
            </View>
            <View>
                <AppText text={formatDuration(duration)} />
            </View>
        </TouchableOpacity>
    );
};

export default Song;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        marginBottom: 5,
        borderBottomWidth: 0.7,
        borderBottomColor: colors.white,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    songMainDetails: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    songInfo: {
        marginLeft: 30,
        flex: 1,
        maxWidth: "60%",
    },
});
