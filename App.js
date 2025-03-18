import { Audio } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { Provider } from "react-redux";
import Main from "./src/Main";
import { store } from "./src/app/store";

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const setupApp = async () => {
      const permissionGranted = await requestPermissions();
      if (permissionGranted) {
        await audioSetup();
      }
    };

    setupApp();
  }, []);

  // Demander la permission d'accès aux fichiers média et stockage
  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission refusée pour accéder à la bibliothèque musicale.");
      Alert.alert("Permission Refusée", "L'application a besoin d'accès à vos fichiers médias.");
      return false;
    }

    // Permissions supplémentaires pour Android
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Accès au stockage refusé.");
          Alert.alert("Accès Refusé", "L'application a besoin d'accès au stockage.");
          return false;
        }
      } catch (err) {
        console.warn("Erreur lors de la demande de permission:", err);
        return false;
      }
    }

    setHasPermission(true);
    return true;
  };

  // Configuration audio
  const audioSetup = async () => {
    try {
      await Audio.setAudioModeAsync({
        playThroughEarpieceAndroid: true,
        staysActiveInBackground: true,
      });
      console.log("Configuration audio réussie.");
    } catch (error) {
      console.error("Erreur lors de la configuration audio:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la configuration audio.");
    }
  };

  if (!hasPermission) {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
