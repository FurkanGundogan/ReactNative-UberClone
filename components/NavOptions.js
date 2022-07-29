import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
const NavOptions = () => {
  const origin=useSelector(selectOrigin)
    const navigation=useNavigation()

    const data=[
        {
        id:"0",
        title:"Get a Ride",
        image:"https://links.papareact.com/3pn",
        screen:"MapScreen"
    },
    {
        id:"1",
        title:"Order Food",
        image:"https://links.papareact.com/28w",
        screen:"EatsScreen"
    }
]
  return (
    <View>
      <FlatList
      data={data}
      horizontal
      keyExtractor={(item)=>item.id}
      renderItem={({item})=>(
        <TouchableOpacity
        disabled={!origin}
        onPress={()=>navigation.navigate(item.screen)}
        style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
        >
            <View style={tw`${!origin ? "opacity-20":"opacity-100"}`}>
                <Image
                style={{width:100,height:100,resizeMode:"contain"}}
                source={{
                    uri:item.image
                }}
                />
                <Text style={tw`mt-2 text-lg font-semibold `}>{item.title}</Text>
                <Icon
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                type='antdesign'
                name='arrowright'
                color='white'
                />
            </View>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

export default NavOptions