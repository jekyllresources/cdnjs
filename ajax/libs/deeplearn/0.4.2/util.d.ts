import { DataType, DataTypeMap, NDArray, Variable } from './math/ndarray';
export declare type TypedArray = Float32Array | Int32Array | Uint8Array;
export declare type FlatVector = boolean[] | number[] | TypedArray;
export declare type RegularArray<T> = T[] | T[][] | T[][][] | T[][][][];
export declare type ArrayData = TypedArray | RegularArray<number> | RegularArray<boolean>;
export declare type NamedArrayMap = {
    [name: string]: NDArray;
};
export declare type NamedVariableMap = {
    [name: string]: Variable;
};
export declare function shuffle(array: any[] | Uint32Array | Int32Array | Float32Array): void;
export declare function clamp(min: number, x: number, max: number): number;
export declare function randUniform(a: number, b: number): number;
export declare function distSquared(a: FlatVector, b: FlatVector): number;
export declare function assert(expr: boolean, msg: string): void;
export declare function assertShapesMatch(shapeA: number[], shapeB: number[], errorMessagePrefix?: string): void;
export declare function assertTypesMatch(a: NDArray, b: NDArray): void;
export declare function flatten(arr: number | boolean | RegularArray<number> | RegularArray<boolean>, ret?: Array<number | boolean>): Array<number | boolean>;
export declare function inferShape(arr: number | boolean | RegularArray<number> | RegularArray<boolean>): number[];
export declare function sizeFromShape(shape: number[]): number;
export declare function isScalarShape(shape: number[]): boolean;
export declare function arraysEqual(n1: FlatVector, n2: FlatVector): boolean;
export declare function isInt(a: number): boolean;
export declare function tanh(x: number): number;
export declare function sizeToSquarishShape(size: number): [number, number];
export declare function createShuffledIndices(n: number): Uint32Array;
export declare function rightPad(a: string, size: number): string;
export declare function repeatedTry(checkFn: () => boolean, delayFn?: (counter: number) => number, maxCounter?: number): Promise<void>;
export declare function getQueryParams(queryString: string): {
    [key: string]: string;
};
export declare function inferFromImplicitShape(shape: number[], size: number): number[];
export declare const NAN_INT32: number;
export declare const NAN_BOOL = 255;
export declare const NAN_FLOAT32: number;
export declare function getNaN(dtype: DataType): number;
export declare function isValNaN(val: number, dtype: DataType): boolean;
export declare function squeezeShape(shape: number[], axis?: number[]): {
    newShape: number[];
    keptDims: number[];
};
export declare function getTypedArrayFromDType<D extends DataType>(dtype: D, size: number): DataTypeMap[D];
export declare function isNDArrayInList(ndarray: NDArray, ndarrayList: NDArray[]): boolean;
export declare function checkForNaN(vals: TypedArray, dtype: DataType, name: string): void;
export declare function flattenNameArrayMap(nameArrayMap: NDArray | NamedArrayMap, keys?: string[]): NDArray[];
export declare function unflattenToNameArrayMap(keys: string[], flatArrays: NDArray[]): NamedArrayMap;
export declare function hasEncodingLoss(oldType: DataType, newType: DataType): boolean;
export declare function nextFrame(): Promise<void>;
