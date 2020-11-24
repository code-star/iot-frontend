import React, { FC, useState } from 'react'

import ReactMapGL, { Marker } from 'react-map-gl'
import { Sensor } from '../../API/Sensor/Sensor'

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
  zoom: 15,
  bearing: 0,
  pitch: 0,
}

const getFirstSensorData = (sensors: Sensor[]): MapViewport => {
  if (!sensors.length) {
    return defaultViewport
  }

  const {
    coordinates: [lat, lng],
  } = sensors.filter((entry) => {
    return entry.coordinates[0] > 0
  })[0]

  return {
    ...defaultViewport,
    latitude: lat,
    longitude: lng,
  }
}

const Markers: FC<MapProps> = ({ sensorsData }) => {
  return (
    <>
      {sensorsData
        .filter((entry) => entry.coordinates[0] > 0)
        .map(({ coordinates: [lat, lng] }, index) => (
          <Marker key={index} longitude={lng} latitude={lat}>
            x
          </Marker>
        ))}
    </>
  )
}

export const Map: FC<MapProps> = ({ sensorsData }) => {
  const [viewport, setViewport] = useState(getFirstSensorData(sensorsData))

  return (
    <div className="mapbox-react">
      <ReactMapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={TOKEN}
      >
        <Markers sensorsData={sensorsData} />
      </ReactMapGL>
    </div>
  )
}
