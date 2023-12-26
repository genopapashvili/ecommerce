export type Subscriber = {
  fullName: string
  rate: 1 | 2 | 3 | 4 | 5
  comment: string
}

export type Product = {
  title: string,
  images: string[],
  category: string,
  price: number
  subscribers: Subscriber[]
}

export type Supplier<R> = () => R;
export type Consumer<T> = (consumer: T) => void;
export type Func<T, R> = (consumer: T) => R;
