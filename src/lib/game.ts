import { getContext, onMount } from 'svelte';
import { writable, derived, type Readable, type Writable } from 'svelte/store';

const WIDTH = 500;
const HEIGHT = 500;

// Some props for the app
export const width = writable(WIDTH);
export const height = writable(HEIGHT);
export const pixelRatio = writable(typeof window !== 'undefined' ? window.devicePixelRatio : 1);
export const scale = writable(1);
export const scaledWidth = writable(WIDTH);
export const scaledHeight = writable(HEIGHT);
export const context = writable<CanvasRenderingContext2D>();
export const canvas = writable<HTMLCanvasElement>();
export const time = writable(0);

// A more convenient store for grabbing all game props
const propStores = {
	width,
	height,
	scaledHeight,
	scaledWidth,
	scale,
	pixelRatio,
	context,
	canvas,
	time
};
type PropValues = StoreValues<typeof propStores>;
export const props = deriveObject(propStores);

export type RenderFn = (props: PropValues, dt: number) => void;
export type RenderElement = {
	ready: boolean;
	mounted: boolean;
	setup?: (props: PropValues) => Promise<unknown> | unknown;
	render: RenderFn;
};

export const key = Symbol();
export type Context = {
	add(element: RenderElement): void;
	remove(element: RenderElement): void;
};

export const renderable = (render: RenderFn) => {
	const api = getContext<Context>(key);
	const element: RenderElement = {
		ready: false,
		mounted: false,
		render
	};
	api.add(element);
	onMount(() => {
		element.mounted = true;
		return () => {
			api.remove(element);
			element.mounted = false;
		};
	});
};

type StoreValues<T extends object> = {
	[K in keyof T]: T[K] extends Writable<infer Z> ? Z : never;
};

type Derived<T extends object> = Readable<StoreValues<T>>;

function deriveObject<
	T extends { [K in keyof T]: T[K] extends Readable<infer Z> ? Readable<Z> : never }
>(props: T): Derived<T> {
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
