
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAssets, setQueue } from "../features/queue/queueSlice";

const useMusicLibrary = (sortBy = MediaLibrary.SortBy.default) => {
    const [lastMusicAsset, setLastMusicAsset] = useState({});
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const assets = useSelector((state) => state.queue.assets);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const dispatch = useDispatch();


    useEffect(() => {
        getAudios();
    }, [])

    useEffect(() => {
        dispatch(setQueue(assets));
        setFilteredAssets(assets);
    }, [assets]);

    const getAudios = async () => {
        const results = await MediaLibrary.getAssetsAsync({
            first: 20,
            mediaType: MediaLibrary.MediaType.audio,
            sortBy: sortBy,
        });

        dispatch(setAssets(results.assets));

        setLastMusicAsset(results.endCursor);
    };
    const loadMore = async () => {
        setIsLoadingMore(true);
        const results = await MediaLibrary.getAssetsAsync({
            first: 20,
            mediaType: MediaLibrary.MediaType.audio,
            sortBy: sortBy,
            after: lastMusicAsset,

        });

        const newAssets = [...assets, ...results.assets];
        dispatch(setAssets(newAssets));

        setLastMusicAsset(results.endCursor);
        setIsLoadingMore(false);
    };


    const search = async (query) => {
        setSearchQuery(query);
        if (query !== "") {
            const results = await MediaLibrary.getAssetsAsync({
                mediaType: MediaLibrary.MediaType.audio,
                sortBy: sortBy

            });
            setFilteredAssets(results.assets.filter(asset =>
                asset.filename.toLocaleLowerCase().includes(query.toLocaleLowerCase())
            )
            );

            setLastMusicAsset(results.endCursor)
        } else {
            setFilteredAssets(assets);
        }
    };

    const loadMoreSearch = async () => {
        try {
            setIsLoadingMore(true);

            const results = await MediaLibrary.getAssetsAsync({
                after: lastMusicAsset,
                mediaType: MediaLibrary.MediaType.audio,
                sortBy: sortBy,
            });

            const newAssets = searchQuery !== ""
                ? [
                    ...filteredAssets,
                    ...results.assets.filter((asset) =>
                        asset.filename.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                ]
                : [...filteredAssets, ...results.assets];

            setFilteredAssets(newAssets);
            setLastMusicAsset(results.endCursor);
        } catch (error) {
            console.error("Erreur lors du chargement des musiques :", error);
        } finally {
            setIsLoadingMore(false);
        }
    };



    return { assets, isLoadingMore, loadMore, filteredAssets, search, loadMoreSearch };
};

export default useMusicLibrary;