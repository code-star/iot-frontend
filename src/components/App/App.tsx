import React, { useEffect, useState } from 'react'
import { Map } from '../Map/Map'
import { Sensor, SensorEntry, SensorJSON } from '../../API/Sensor/Sensor'
import addFakeData from './fakerUtil'

const getData = async () => {
  try {
    const response = await fetch('https://codestar-iot-api.herokuapp.com/get')
    const json: SensorJSON = await response.json()
    // TODO it would be much better to use RxJS to do this
    const sensorData: Sensor[] = json
      .filter((entry: SensorEntry) => {
        if(entry.find) {
          const latitude = entry.find((line) => line.n === 'latitude')?.v ?? 0
          const temperature = entry.find((line) => line.n === 'temperature')?.v ?? 0
          return latitude || temperature  
        }
        return false;
      })
      .map((entry: SensorEntry) => {
        const latitude = entry.find((line) => line.n === 'latitude')?.v ?? 0
        const longitude = entry.find((line) => line.n === 'longitude')?.v ?? 0
        const temperature = entry.find((line) => line.n === 'temperature')?.v ?? 0
        return {
          temperature,
          coordinates: [latitude, longitude],
        }
      });
      return sensorData
  } catch (err) {
    console.error(err)
    return []
  }
}

export const App = () => {
  const [sensorsData, setSensorsData] = useState<Sensor[]>()

  useEffect(() => {
    let fakeDataTimer: NodeJS.Timeout | null = null
    const init = async () => {
      const sensorData = await getData()
      // const sensorData: Sensor[] = []
      setSensorsData(sensorData)
      if (sensorData.length === 0) {
        console.warn("Initial sensorData was empty, so progressively injecting fake data");
        fakeDataTimer = await addFakeData()
      }
    }
    init()
    const interval = setInterval(async () => {
      setSensorsData(await getData())
    }, 10000)

    return () => {
      clearInterval(interval)
      if (fakeDataTimer) {
        clearInterval(fakeDataTimer)
      }
    }
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
