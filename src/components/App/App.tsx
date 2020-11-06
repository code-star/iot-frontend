import React, { useEffect, useState } from 'react'

export const App = () => {
  const [data, setData] = useState()

  useEffect(() => {
    try {
      const getData = async () => {
        const response = await fetch('https://codestar-iot-api.herokuapp.com/get')
        const json = await response.json()
        setData(json)
      }

      getData()
    } catch (err) {
      console.error()
    }
  }, [])

  return <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>No data</p>}</div>
}
