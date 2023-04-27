export interface KitCartRecord {
  kitCartNo: string | null
  kitCartDescription: string | null
  kitCartType: number
  rackSize: number
  linkedSupplyArea: string | null
  unloadPoint: string
  agvStationCode: string | null
  preparationAreaCode: string | null
  active: boolean
  printPickingList: boolean
  kittingOffset: number
}
