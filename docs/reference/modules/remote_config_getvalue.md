[ReactFire reference docs](../README.md) / remote-config/getValue

# Module: remote-config/getValue

## Table of contents

### Type aliases

- [AllParameters](remote_config_getValue.md#allparameters)

### Functions

- [getAll](remote_config_getValue.md#getall)
- [getBoolean](remote_config_getValue.md#getboolean)
- [getNumber](remote_config_getValue.md#getnumber)
- [getString](remote_config_getValue.md#getstring)
- [getValue](remote_config_getValue.md#getvalue)

## Type aliases

### AllParameters

Ƭ **AllParameters**: `Object`

#### Index signature

▪ [key: `string`]: `RemoteConfigValue`

#### Defined in

[src/remote-config/getValue.tsx:13](https://github.com/FirebaseExtended/reactfire/blob/main/src/remote-config/getValue.tsx#L13)

## Functions

### getAll

▸ **getAll**(`remoteConfig`): `Observable`<[`AllParameters`](remote_config_getValue.md#allparameters)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `remoteConfig` | `RemoteConfig` |

#### Returns

`Observable`<[`AllParameters`](remote_config_getValue.md#allparameters)\>

#### Defined in

[src/remote-config/getValue.tsx:54](https://github.com/FirebaseExtended/reactfire/blob/main/src/remote-config/getValue.tsx#L54)

___

### getBoolean

▸ **getBoolean**(`remoteConfig`, `key`): `Observable`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `remoteConfig` | `RemoteConfig` |
| `key` | `string` |

#### Returns

`Observable`<`boolean`\>

#### Defined in

[src/remote-config/getValue.tsx:49](https://github.com/FirebaseExtended/reactfire/blob/main/src/remote-config/getValue.tsx#L49)

___

### getNumber

▸ **getNumber**(`remoteConfig`, `key`): `Observable`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `remoteConfig` | `RemoteConfig` |
| `key` | `string` |

#### Returns

`Observable`<`number`\>

#### Defined in

[src/remote-config/getValue.tsx:44](https://github.com/FirebaseExtended/reactfire/blob/main/src/remote-config/getValue.tsx#L44)

___

### getString

▸ **getString**(`remoteConfig`, `key`): `Observable`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `remoteConfig` | `RemoteConfig` |
| `key` | `string` |

#### Returns

`Observable`<`string`\>

#### Defined in

[src/remote-config/getValue.tsx:39](https://github.com/FirebaseExtended/reactfire/blob/main/src/remote-config/getValue.tsx#L39)

___

### getValue

▸ **getValue**(`remoteConfig`, `key`): `Observable`<`Value`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `remoteConfig` | `RemoteConfig` |
| `key` | `string` |

#### Returns

`Observable`<`Value`\>

#### Defined in

[src/remote-config/getValue.tsx:34](https://github.com/FirebaseExtended/reactfire/blob/main/src/remote-config/getValue.tsx#L34)
