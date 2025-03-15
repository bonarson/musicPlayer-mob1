import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import AppHeader from "../components/AppHeader";
import AppText from "../components/AppText";
import Card from "../components/Card";
import Input from "../components/Input";
import Screen from "../components/Screen";
import { categories } from "../data/Categories";
import { playList } from "../data/PlayLists";
import { colors } from "../theme/Colors";



const HomeScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    const handleCategoriesPress = (screenName) => {
        navigation.navigate(screenName);
    };

    const handlePlaylistPress = (item) => {
        if (item.title) {
            navigation.navigate("PlayList");
        } else {
            setShowModal(true);
        }
    }

    return (
        <Screen >
            <AppHeader primaryScreen title={"Music Player"} searchIcon />
            <View style={styles.container}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => <Card{...item}
                        onPress={() => handleCategoriesPress(item.screenName)}
                    />}
                    keyExtractor={item => item.title}
                    numColumns={3}
                    style={styles.flatlist}
                />
                <View style={styles.playlistSection}>
                    <AppText text={"PlayList"} customStyles={styles.playlistSectionTitle} />
                    <FlatList
                        data={[...playList, { iconName: "plus" }]}
                        renderItem={({ item }) => <Card{...item} type={"playlist"}
                            onPress={() => handlePlaylistPress(item)}
                        />}
                        keyExtractor={item => item.title}
                        numColumns={3}
                        style={styles.flatlist}
                    />
                </View>
            </View>
            <Modal visible={showModal} onRequestClose={() => setShowModal(false)} transparent>


                <View style={styles.modalOverlay} />

                <View style={styles.modalContent}>
                    <View style={styles.form}>
                        {/* <TextInput placeholder="Playlist Name" style={styles.textInput} placeholderTextColor={colors.white} /> */}
                        <Input placeholder={"Playlist Name"} />
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                                <AppText text={"Cancel"} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton}>
                                <AppText text={"Add"} />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>

            </Modal>
        </Screen>
    )
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: 'center',



    },
    flatlist: {
        flex: 1,


    },
    form: {
        width: '70%',
        height: 170,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    // textInput: {

    //     width: '80%',
    //     alignSelf: 'center',
    //     color: colors.white,
    //     borderBottomColor: colors.white,
    //     borderBottomWidth: 1,

    // },
    buttonsContainer: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: 'flex-end',

    },
    modalButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    modalOverlay: {
        backgroundColor: colors.blackTransparent,
        width: "100%",
        height: "100%",
        position: "absolute",

    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playlistSection: {
        flex: 1,
        width: '100%',


    },

    playlistSectionTitle: {
        fontSize: 20,
        fontWeight: 'normal',
        marginLeft: 7,
        marginBottom: 6,
    },
});