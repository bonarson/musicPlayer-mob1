import { Audio } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { Provider } from "react-redux";
import Main from "./src/Main";
import { store } from "./src/app/store";

export default function App() {
  useEffect(() => {
    const setupApp = async () => {
      await requestPermissions();
      await audioSetup();
    };

    setupApp();
  }, []);

  // Demander la permission d'accès aux fichiers média et stockage
  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission refusée pour accéder à la bibliothèque musicale.");
    }

    // Permissions supplémentaires pour Android
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Accès au stockage refusé.");
        }
      } catch (err) {
        console.warn("Erreur lors de la demande de permission:", err);
      }
    }
  };

  // Configuration audio
  const audioSetup = async () => {
    await Audio.setAudioModeAsync({
      playThroughEarpieceAndroid: true,
      staysActiveInBackground: true,
    });
  };

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
