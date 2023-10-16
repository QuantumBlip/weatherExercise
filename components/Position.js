import React, { useEffect, useState } from "react"
import * as Location from 'expo-location'
import Weather from "./Weather"
import { Text, View, StyleSheet } from "react-native"

export default function Position() {

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('Retrieving location...')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            let { status } = Location.requestForegroundPermissionsAsync()
            console.log(status)
            try {
                if (status !== 'granted') {
                    setMessage("Location not permittd.")
                } else {
                    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest })
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Location retrieved')
                }
            } catch (error) {
                setMessage("Error retrieving location.")
                console.log(error)
            }
            setIsLoading(false)
        })
    }, [])

    return (
        <View>
            <Text style={styles.coords}>{latitude.toFixed(3)},{longitude.toFixed(3)} </Text>
            <Text>{message} </Text>
            {isLoading === false &&
            <Weather longitude={longitude} latitude={latitude} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    coords: {
      paddingBottom: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });