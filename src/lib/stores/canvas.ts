import { writable } from 'svelte/store';

export const scale = writable<number>();

export const context = writable<CanvasRenderingContext2D>();
