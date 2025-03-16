
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";

const ArtworkImage = ({ artwork, styles }) => {
    const [artworkExists, SetArtworkExists] = useState(false);

    useEffect(() => {
        FileSystem.getInfoAsync(artwork).then(({ exists }) => {
            SetArtworkExists(exists);
        });
    }, [artwork]);
    return (
        <Image
        source={artworkExists ? {uri: artwork}: require("../../assets/icon.png")}
        style={styles}
        resizeMode="contain"
        />
    )
};
export default ArtworkImage;

const styles=StyleSheet.create({});