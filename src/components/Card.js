
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/Colors";
import AppText from "./AppText";

const Card = ({ id, iconName, title, itemCount, type, onPress, deletePlaylist }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.card}
        >
            <View style={styles.innerContent} >
                <MaterialCommunityIcons name={
                    title && type == "playlist" ? "playlist-music" : title && type == "folder" ? "folder" : iconName
                }
                    size={50} color={colors.white} />
                {title && <AppText text={title} customStyles={styles.title} />}
                {itemCount && <AppText text={itemCount} customStyles={styles.itenCount} />}

                {title && type == "playlist" && (
                    <TouchableOpacity style={styles.trash} onPress={() => deletePlaylist(id)}>
                        <MaterialCommunityIcons name="close-box" size={20} color={colors.white} />
                    </TouchableOpacity>
                )

                }
            </View>

        </TouchableOpacity>
    )

}
export default Card;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: "33%",
        height: 100,
        padding: 5,

    },
    innerContent: {
        flex: 1,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,

        elevation: 10,
    },
    itenCount: {
        position: 'absolute',
        top: 5,
        right: 5,
        fontWeight: "normal",
        fontSize: 12,
    },
    title: {
        fontSize: 12.1,
        textAlign: "center",
    },
    trash: {
        position: 'absolute',
        right: 0,
        top: 0,

    }
});