import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useRef } from "react";
import { useEffect } from "react";
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch=useDispatch()
  useEffect(() => {
    if (!origin | !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"],{
      edgePadding:{top:50,bottom:50,left:50,right:50}
    });
  }, [origin, destination]);


  useEffect(() => {
    if(!origin || !destination) return;
    const getTravelTime = async() =>{
      console.log(origin.description)
      console.log(destination.description)
      const url=`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      //https://maps.googleapis.com/maps/api/distancematrix/json?origins=Washington%2C%20DC&destinations=New%20York%20City%2C%20NY&units=imperial&key=AIzaSyD8MyPC-IlkxTUa3_d4bdLfGWWuGrA5UN0
      
      fetch(url)
      .then((res)=>res.json())
      .then(data=>{
        console.log(data)
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
      })


    }
    getTravelTime()
  }, [origin, destination,GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      region={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Starting Point"
          description={origin.description}
          identifier="origin"
        />
      )}
       {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination Point"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
