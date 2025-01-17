import { Features } from './environment';
import { NDArrayMath } from './math/math';
import { DataType, NDArray } from './math/ndarray';
import { TypedArray } from './util';
export declare type MathIt = (name: string, testFn: (math: NDArrayMath) => void) => void;
export declare type It = (name: string, testFn: () => void | Promise<void>) => void;
export declare type MathTests = (it: MathIt, fit?: MathIt, xit?: MathIt) => void;
export declare type Tests = (it: It, fit?: It, xit?: It) => void;
export declare const TEST_EPSILON = 0.01;
export declare function mean(values: TypedArray | number[]): number;
export declare function standardDeviation(values: TypedArray | number[], mean: number): number;
export declare function kurtosis(values: TypedArray | number[]): number;
export declare function skewness(values: TypedArray | number[]): number;
export declare function jarqueBeraNormalityTest(a: NDArray | TypedArray | number[]): void;
export declare function expectArrayInMeanStdRange(actual: NDArray | TypedArray | number[], expectedMean: number, expectedStdDev: number, epsilon?: number): void;
export declare function expectArraysClose(actual: NDArray | TypedArray | number[], expected: NDArray | TypedArray | number[] | boolean[], epsilon?: number): void;
export declare function expectArraysEqual(actual: NDArray | TypedArray | number[], expected: NDArray | TypedArray | number[] | boolean[]): void;
export declare function expectNumbersClose(a: number, e: number, epsilon?: number): void;
export declare function expectValuesInRange(actual: NDArray | TypedArray | number[], low: number, high: number): void;
export declare function randomArrayInRange(n: number, minValue: number, maxValue: number): Float32Array;
export declare function makeIdentity(n: number): Float32Array;
export declare function cpuMultiplyMatrix(a: Float32Array, aRow: number, aCol: number, b: Float32Array, bRow: number, bCol: number): Float32Array;
export declare function cpuDotProduct(a: Float32Array, b: Float32Array): number;
export declare function describeMathCPU(name: string, tests: MathTests[], featuresList?: Features[]): void;
export declare function describeMathGPU(name: string, tests: MathTests[], featuresList?: Features[]): void;
export declare function describeCustom(name: string, tests: Tests, featuresList?: Features[], customBeforeEach?: () => void, customAfterEach?: () => void): void;
export declare function executeMathTests(testName: string, tests: MathTests[], mathFactory: () => NDArrayMath, features?: Features): void;
export declare function assertIsNan(val: number, dtype: DataType): void;
