import { SensorJSON, SensorEntry } from '../../API/Sensor/Sensor';
import iotJson from '../../iot.json'

const fakeData: SensorJSON = iotJson.filter((entry: SensorEntry) => entry.find((line) => line.n === 'latitude')?.v);

const addFakeData = async (): Promise<NodeJS.Timeout> => {
  let counter = 0
  const timer = setInterval(async () => {
    if (fakeData.length > counter) {
      try {
        await fetch('https://codestar-iot-api.herokuapp.com/set', {
          method: 'POST',
          body: JSON.stringify(fakeData[counter]),
        })
        counter++;
      } catch (err) {
        console.error(err)
      }
    } else {
      clearInterval(timer)
    }
  }, 27000)
  return timer
}

export default addFakeData;
