import React, { useEffect, useState } from 'react'
import { Map } from '../Map/Map'
import { Sensor, SensorEntry, SensorJSON } from '../../API/Sensor/Sensor'
import iotJson from '../../iot.json'

const getData = async () => {
  try {
    const response = await fetch('https://codestar-iot-api.herokuapp.com/get')
    const json: SensorJSON = await response.json()
    // const json = iotJson;
    // TODO it would be much better to use RxJS to do this
    const sensorData: Sensor[] = json
      .filter((entry: SensorEntry) => {
        const latitude = entry.find((line) => line.n === 'latitude')?.v ?? 0
        const temperature = entry.find((line) => line.n === 'temperature')?.v ?? 0
        return latitude || temperature
      })
      .map((entry: SensorEntry) => {
        const latitude = entry.find((line) => line.n === 'latitude')?.v ?? 0
        const longitude = entry.find((line) => line.n === 'longitude')?.v ?? 0
        const temperature = entry.find((line) => line.n === 'temperature')?.v ?? 0
        return {
          temperature,
          coordinates: [latitude, longitude],
        }
      })
    return sensorData
  } catch (err) {
    console.error()
    return []
  }
}

export const App = () => {
  const [sensorsData, setSensorsData] = useState<Sensor[]>()

  useEffect(() => {
    const init = async () => {
      setSensorsData(await getData());
    }
    init();
    const interval = setInterval(async () => {
      setSensorsData(await getData())
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {sensorsData ? (
        <>
          {/* <pre>{JSON.stringify(sensorsData, null, 2)}</pre> */}
          <Map sensorsData={sensorsData} />
        </>
      ) : (
        <p>No data</p>
      )}
    </div>
  )
}
