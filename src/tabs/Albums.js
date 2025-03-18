import * as MusicLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { View } from "react-native";
import LibraryFlatlist from "../components/LibraryFlatlist";



const Albums = () => {

    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        MusicLibrary.getAlbumsAsync()
            .then((albums) => {
                setAlbums(albums);
            })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <LibraryFlatlist data={albums} dataType="album" />
        </View>
    )
}
export default Albums;