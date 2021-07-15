[ReactFire reference docs](../README.md) / database

# Module: database

## Table of contents

### Functions

- [useDatabaseList](database.md#usedatabaselist)
- [useDatabaseListData](database.md#usedatabaselistdata)
- [useDatabaseObject](database.md#usedatabaseobject)
- [useDatabaseObjectData](database.md#usedatabaseobjectdata)

## Functions

### useDatabaseList

▸ **useDatabaseList**<`T`\>(`ref`, `options?`): [`ObservableStatus`](../interfaces/useObservable.ObservableStatus.md)<`QueryChange`[] \| `T`[]\>

Subscribe to a Realtime Database list

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | { [key: string]: `unknown`;  } |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ref` | `Reference` \| `DatabaseQuery` | Reference to the DB List you want to listen to |
| `options?` | [`ReactFireOptions`](../interfaces/index.ReactFireOptions.md)<`T`[]\> |  |

#### Returns

[`ObservableStatus`](../interfaces/useObservable.ObservableStatus.md)<`QueryChange`[] \| `T`[]\>

#### Defined in

[src/database.tsx:74](https://github.com/FirebaseExtended/reactfire/blob/main/src/database.tsx#L74)

___

### useDatabaseListData

▸ **useDatabaseListData**<`T`\>(`ref`, `options?`): [`ObservableStatus`](../interfaces/useObservable.ObservableStatus.md)<`T`[] \| ``null``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | { [key: string]: `unknown`;  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `Reference` \| `DatabaseQuery` |
| `options?` | [`ReactFireOptions`](../interfaces/index.ReactFireOptions.md)<`T`[]\> |

#### Returns

[`ObservableStatus`](../interfaces/useObservable.ObservableStatus.md)<`T`[] \| ``null``\>

#### Defined in

[src/database.tsx:84](https://github.com/FirebaseExtended/reactfire/blob/main/src/database.tsx#L84)

___

### useDatabaseObject

▸ **useDatabaseObject**<`T`\>(`ref`, `options?`): [`ObservableStatus`](../interfaces/useObservable.ObservableStatus.md)<`QueryChange` \| `T`\>

Subscribe to a Realtime Database object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ref` | `Reference` | Reference to the DB object you want to listen to |
| `options?` | [`ReactFireOptions`](../interfaces/index.ReactFireOptions.md)<`T`\> |  |

#### Returns

[`ObservableStatus`](../interfaces/useObservable.ObservableStatus.md)<`QueryChange` \| `T`\>

#### Defined in

[src/database.tsx:30](https://github.com/FirebaseExtended/reactfire/blob/main/src/database.tsx#L30)

___

### useDatabaseObjectData

▸ **useDatabaseObjectData**<`T`\>(`ref`, `options?`): [`ObservableStatus`](../interfaces/useObservable.ObservableStatus.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `Reference` |
| `options?` | [`ReactFireOptions`](../interfaces/index.ReactFireOptions.md)<`T`\> |

#### Returns

[`ObservableStatus`](../interfaces/useObservable.ObservableStatus.md)<`T`\>

#### Defined in

[src/database.tsx:60](https://github.com/FirebaseExtended/reactfire/blob/main/src/database.tsx#L60)
