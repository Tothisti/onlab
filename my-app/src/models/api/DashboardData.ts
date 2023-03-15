interface KitCart {
  kitCartNo: string | null
  status: number | null
  materialShortage: number | null
  description: string | null
}

interface WorkCenter {
  workCenter: string | null
  position: number | null
  parallelSequence: number | null
  kitCarts: KitCart[] | null
}

export interface DashboardData {
  vin: string | null
  productionOrderNo: string | null
  orderPosition: number | null
  workCenters: WorkCenter[] | null
}
