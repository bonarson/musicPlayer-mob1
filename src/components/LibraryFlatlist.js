import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Album from "./Album";
import Artist from "./Artist";
import Genre from "./Genre";

const LibraryFlatlist = ({ data, dataType }) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => {
                if (dataType === "albums") {
                    return <Album {...item} />;
                } else if (dataType === "artists") {
                    // Affiche les informations de l'artiste
                    return <Artist {...item} />;
                } else if (dataType === "genres") {
                    // Si dataType est "genres", affiche le nom du fichier audio
                    return <Genre {...item} />;
                } else {
                    return <Genre {...item} />;
                }
            }}



            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
        />
    );
};

export default LibraryFlatlist
const styles = StyleSheet.create({
    flatlist: {
        flex: 1,
        padding: 20,
        width: '95%',
        alignSelf: 'center',
    },
    imageContainer: {
        width: '50%',
        height: 135,
        padding: 5,

    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,

    },

});