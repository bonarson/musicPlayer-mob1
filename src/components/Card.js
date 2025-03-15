
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../theme/Colors";
import AppText from "./AppText";

const Card = ({ iconName, title, itemCount, type, onPress }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.card}
        >
            <MaterialCommunityIcons name={
                title && type == "playlist" ? "playlist-music" : title && type == "folder" ? "folder" : iconName
            }
                size={50} color={colors.white} />
            {title && <AppText text={title} customStyles={styles.title} />}
            {itemCount && <AppText text={itemCount} customStyles={styles.itenCount} />}
        </TouchableOpacity>
    )

}
export default Card;

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.secondary,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5.6,
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
    }
});