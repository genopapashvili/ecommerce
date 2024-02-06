export type Subscriber = {
  fullName: string
  rate: 1 | 2 | 3 | 4 | 5
  comment: string
}


export type  Runnable = () => void;

export type TokenPayload = {
  code: string,
  token: string
}

export type TokenResponse = {
  token: string,
  expirationDate?: string
}
export type SuccessResponse = {
  success: boolean
}

export type BasketLengthResponse = {
  length: number
}

export type ErrorResponse = {
  error: string
}

export type Profile = {
  firstName: string,
  lastName: string,
  birthDate: string
  email: string
} & ErrorResponse

export type BasketProduct = {
  checked: boolean
} & Product

export type Product = {
  id: number,
  title: string,
  images: string[],
  category: string,
  price: number
  subscribers: Subscriber[]
}

export type ProductParam = { id: string }

export type Supplier<R> = () => R;
export type Consumer<T> = (consumer: T) => void;
export type Func<T, R> = (consumer: T) => R;
