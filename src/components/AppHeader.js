import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/Colors";
import AppText from "./AppText";

const AppHeader = ({ primaryScreen, title, searchIcon, playListIcon, plusIcon, onPlusIconPress, clearIcon, onClearIconPress }) => {

    const navigation = useNavigation();

    const handlePress = () => {
        if (primaryScreen) {

        } else {
            navigation.goBack();
        }
    }
    return (
        <View style={styles.header}>
            <View style={styles.mainContent}>
                <TouchableOpacity onPress={handlePress}>
                    <MaterialCommunityIcons

                        name={primaryScreen ? "menu" : "arrow-left"}
                        color={colors.white}
                        size={35}
                    />
                </TouchableOpacity>



                <AppText text={title} customStyles={styles.title} />

            </View>

            <View style={styles.icons}>

                {searchIcon && (
                    <TouchableOpacity style={styles.searchIcon}
                        onPress={() => navigation.navigate("Search")}>

                        <MaterialCommunityIcons
                            name="magnify"
                            size={30}
                            color={colors.white}
                        />

                    </TouchableOpacity>
                )}

                {plusIcon && (
                    <TouchableOpacity onPress={onPlusIconPress}>

                        <MaterialCommunityIcons
                            name="plus-circle"
                            size={30}
                            color={colors.white}
                        />

                    </TouchableOpacity>
                )}

                {clearIcon && (
                    <TouchableOpacity onPress={onClearIconPress}>

                        <MaterialCommunityIcons
                            name="delete-empty"
                            size={30}
                            color={colors.white}
                        />

                    </TouchableOpacity>
                )}
            </View>



        </View>
    )
};

export default AppHeader

const styles = StyleSheet.create({
    header: {
        height: 55,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 30,
        backgroundColor: colors.primary,
        elevation: 10,
        paddingHorizontal: 15,

    },
    mainContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    icons: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
    },
    searchIcon: {
        justifyContent: "flex-end",

    },
});