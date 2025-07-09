export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13')


];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/auth/login": [4],
		"/auth/signup": [5],
		"/challenges": [6],
		"/challenges/[challengeId]": [7],
		"/error404": [8],
		"/exit": [9],
		"/games": [~10],
		"/games/[gameId]": [~11],
		"/legal notices": [12],
		"/me": [13]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';