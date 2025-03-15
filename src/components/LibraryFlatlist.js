import React from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const LibraryFlatlist = ({ data }) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.imageContainer} >
                    <Image source={item.image} style={styles.image} />
                </TouchableOpacity>
            )}
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