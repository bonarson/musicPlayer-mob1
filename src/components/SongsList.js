import { FlatList } from "react-native";
import Song from "./Song";

const SongsList = ({ songs }) => {
    return (
        <FlatList
            data={songs}
            renderItem={({ item }) => <Song {...item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
        />
    )
}
export default SongsList;