import * as MusicLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { View } from "react-native";
import LibraryFlatlist from "../components/LibraryFlatlist";


const Artists = () => {
    const [filename, setArtists] = useState([]);

    useEffect(() => {
        MusicLibrary.getAlbumsAsync()
            .then((filename) => {
                setArtists(filename);
            })
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <LibraryFlatlist data={filename} dataType={"filename"} />
        </View>
    )
}
export default Artists;