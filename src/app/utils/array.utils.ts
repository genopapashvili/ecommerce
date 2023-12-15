export class ArrayUtils {


 public static generate<T>(length: number, defaultValue: T): T[] {
    return Array.from({ length }, () => defaultValue);
  }
}
