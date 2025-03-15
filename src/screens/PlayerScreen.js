import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppHeader from "../components/AppHeader";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { colors } from "../theme/Colors";

const PlayerScreen = () => {
    return (
        <Screen>
            <AppHeader title={"Song Title"} playListIcon />
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/icon.png")} style={styles.image}
                    resizeMode="contain" />
            </View>
            <View style={styles.songInfo}>
                <View style={styles.songDetails}>
                    <TouchableOpacity>

                        <MaterialCommunityIcons name="heart" color={colors.danger}
                            size={40} />

                    </TouchableOpacity>
                    <View style={styles.songTitleAndArtist}>
                        <AppText text={"Song Title"} customStyles={styles.songTitle} />
                        <AppText text={"Song Artist"} customStyles={styles.songArtist} />
                    </View>
                </View>

                <TouchableOpacity>

                    <MaterialCommunityIcons name="dots-vertical" color={colors.white}
                        size={40} />

                </TouchableOpacity>

            </View>

            <View style={styles.songProgres}>
                <Slider

                    style={styles.Slider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor='#FFFFFF'
                    maximumTrackTintColor='#080808'
                    thumbTintColor={colors.white}
                />
                <View style={styles.durations}>
                    <AppText text={"00:45"} />
                    <AppText text={"04:45"} />
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="shuffle-variant" color={colors.white}
                        size={30} />
                </TouchableOpacity>

                <View style={styles.songControls}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="skip-previous" color={colors.white}
                            size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="play" color={colors.white}
                            size={50} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <MaterialCommunityIcons name="skip-next" color={colors.white}
                            size={30} />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="playlist-play" color={colors.white}
                        size={30} />
                </TouchableOpacity>
            </View>
        </Screen>
    )
}

export default PlayerScreen;

const styles = StyleSheet.create({
    imageContainer: {

    },
    image: {
        width: '80%',
        height: 300,
        alignSelf: 'center',
        borderRadius: 30,
    },
    songInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 40,

    },
    songDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    songTitleAndArtist: {
        marginLeft: 10,
    },
    songArtist: {
        fontWeight: 'normal',
    },
    songTitle: {
        fontSize: 20,
        fontWeight: 'normal',

    },
    songProgres: {
        paddingHorizontal: 20,
    },
    durations: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: 30,

    },
    songControls: {
        flexDirection: 'row',
        alignItems: "center",
    },
});