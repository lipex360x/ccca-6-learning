interface ItemProps {
  idItem: number
  description: string
  price: number
  height: number
  width: number
  depth: number
  weight: number
}

export class Item {
  idItem: number
  description: string
  price: number
  height: number
  width: number
  depth: number
  weight: number

  constructor(props: ItemProps) {
    this.idItem = props.idItem
    this.description = props.description
    this.price = props.price
    this.height = props.height
    this.width = props.width
    this.depth = props.depth
    this.weight = props.weight
  }

  getVolume() {
    return (this.width * this.height * this.depth) / 10 ** 6
  }

  getDensity() {
    return this.weight / this.getVolume()
  }
}
