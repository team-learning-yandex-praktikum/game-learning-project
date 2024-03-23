export type Nullable<T> = T | null | undefined
export type Primitive = boolean | number | bigint | string
export type NonEmptyArr<T> = [T, ...T[]]

export type Callback = (...args: unknown[]) => void
export type Indexed<T = unknown> = Record<string, T>
export type NumIndexed<T = unknown> = Record<number, T>

export type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends (infer U)[]
        ? DeepReadonly<U>[]
        : T[P] extends object
        ? DeepReadonly<T[P]>
        : T[P]
}

export type Tuple<Elem, N extends number> = N extends N
    ? number extends N
        ? Elem[]
        : TupleOf<Elem, N, []>
    : never

type TupleOf<
    Elem,
    N extends number,
    Arr extends readonly unknown[]
> = Arr['length'] extends N ? Arr : TupleOf<Elem, N, readonly [Elem, ...Arr]>

export type Tuple1<T> = Tuple<T, 1>
export type Tuple2<T> = Tuple<T, 2>
export type Tuple3<T> = Tuple<T, 3>
export type Tuple4<T> = Tuple<T, 4>

export type ImgResource = Nullable<HTMLImageElement>
