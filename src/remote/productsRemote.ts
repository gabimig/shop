import { Group, Item } from '../storage/wareSlice'

interface DataResponse {
    Error: string
    Id: number
    Success: boolean
    Value:{
        Goods: {
                B: boolean,
                C: number,
                CV: number | null,
                G: number,
                P: number,
                Pl: boolean | string | number | null,
                T: number
            }[]
    }
}

class ProductsRemote {
  public getData = (): Promise<DataResponse> => fetch('/data.json').then((response) => response.json());

  public getNames = () => fetch('/names.json').then((response) => response.json());

  public getAppState = async () => {
      const [data, names] = await Promise.all([this.getData(), this.getNames()])
      if (!data.Success) throw data.Error

      const groups: Map<string, Group> = new Map()

      data.Value.Goods.forEach((good) => {
          const groupId = good.G.toString()
          const itemId = good.T.toString()
          const groupInfo = names[groupId]
          if (groupInfo) {
              if (!groups.has(groupId)) {
                  const group: Group = {
                      name: groupInfo.G,
                      id: groupId,
                      items: [],
                  }
                  groups.set(groupId, group)
              }
              const group = groups.get(groupId)
              const itemsInfo = groupInfo.B
              const item: Item = {
                  name: itemsInfo[itemId].N,
                  price: good.C,
                  id: itemId,
                  units: good.P,
              }
              if (group) group.items.push(item)
          }
      })
      const result: Group[] = []
      groups.forEach((value) => result.push(value))

      return result
  };
}

const productsRemote = new ProductsRemote()
export default productsRemote as ProductsRemote
