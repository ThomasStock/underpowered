import { getContext, onMount } from 'svelte';
import { writable } from 'svelte/store';
import { deriveObject, type StoreValues } from '../packages/storeValues';

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
	time,
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
		render,
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
