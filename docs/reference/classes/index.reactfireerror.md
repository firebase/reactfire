[ReactFire reference docs](../README.md) / [index](../modules/index.md) / ReactFireError

# Class: ReactFireError

[index](../modules/index.md).ReactFireError

## Hierarchy

- `Error`

  ↳ **`ReactFireError`**

## Table of contents

### Constructors

- [constructor](index.ReactFireError.md#constructor)

### Properties

- [code](index.ReactFireError.md#code)
- [customData](index.ReactFireError.md#customdata)
- [message](index.ReactFireError.md#message)
- [name](index.ReactFireError.md#name)
- [stack](index.ReactFireError.md#stack)
- [prepareStackTrace](index.ReactFireError.md#preparestacktrace)
- [stackTraceLimit](index.ReactFireError.md#stacktracelimit)

### Methods

- [captureStackTrace](index.ReactFireError.md#capturestacktrace)

## Constructors

### constructor

• **new ReactFireError**(`code`, `message`, `customData?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `message` | `string` |
| `customData?` | `Record`<`string`, `unknown`\> |

#### Overrides

Error.constructor

#### Defined in

[src/index.ts:15](https://github.com/FirebaseExtended/reactfire/blob/main/src/index.ts#L15)

## Properties

### code

• `Readonly` **code**: `string`

___

### customData

• `Optional` **customData**: `Record`<`string`, `unknown`\>

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• `Readonly` **name**: ``"ReactFireError"``

#### Overrides

Error.name

#### Defined in

[src/index.ts:13](https://github.com/FirebaseExtended/reactfire/blob/main/src/index.ts#L13)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
