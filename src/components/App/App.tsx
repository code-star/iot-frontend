import React, { useEffect, useState } from 'react'
import { Map } from '../Map/Map'
import { SensorJSON } from '../../ApI/Sensor/Sensor'

export const App = () => {
  const [sensorsData, setSensorsData] = useState<SensorJSON[]>()

  useEffect(() => {
    try {
      const getData = async () => {
        const response = await fetch('https://codestar-iot-api.herokuapp.com/get')
        const json: SensorJSON[] = await response.json()
        setSensorsData(json)
      }

      getData()
    } catch (err) {
      console.error()
    }
  }, [])

  return (
    <div>
      {sensorsData ? (
        <>
          <pre>{JSON.stringify(sensorsData, null, 2)}</pre>
          <Map sensorsData={sensorsData} />
        </>
      ) : (
        <p>No data</p>
      )}
    </div>
  )
}
