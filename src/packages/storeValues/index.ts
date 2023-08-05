import { derived, type Readable, type Writable } from 'svelte/store';

export type StoreValues<T extends object> = {
	[K in keyof T]: T[K] extends Writable<infer Z> ? Z : never;
};

type Derived<T extends object> = Readable<StoreValues<T>>;

export function deriveObject<T extends { [K in keyof T]: T[K] extends Readable<infer Z> ? Readable<Z> : never }>(props: T): Derived<T> {
	const keys = Object.keys(props) as Array<keyof typeof props>;
	const list = keys.map((key) => {
		return props[key];
	});
	return derived(list, (array) => {
		const x = array.reduce((dict, value, i) => {
			(dict[keys[i]] as unknown) = value;
			return dict;
		}, {} as StoreValues<T>);

		return x;
	});
}
