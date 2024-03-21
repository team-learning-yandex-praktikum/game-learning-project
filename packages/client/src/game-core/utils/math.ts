import { Tuple } from './CommonTypes'

export class Vector<Dim extends number> {
  constructor(protected list: Tuple<number, Dim>) {}

  public get dim() {
    return this.list.length
  }

  public getElem(idx: number) {
    return this.list[idx]
  }

  public add(v: Vector<Dim>) {
    const result = this.list.map((e, i) => e + v.list[i])
    return new Vector(result as Tuple<number, Dim>)
  }

  public sub(v: Vector<Dim>) {
    const result = this.list.map((e, i) => e - v.list[i])
    return new Vector(result as Tuple<number, Dim>)
  }

  public mul(k: number) {
    const elems = this.list.map(elem => elem * k)
    return new Vector(elems as Tuple<number, Dim>)
  }

  public div(k: number) {
    return this.mul(1 / k)
  }

  public neg() {
    return this.mul(-1)
  }

  public addScaled(v: Vector<Dim>, k: number) {
    return this.add(v.mul(k))
  }

  public dot(v: Vector<Dim>) {
    let result = 0
    for (let i = 0; i < this.dim; i++) {
      result += this.list[i] * v.list[i]
    }
    return result
  }
}

export class Vector2d extends Vector<2> {
  static get zero() {
    return new Vector2d([0, 0])
  }

  get x() {
    return this.list[0]
  }

  set x(num: number) {
    const y = this.list[1]
    this.list = [num, y]
  }

  get y() {
    return this.list[1]
  }

  set y(num: number) {
    const x = this.list[0]
    this.list = [x, num]
  }
}

export class Vector3d extends Vector<3> {
  static readonly zero = new Vector3d([0, 0, 0])
}

export class Vector4d extends Vector<4> {
  static readonly zero = new Vector4d([0, 0, 0, 0])
}
