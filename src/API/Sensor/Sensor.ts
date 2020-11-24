// [
//   { "bn": "urn:dev:DEVEUI:0004A30B001B714E:", "bt": 1605693026 },
//   { "n": "locOrigin", "vs": "KPNLORA" },
//   { "n": "latitude", "u": "lat", "v": 52.653996 },
//   { "n": "longitude", "u": "lon", "v": 4.803645 },
//   { "n": "radius", "u": "m", "v": 488.131165 },
//   { "n": "locAccuracy", "u": "%", "v": 9999 },
//   { "n": "locPrecision", "u": "%", "v": 9999 },
//   { "n": "locTime", "vs": "1605693026316" }
// ],
// [
//   {
//     "bn": "urn:dev:DEVEUI:0004A30B001B714E:",
//     "bt": 1605693025,
//     "n": "temperature",
//     "u": "Cel",
//     "v": 0
//   }
// ],

type SensorEntryLine = { bn: string, bt: number, n?: string, u?: string, v?:number } | { n: string, u?:string, v?:number, vs?:string };

export type SensorEntry = SensorEntryLine[]

// export type SensorJSON = Readonly<{
//   temperature: number
//   coordinates: [number, number]
// }>

export type SensorJSON = Readonly<SensorEntry[]>;

export type Sensor = Readonly<{
  temperature: number
  coordinates: [number, number]
}>
