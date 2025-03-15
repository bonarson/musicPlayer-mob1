import React from "react";
import { FlatList, View } from "react-native";
import AppHeader from "../components/AppHeader";
import Card from '../components/Card';
import Screen from '../components/Screen';
import { folders } from "../data/Folders";
import { globalStyles } from "../theme/GlobalStyles";


const FolderScreen = ({ navigation }) => {

    return (
        <Screen>
            <AppHeader title={"Folders"} searchIcon />
            <View style={globalStyles.container}>
                <FlatList
                    data={folders}
                    renderItem={({ item }) => <Card {...item} type={"folder"}

                        onPress={() => navigation.navigate("FoldersSongs")}
                    />}
                    keyExtractor={(item) => item.id}
                    numColumns={3}

                />

            </View>
        </Screen>
    )
}

export default FolderScreen;

