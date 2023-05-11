interface KitCart {
  kitCartNo: string | null
  status: number | null
  materialShortage: number | null
  description: string | null
}

interface WorkCenter {
  workCenter: string
  position: number
  parallelSequence: number
  kitCarts: KitCart[]
}

export interface DashboardData {
  vin: string | null
  productionOrderNo: string | null
  orderPosition: number | null
  workCenters: WorkCenter[]
}
