import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice";
import NavFavs from "../components/NavFavs";

const HomeScreen = () => {
 
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
    <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : null} 
         style={{flex: 1 }}
         >
        <View style={tw`p-5`}>
          <Image
            source={{
              uri: "https://links.papareact.com/gzs",
            }}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
          <GooglePlacesAutocomplete
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );

              dispatch(setDestination(null));
            }}
            returnKeyType={"search"}
            fetchDetails={true}
            placeholder="Where from?"
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            minLength={2}
            enablePoweredByContainer={false}
          />
            
          <NavOptions />
          <NavFavs />

        </View>
     </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
});
