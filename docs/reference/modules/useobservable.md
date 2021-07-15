[ReactFire reference docs](../README.md) / useObservable

# Module: useObservable

## Table of contents

### Interfaces

- [ObservableStatus](../interfaces/useObservable.ObservableStatus.md)

### Functions

- [preloadObservable](useObservable.md#preloadobservable)
- [useObservable](useObservable.md#useobservable)

## Functions

### preloadObservable

▸ **preloadObservable**<`T`\>(`source`, `id`): [`SuspenseSubject`](../classes/SuspenseSubject.SuspenseSubject-1.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `Observable`<`T`\> |
| `id` | `string` |

#### Returns

[`SuspenseSubject`](../classes/SuspenseSubject.SuspenseSubject-1.md)<`T`\>

#### Defined in

[src/useObservable.ts:19](https://github.com/FirebaseExtended/reactfire/blob/main/src/useObservable.ts#L19)

___

### useObservable

▸ **useObservable**<`T`\>(`observableId`, `source`, `config?`): [`ObservableStatus`](../interfaces/useObservable.ObservableStatus.md)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `observableId` | `string` |
| `source` | `Observable`<`T`\> |
| `config` | [`ReactFireOptions`](../interfaces/index.ReactFireOptions.md) |

#### Returns

[`ObservableStatus`](../interfaces/useObservable.ObservableStatus.md)<`T`\>

#### Defined in

[src/useObservable.ts:66](https://github.com/FirebaseExtended/reactfire/blob/main/src/useObservable.ts#L66)
