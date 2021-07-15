[ReactFire reference docs](../README.md) / [useObservable](../modules/useObservable.md) / ObservableStatus

# Interface: ObservableStatus<T\>

[useObservable](../modules/useObservable.md).ObservableStatus

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [data](useObservable.ObservableStatus.md#data)
- [error](useObservable.ObservableStatus.md#error)
- [firstValuePromise](useObservable.ObservableStatus.md#firstvaluepromise)
- [hasEmitted](useObservable.ObservableStatus.md#hasemitted)
- [isComplete](useObservable.ObservableStatus.md#iscomplete)
- [status](useObservable.ObservableStatus.md#status)

## Properties

### data

• **data**: `T`

The most recent value.

If `initialData` is passed in, the first value of `data` will be the valuea provided in `initialData` **UNLESS** the underlying observable is ready, in which case it will skip `initialData`.

#### Defined in

[src/useObservable.ts:55](https://github.com/FirebaseExtended/reactfire/blob/main/src/useObservable.ts#L55)

___

### error

• **error**: `undefined` \| `Error`

Any error that may have occurred in the underlying observable

#### Defined in

[src/useObservable.ts:59](https://github.com/FirebaseExtended/reactfire/blob/main/src/useObservable.ts#L59)

___

### firstValuePromise

• **firstValuePromise**: `Promise`<`void`\>

Promise that resolves after first emit from observable

#### Defined in

[src/useObservable.ts:63](https://github.com/FirebaseExtended/reactfire/blob/main/src/useObservable.ts#L63)

___

### hasEmitted

• **hasEmitted**: `boolean`

Indicates whether the hook has emitted a value at some point

If `initialData` is passed in, this will be `true`.

#### Defined in

[src/useObservable.ts:45](https://github.com/FirebaseExtended/reactfire/blob/main/src/useObservable.ts#L45)

___

### isComplete

• **isComplete**: `boolean`

If this is `true`, the hook will be emitting no further items.

#### Defined in

[src/useObservable.ts:49](https://github.com/FirebaseExtended/reactfire/blob/main/src/useObservable.ts#L49)

___

### status

• **status**: ``"error"`` \| ``"loading"`` \| ``"success"``

The loading status.

- `loading`: Waiting for the first value from an observable
- `error`: Something went wrong. Check `ObservableStatus.error` for more details
- `success`: The hook has emitted at least one value

If `initialData` is passed in, this will skip `loading` and go straight to `success`.

#### Defined in

[src/useObservable.ts:39](https://github.com/FirebaseExtended/reactfire/blob/main/src/useObservable.ts#L39)
