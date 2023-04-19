export interface KitCartRecord {
  kitCartNo: string | null
  kitCartDescription: string | null
  kitCartType: 1
  rackSize: string | null
  linkedSupplyArea: string
  unloadPoint: string
  agvStationCode: string | null
  preparationAreaCode: string | null
  active: boolean
  printPickingList: boolean | null
  kittingOffset: number
}
