[ReactFire reference docs](../README.md) / [SuspenseSubject](../modules/SuspenseSubject.md) / SuspenseSubject

# Class: SuspenseSubject<T\>

[SuspenseSubject](../modules/SuspenseSubject.md).SuspenseSubject

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `Subject`<`T`\>

  ↳ **`SuspenseSubject`**

## Table of contents

### Constructors

- [constructor](SuspenseSubject.SuspenseSubject-1.md#constructor)

### Properties

- [\_error](SuspenseSubject.SuspenseSubject-1.md#_error)
- [\_firstEmission](SuspenseSubject.SuspenseSubject-1.md#_firstemission)
- [\_hasValue](SuspenseSubject.SuspenseSubject-1.md#_hasvalue)
- [\_innerObservable](SuspenseSubject.SuspenseSubject-1.md#_innerobservable)
- [\_innerSubscriber](SuspenseSubject.SuspenseSubject-1.md#_innersubscriber)
- [\_resolveFirstEmission](SuspenseSubject.SuspenseSubject-1.md#_resolvefirstemission)
- [\_timeoutHandler](SuspenseSubject.SuspenseSubject-1.md#_timeouthandler)
- [\_value](SuspenseSubject.SuspenseSubject-1.md#_value)
- [\_warmupSubscription](SuspenseSubject.SuspenseSubject-1.md#_warmupsubscription)
- [closed](SuspenseSubject.SuspenseSubject-1.md#closed)
- [hasError](SuspenseSubject.SuspenseSubject-1.md#haserror)
- [isStopped](SuspenseSubject.SuspenseSubject-1.md#isstopped)
- [observers](SuspenseSubject.SuspenseSubject-1.md#observers)
- [operator](SuspenseSubject.SuspenseSubject-1.md#operator)
- [source](SuspenseSubject.SuspenseSubject-1.md#source)
- [thrownError](SuspenseSubject.SuspenseSubject-1.md#thrownerror)
- [create](SuspenseSubject.SuspenseSubject-1.md#create)

### Accessors

- [firstEmission](SuspenseSubject.SuspenseSubject-1.md#firstemission)
- [hasValue](SuspenseSubject.SuspenseSubject-1.md#hasvalue)
- [observed](SuspenseSubject.SuspenseSubject-1.md#observed)
- [ourError](SuspenseSubject.SuspenseSubject-1.md#ourerror)
- [value](SuspenseSubject.SuspenseSubject-1.md#value)

### Methods

- [\_next](SuspenseSubject.SuspenseSubject-1.md#_next)
- [\_reset](SuspenseSubject.SuspenseSubject-1.md#_reset)
- [\_subscribe](SuspenseSubject.SuspenseSubject-1.md#_subscribe)
- [asObservable](SuspenseSubject.SuspenseSubject-1.md#asobservable)
- [complete](SuspenseSubject.SuspenseSubject-1.md#complete)
- [error](SuspenseSubject.SuspenseSubject-1.md#error)
- [forEach](SuspenseSubject.SuspenseSubject-1.md#foreach)
- [lift](SuspenseSubject.SuspenseSubject-1.md#lift)
- [next](SuspenseSubject.SuspenseSubject-1.md#next)
- [pipe](SuspenseSubject.SuspenseSubject-1.md#pipe)
- [subscribe](SuspenseSubject.SuspenseSubject-1.md#subscribe)
- [toPromise](SuspenseSubject.SuspenseSubject-1.md#topromise)
- [unsubscribe](SuspenseSubject.SuspenseSubject-1.md#unsubscribe)

## Constructors

### constructor

• **new SuspenseSubject**<`T`\>(`innerObservable`, `_timeoutWindow`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `innerObservable` | `Observable`<`T`\> |
| `_timeoutWindow` | `number` |

#### Overrides

Subject&lt;T\&gt;.constructor

#### Defined in

[src/SuspenseSubject.ts:18](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L18)

## Properties

### \_error

• `Private` **\_error**: `any`

#### Defined in

[src/SuspenseSubject.ts:9](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L9)

___

### \_firstEmission

• `Private` **\_firstEmission**: `Promise`<`void`\>

#### Defined in

[src/SuspenseSubject.ts:8](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L8)

___

### \_hasValue

• `Private` **\_hasValue**: `boolean` = `false`

#### Defined in

[src/SuspenseSubject.ts:6](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L6)

___

### \_innerObservable

• `Private` **\_innerObservable**: `Observable`<`T`\>

#### Defined in

[src/SuspenseSubject.ts:10](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L10)

___

### \_innerSubscriber

• `Private` **\_innerSubscriber**: `Subscription`

#### Defined in

[src/SuspenseSubject.ts:14](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L14)

___

### \_resolveFirstEmission

• `Private` **\_resolveFirstEmission**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/SuspenseSubject.ts:16](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L16)

___

### \_timeoutHandler

• `Private` **\_timeoutHandler**: `Timeout`

#### Defined in

[src/SuspenseSubject.ts:7](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L7)

___

### \_value

• `Private` **\_value**: `undefined` \| `T`

#### Defined in

[src/SuspenseSubject.ts:5](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L5)

___

### \_warmupSubscription

• `Private` **\_warmupSubscription**: `Subscription`

#### Defined in

[src/SuspenseSubject.ts:11](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L11)

___

### closed

• **closed**: `boolean`

#### Inherited from

Subject.closed

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:12

___

### hasError

• **hasError**: `boolean`

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.hasError

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:18

___

### isStopped

• **isStopped**: `boolean`

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.isStopped

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:16

___

### observers

• **observers**: `Observer`<`T`\>[]

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.observers

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:14

___

### operator

• **operator**: `undefined` \| `Operator`<`any`, `T`\>

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.operator

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:22

___

### source

• **source**: `undefined` \| `Observable`<`any`\>

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.source

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:18

___

### thrownError

• **thrownError**: `any`

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.thrownError

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:20

___

### create

▪ `Static` **create**: (...`args`: `any`[]) => `any`

Creates a "subject" by basically gluing an observer to an observable.

**`nocollapse`**

**`deprecated`** Recommended you do not use. Will be removed at some point in the future. Plans for replacement still under discussion.

#### Type declaration

▸ (...`args`): `any`

Creates a "subject" by basically gluing an observer to an observable.

**`nocollapse`**

**`deprecated`** Recommended you do not use. Will be removed at some point in the future. Plans for replacement still under discussion.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Inherited from

Subject.create

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:27

## Accessors

### firstEmission

• `get` **firstEmission**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/SuspenseSubject.ts:61](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L61)

___

### hasValue

• `get` **hasValue**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/SuspenseSubject.ts:44](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L44)

___

### observed

• `get` **observed**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:35

___

### ourError

• `get` **ourError**(): `any`

#### Returns

`any`

#### Defined in

[src/SuspenseSubject.ts:90](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L90)

___

### value

• `get` **value**(): `undefined` \| `T`

#### Returns

`undefined` \| `T`

#### Defined in

[src/SuspenseSubject.ts:51](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L51)

## Methods

### \_next

▸ `Private` **_next**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Defined in

[src/SuspenseSubject.ts:65](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L65)

___

### \_reset

▸ `Private` **_reset**(): `void`

#### Returns

`void`

#### Defined in

[src/SuspenseSubject.ts:71](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L71)

___

### \_subscribe

▸ **_subscribe**(`subscriber`): `Subscription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriber` | `Subscriber`<`T`\> |

#### Returns

`Subscription`

#### Defined in

[src/SuspenseSubject.ts:82](https://github.com/FirebaseExtended/reactfire/blob/main/src/SuspenseSubject.ts#L82)

___

### asObservable

▸ **asObservable**(): `Observable`<`T`\>

Creates a new Observable with this Subject as the source. You can do this
to create customize Observer-side logic of the Subject and conceal it from
code that uses the Observable.

#### Returns

`Observable`<`T`\>

Observable that the Subject casts to

#### Inherited from

Subject.asObservable

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:42

___

### complete

▸ **complete**(): `void`

#### Returns

`void`

#### Inherited from

Subject.complete

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:33

___

### error

▸ **error**(`err`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `any` |

#### Returns

`void`

#### Inherited from

Subject.error

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:32

___

### forEach

▸ **forEach**(`next`): `Promise`<`void`\>

Used as a NON-CANCELLABLE means of subscribing to an observable, for use with
APIs that expect promises, like `async/await`. You cannot unsubscribe from this.

**WARNING**: Only use this with observables you *know* will complete. If the source
observable does not complete, you will end up with a promise that is hung up, and
potentially all of the state of an async function hanging out in memory. To avoid
this situation, look into adding something like {@link timeout}, {@link take},
{@link takeWhile}, or {@link takeUntil} amongst others.

### Example:

```ts
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const source$ = interval(1000).pipe(take(4));

async function getTotal() {
   let total = 0;

   await source$.forEach(value => {
     total += value;
     console.log('observable -> ', value);
   });

   return total;
}

getTotal().then(
   total => console.log('Total:', total)
)

// Expected:
// "observable -> 0"
// "observable -> 1"
// "observable -> 2"
// "observable -> 3"
// "Total: 6"
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `next` | (`value`: `T`) => `void` | a handler for each value emitted by the observable |

#### Returns

`Promise`<`void`\>

a promise that either resolves on observable completion or
 rejects with the handled error

#### Inherited from

Subject.forEach

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:101

▸ **forEach**(`next`, `promiseCtor`): `Promise`<`void`\>

**`deprecated`** Passing a Promise constructor will no longer be available
in upcoming versions of RxJS. This is because it adds weight to the library, for very
little benefit. If you need this functionality, it is recommended that you either
polyfill Promise, or you create an adapter to convert the returned native promise
to whatever promise implementation you wanted. Will be removed in v8.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `next` | (`value`: `T`) => `void` | a handler for each value emitted by the observable |
| `promiseCtor` | `PromiseConstructorLike` | a constructor function used to instantiate the Promise |

#### Returns

`Promise`<`void`\>

a promise that either resolves on observable completion or
 rejects with the handled error

#### Inherited from

Subject.forEach

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:113

___

### lift

▸ **lift**<`R`\>(`operator`): `Observable`<`R`\>

**`deprecated`** Internal implementation detail, do not use directly. Will be made internal in v8.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | `Operator`<`T`, `R`\> |

#### Returns

`Observable`<`R`\>

#### Inherited from

Subject.lift

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:30

___

### next

▸ **next**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Inherited from

Subject.next

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:31

___

### pipe

▸ **pipe**(): `Observable`<`T`\>

#### Returns

`Observable`<`T`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:114

▸ **pipe**<`A`\>(`op1`): `Observable`<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<`T`, `A`\> |

#### Returns

`Observable`<`A`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:115

▸ **pipe**<`A`, `B`\>(`op1`, `op2`): `Observable`<`B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<`T`, `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |

#### Returns

`Observable`<`B`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:116

▸ **pipe**<`A`, `B`, `C`\>(`op1`, `op2`, `op3`): `Observable`<`C`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<`T`, `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |

#### Returns

`Observable`<`C`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:117

▸ **pipe**<`A`, `B`, `C`, `D`\>(`op1`, `op2`, `op3`, `op4`): `Observable`<`D`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<`T`, `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |

#### Returns

`Observable`<`D`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:118

▸ **pipe**<`A`, `B`, `C`, `D`, `E`\>(`op1`, `op2`, `op3`, `op4`, `op5`): `Observable`<`E`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<`T`, `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |

#### Returns

`Observable`<`E`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:119

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`): `Observable`<`F`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<`T`, `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |

#### Returns

`Observable`<`F`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:120

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`): `Observable`<`G`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<`T`, `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |

#### Returns

`Observable`<`G`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:121

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`): `Observable`<`H`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<`T`, `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |
| `op8` | `OperatorFunction`<`G`, `H`\> |

#### Returns

`Observable`<`H`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:122

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`, `op9`): `Observable`<`I`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<`T`, `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |
| `op8` | `OperatorFunction`<`G`, `H`\> |
| `op9` | `OperatorFunction`<`H`, `I`\> |

#### Returns

`Observable`<`I`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:123

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`, `op9`, ...`operations`): `Observable`<`unknown`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<`T`, `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |
| `op8` | `OperatorFunction`<`G`, `H`\> |
| `op9` | `OperatorFunction`<`H`, `I`\> |
| `...operations` | `OperatorFunction`<`any`, `any`\>[] |

#### Returns

`Observable`<`unknown`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:124

___

### subscribe

▸ **subscribe**(`observer?`): `Subscription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer?` | `Partial`<`Observer`<`T`\>\> |

#### Returns

`Subscription`

#### Inherited from

Subject.subscribe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:53

▸ **subscribe**(`next`): `Subscription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`value`: `T`) => `void` |

#### Returns

`Subscription`

#### Inherited from

Subject.subscribe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:54

▸ **subscribe**(`next?`, `error?`, `complete?`): `Subscription`

**`deprecated`** Instead of passing separate callback arguments, use an observer argument. Signatures taking separate callback arguments will be removed in v8. Details: https://rxjs.dev/deprecations/subscribe-arguments

#### Parameters

| Name | Type |
| :------ | :------ |
| `next?` | ``null`` \| (`value`: `T`) => `void` |
| `error?` | ``null`` \| (`error`: `any`) => `void` |
| `complete?` | ``null`` \| () => `void` |

#### Returns

`Subscription`

#### Inherited from

Subject.subscribe

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:56

___

### toPromise

▸ **toPromise**(): `Promise`<`undefined` \| `T`\>

**`deprecated`** Replaced with {@link firstValueFrom} and {@link lastValueFrom}. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise

#### Returns

`Promise`<`undefined` \| `T`\>

#### Inherited from

Subject.toPromise

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:126

▸ **toPromise**(`PromiseCtor`): `Promise`<`undefined` \| `T`\>

**`deprecated`** Replaced with {@link firstValueFrom} and {@link lastValueFrom}. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise

#### Parameters

| Name | Type |
| :------ | :------ |
| `PromiseCtor` | `PromiseConstructor` |

#### Returns

`Promise`<`undefined` \| `T`\>

#### Inherited from

Subject.toPromise

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:128

▸ **toPromise**(`PromiseCtor`): `Promise`<`undefined` \| `T`\>

**`deprecated`** Replaced with {@link firstValueFrom} and {@link lastValueFrom}. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise

#### Parameters

| Name | Type |
| :------ | :------ |
| `PromiseCtor` | `PromiseConstructorLike` |

#### Returns

`Promise`<`undefined` \| `T`\>

#### Inherited from

Subject.toPromise

#### Defined in

node_modules/rxjs/dist/types/internal/Observable.d.ts:130

___

### unsubscribe

▸ **unsubscribe**(): `void`

#### Returns

`void`

#### Inherited from

Subject.unsubscribe

#### Defined in

node_modules/rxjs/dist/types/internal/Subject.d.ts:34
