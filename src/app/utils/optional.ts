import {is} from "./objects";
import {Supplier} from "./types";

export class Optional<T> {

  private readonly value: T | undefined | null

  public static of<T>(value: T | undefined | null) {
    return new Optional(value);
  }

  public map<R>(func: (value: T) => R) {
    if (is(this.value)) {
      return Optional.of(func(this.value))
    }

    return Optional.of<R>(undefined)
  }

  public ifIsPresent(func: (value: T) => void): Optional<T> {
    if (is(this.value)) {
      func(this.value)
    }

    return this;
  }

  public ifIsNotPresent(func: () => void) {
    if (!is(this.value)) {
      func();
    }

    return this;
  }

  public isPresent(): boolean {
    return is(this.value)
  }

  public orElse(input: Supplier<T> | T) {
    // @ts-ignore
    return is(this.value) ? this.value : typeof input === "function" ? input() : input;
  }

  public orElseUndefined() {
    if (is(this.value)) {
      return this.value
    }

    return undefined;
  }

  public orElseNull() {
    if (is(this.value)) {
      return this.value
    }

    return null;
  }

  public orElseThrow<E extends Error>(error?: Supplier<E> | E): T {
    if (is(this.value)) {
      return this.value
    }

    if (is(error)) {
      if (typeof error === "function") {
        throw  error();
      } else {
        throw error;
      }
    } else {
      throw new Error("Optional value was " + this.value)
    }
  }

  public get() {
    return this.value;
  }

  constructor(value: T | undefined | null) {
    this.value = value
  }
}
