import React, { useState } from 'react'

import ReactMapGL from 'react-map-gl'
import { Sensor } from '../../ApI/Sensor/Sensor'

const TOKEN = 'pk.eyJ1IjoiY29kZXN0YXItaW90IiwiYSI6ImNraDZjeTRjcTA5Z2Eyd281djNnc2d3eHUifQ.VcY4aGyFHBQo_r701-3A_A'

type MapProps = Readonly<{
  sensorsData: Sensor[]
}>

type MapViewport = Readonly<{
  latitude: number
  longitude: number
  zoom: number
  bearing: number
  pitch: number
}>

const defaultViewport: MapViewport = {
  latitude: -1.9444,
  longitude: 30.0616,
  zoom: 7.8,
  bearing: 0,
  pitch: 0,
}

const getFirstSensorData = (sensors: Sensor[]): MapViewport => {
  if (!sensors.length) {
    return defaultViewport
  }

  const {
    coordinates: [lat, lng],
  } = sensors[0]

  return {
    ...defaultViewport,
    latitude: lat,
    longitude: lng,
  }
}

export const Map = (props: MapProps) => {
  const [viewport, setViewport] = useState(getFirstSensorData(props.sensorsData))

  return (
    <div className="mapbox-react">
      <ReactMapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={TOKEN}
      />
    </div>
  )
}
