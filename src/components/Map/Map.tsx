import React, { FC, useState } from 'react'

import ReactMapGL, { Marker } from 'react-map-gl'
import { Sensor } from '../../API/Sensor/Sensor'
import styles from './Map.module.scss'

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

type SensorData = Sensor &
  Readonly<{
    showDetails: boolean
  }>

function mapSensorsData(sensors: Sensor[]) {
  console.log(sensors)
  return sensors.reduce<Record<string, SensorData>>(
    (acc, curr, index) => ({
      ...acc,
      [index.toString()]: {
        ...curr,
        showDetails: false,
      },
    }),
    {},
  )
}

const Markers: FC<MapProps> = ({ sensorsData }) => {
  const [data, setData] = useState<Record<string, SensorData>>(() => mapSensorsData(sensorsData))

  const toggleShowDetails = (index: string) => () => {
    setData((data) => ({
      ...data,
      [index]: {
        ...data[index],
        showDetails: !data[index].showDetails,
      },
    }))
  }

  return (
    <>
      {Object.entries(data)
        .filter(([, sensorData]) => sensorData.coordinates[0] > 0)
        .map(([index, sensorData]) => {
          const {
            showDetails,
            temperature,
            coordinates: [lat, lng],
          } = sensorData

          return (
            <Marker key={index} className={styles.marker} longitude={lng} latitude={lat}>
              <span onClick={toggleShowDetails(index)}>
                <span>📍</span>
                {showDetails ? (
                  <div className={styles.details}>
                    <p>Temperature: {temperature}</p>
                  </div>
                ) : null}
              </span>
            </Marker>
          )
        })}
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
