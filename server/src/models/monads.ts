/**
 * TODO
 *
 * 1) Nest Maybe and Either monads - e.g. error-handling for Maybe.some() could return a new Either instance
 */

export class Maybe<T> {
    private constructor(private value: T | null) {}

    static some<T>(value: T) {
        if (!value) {
            throw Error("Provided value must not be empty");
        }
        return new Maybe(value);
    }

    static none<T>() {
        return new Maybe<T>(null);
    }

    static fromValue<T>(value: T) {
        return value ? Maybe.some<T>(value) : Maybe.none<T>();
    }

    map<U>(f: (wrapped: T, ...args: any[]) => U): Maybe<U> {
        return this.value === null ? Maybe.none<U>() : Maybe.fromValue<U>(f(this.value));
    }

    flatMap<U>(f: (wrapped: T) => Maybe<U>): Maybe<U> {
        return this.value === null ? Maybe.none<U>() : f(this.value);
    }

    getOrElse<U>(defaultValue: U) {
        return this.value !== null ? this.value : defaultValue;
    }
}

export class Left<T> {
    private constructor(private value: T | null) {}

    static of<T>(value: T): Left<T> {
        return new Left(value);
    }

    map(): Left<T> {
        return this;
    }

    flatMap(): Left<T> {
        return this;
    }
}

export class Right<T> {
    private constructor(private value: T) {}

    of<T>(value: T): Right<T> {
        return new Right(value);
    }

    map<U>(f: (wrapped: T) => U): Right<U> {
        return new Right(f(this.value));
    }

    flatMap<U>(f: (wrapped: T) => Maybe<U>): Maybe<U> {
        return f(this.value);
    }
}
