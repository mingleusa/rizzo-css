<script lang="ts">
  import Card from '$lib/rizzo/Card.svelte';
  import CodeBlock from '$lib/rizzo-docs/CodeBlock.svelte';
  import Gear from '$lib/rizzo/icons/Gear.svelte';
  import Close from '$lib/rizzo/icons/Close.svelte';
  import ChevronDown from '$lib/rizzo/icons/ChevronDown.svelte';
  import CopyIcon from '$lib/rizzo/icons/Copy.svelte';
  import Check from '$lib/rizzo/icons/Check.svelte';
  import Search from '$lib/rizzo/icons/Search.svelte';
  import Moon from '$lib/rizzo/icons/Moon.svelte';
  import Palette from '$lib/rizzo/icons/Palette.svelte';
  import Owl from '$lib/rizzo/icons/Owl.svelte';
  import Snowflake from '$lib/rizzo/icons/Snowflake.svelte';
  import IceCream from '$lib/rizzo/icons/IceCream.svelte';
  import Circle from '$lib/rizzo/icons/Circle.svelte';
  import Rainbow from '$lib/rizzo/icons/Rainbow.svelte';
  import Eye from '$lib/rizzo/icons/Eye.svelte';
  import Sort from '$lib/rizzo/icons/Sort.svelte';
  import Filter from '$lib/rizzo/icons/Filter.svelte';
  import Cmd from '$lib/rizzo/icons/Cmd.svelte';
  import Css3 from '$lib/rizzo/icons/devicons/Css3.svelte';
  import Html5 from '$lib/rizzo/icons/devicons/Html5.svelte';
  import Javascript from '$lib/rizzo/icons/devicons/Javascript.svelte';
  import Nodejs from '$lib/rizzo/icons/devicons/Nodejs.svelte';
  import AstroIcon from '$lib/rizzo/icons/devicons/Astro.svelte';
  import Plaintext from '$lib/rizzo/icons/devicons/Plaintext.svelte';
  import Git from '$lib/rizzo/icons/devicons/Git.svelte';
  import SvelteIcon from '$lib/rizzo/icons/devicons/SvelteIcon.svelte';
  import React from '$lib/rizzo/icons/devicons/React.svelte';
  import Vue from '$lib/rizzo/icons/devicons/Vue.svelte';
  import Bash from '$lib/rizzo/icons/devicons/Bash.svelte';

  type IconEntry = { name: string; component: typeof import('svelte').SvelteComponent; svg: string };

  const regularIcons: IconEntry[] = [
    { name: 'Gear', component: Gear, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>' },
    { name: 'Close', component: Close, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' },
    { name: 'ChevronDown', component: ChevronDown, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>' },
    { name: 'Copy', component: CopyIcon, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"/></svg>' },
    { name: 'Check', component: Check, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' },
    { name: 'Search', component: Search, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' },
    { name: 'Moon', component: Moon, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>' },
    { name: 'Palette', component: Palette, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25"/><path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/></svg>' },
    { name: 'Owl', component: Owl, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>' },
    { name: 'Snowflake', component: Snowflake, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m17 5-5 5-5-5"/><path d="m17 19-5-5-5 5"/><path d="M2 12h20"/><path d="m5 17 5-5 5 5"/><path d="m5 7 5 5 5-5"/></svg>' },
    { name: 'IceCream', component: IceCream, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"/><path d="M17 7A5 5 0 0 0 7 7"/><path d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"/></svg>' },
    { name: 'Circle', component: Circle, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>' },
    { name: 'Rainbow', component: Rainbow, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17a10 10 0 0 0-20 0"/><path d="M6 17a6 6 0 0 1 12 0"/><path d="M10 17a2 2 0 0 1 4 0"/></svg>' },
    { name: 'Eye', component: Eye, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>' },
    { name: 'Sort', component: Sort, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>' },
    { name: 'Filter', component: Filter, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>' },
    { name: 'Cmd', component: Cmd, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M4.5 2a2.5 2.5 0 0 0 0 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a2.5 2.5 0 0 0 0 5A2.5 2.5 0 0 0 7 11.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a2.5 2.5 0 0 0 5 0A2.5 2.5 0 0 0 11.5 9h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a2.5 2.5 0 0 0 0-5A2.5 2.5 0 0 0 9 4.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1A2.5 2.5 0 0 0 4.5 2M9 7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5zm-3-3v1a.5.5 0 0 1-.5.5h-1A1.5 1.5 0 1 1 6 4.5M11.5 6h-1a.5.5 0 0 1-.5-.5v-1A1.5 1.5 0 1 1 11.5 6M6 11.5v-1a.5.5 0 0 0-.5-.5h-1A1.5 1.5 0 1 0 6 11.5m5.5-1.5h-1a.5.5 0 0 0-.5.5v1a1.5 1.5 0 1 0 1.5-1.5"/></svg>' },
  ];

  const devicons: IconEntry[] = [
    { name: 'CSS3', component: Css3, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#1572b6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754l-45.243 12.543z"/><path fill="#33a9dc" d="m64.001 117.062l36.559-10.136l8.601-96.354h-45.16z"/><path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711l-3.4 38.114h-30.95z"/><path fill="#ebebeb" d="m64.083 87.349l-.061.018l-15.403-4.159l-.985-11.031H33.752l1.937 21.717l28.331 7.863l.063-.018z"/><path fill="#fff" d="m81.127 64.675l-1.666 18.522l-15.426 4.164v14.39l28.354-7.858l.208-2.337l2.406-26.881z"/><path fill="#ebebeb" d="M64.048 23.435v13.831H30.64l-.277-3.108l-.63-7.012l-.331-3.711zm-.047 27.996v13.831H48.792l-.277-3.108l-.631-7.012l-.33-3.711z"/></svg>' },
    { name: 'HTML5', component: Html5, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#e44d26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198l-45.019 12.48z"/><path fill="#f16529" d="m64 116.8l36.378-10.086l8.559-95.878H64z"/><path fill="#ebebeb" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692l3.382 37.927H64zm0 35.743l-.061.017l-15.327-4.14l-.979-10.975H33.816l1.928 21.609l28.193 7.826l.063-.017z"/><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849l-15.35 4.143v14.319l28.215-7.82l.207-2.325l3.234-36.233l.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092l.628-6.978l.329-3.692z"/></svg>' },
    { name: 'JavaScript', component: Javascript, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#f0db4f" d="M1.408 1.408h125.184v125.185H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981c-3.832-1.761-8.104-3.022-9.377-5.926c-.452-1.69-.512-2.642-.226-3.665c.821-3.32 4.784-4.355 7.925-3.403c2.023.678 3.938 2.237 5.093 4.724c5.402-3.498 5.391-3.475 9.163-5.879c-1.381-2.141-2.118-3.129-3.022-4.045c-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235c-5.926 6.724-4.236 18.492 2.975 23.335c7.104 5.332 17.54 6.545 18.873 11.531c1.297 6.104-4.486 8.08-10.234 7.378c-4.236-.881-6.592-3.034-9.139-6.949c-4.688 2.713-4.688 2.713-9.508 5.485c1.143 2.499 2.344 3.63 4.26 5.795c9.068 9.198 31.76 8.746 35.83-5.176c.165-.478 1.261-3.666.38-8.581M69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149c-1.713 3.558-6.152 3.117-8.175 2.427c-2.059-1.012-3.106-2.451-4.319-4.485c-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901c4.462 2.678 10.459 3.499 16.731 2.059c4.082-1.189 7.604-3.652 9.448-7.401c2.666-4.915 2.094-10.864 2.07-17.444c.06-10.735.001-21.468.001-32.237"/></svg>' },
    { name: 'Node.js', component: Nodejs, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><defs><linearGradient id="SVGfJo5KBID" x1="34.513" x2="27.157" y1="15.535" y2="30.448" gradientTransform="translate(-129.242 -73.715)scale(6.18523)" gradientUnits="userSpaceOnUse"><stop stop-color="#3f873f"/><stop offset=".33" stop-color="#3f8b3d"/><stop offset=".637" stop-color="#3e9638"/><stop offset=".934" stop-color="#3da92e"/><stop offset="1" stop-color="#3dae2b"/></linearGradient><linearGradient id="SVGO7R9ibnx" x1="30.009" x2="50.533" y1="23.359" y2="8.288" gradientTransform="translate(-129.242 -73.715)scale(6.18523)" gradientUnits="userSpaceOnUse"><stop offset=".138" stop-color="#3f873f"/><stop offset=".402" stop-color="#52a044"/><stop offset=".713" stop-color="#64b749"/><stop offset=".908" stop-color="#6abf4b"/></linearGradient><linearGradient id="SVGXTTu2b3u" x1="21.917" x2="40.555" y1="22.261" y2="22.261" gradientTransform="translate(-129.242 -73.715)scale(6.18523)" gradientUnits="userSpaceOnUse"><stop offset=".092" stop-color="#6abf4b"/><stop offset=".287" stop-color="#64b749"/><stop offset=".598" stop-color="#52a044"/><stop offset=".862" stop-color="#3f873f"/></linearGradient></defs><path fill="url(#SVGfJo5KBID)" d="M66.958.825a6.07 6.07 0 0 0-6.035 0L11.103 29.76c-1.895 1.072-2.96 3.095-2.96 5.24v57.988c0 2.143 1.183 4.167 2.958 5.24l49.82 28.934a6.07 6.07 0 0 0 6.036 0l49.82-28.935c1.894-1.072 2.958-3.096 2.958-5.24V35c0-2.144-1.183-4.167-2.958-5.24z"/><path fill="url(#SVGO7R9ibnx)" d="M116.897 29.76L66.841.825A8 8 0 0 0 65.302.23L9.21 96.798a6.3 6.3 0 0 0 1.657 1.43l50.057 28.934c1.42.833 3.076 1.072 4.615.595l52.66-96.925a3.7 3.7 0 0 0-1.302-1.072"/><path fill="url(#SVGXTTu2b3u)" d="M116.898 98.225c1.42-.833 2.485-2.262 2.958-3.81L65.066.108c-1.42-.238-2.959-.119-4.26.715L11.104 29.639l53.606 98.355c.71-.12 1.54-.358 2.25-.715z"/></svg>' },
    { name: 'Astro', component: AstroIcon, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><defs><linearGradient id="SVGT3rCiA8E" x1="882.997" x2="638.955" y1="27.113" y2="866.902" gradientTransform="scale(.1)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#000014"/><stop offset="1" stop-color="#150426"/></linearGradient><linearGradient id="SVGwA6xje2h" x1="1001.68" x2="790.326" y1="652.45" y2="1094.91" gradientTransform="scale(.1)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff1639"/><stop offset="1" stop-color="#ff1639" stop-opacity="0"/></linearGradient></defs><path fill="url(#SVGT3rCiA8E)" d="M81.504 9.465c.973 1.207 1.469 2.836 2.457 6.09l21.656 71.136a90 90 0 0 0-25.89-8.765L65.629 30.28a1.833 1.833 0 0 0-3.52.004L48.18 77.902a90.1 90.1 0 0 0-26.003 8.778l21.758-71.14c.996-3.25 1.492-4.876 2.464-6.083a8 8 0 0 1 3.243-2.398c1.433-.575 3.136-.575 6.535-.575H71.72c3.402 0 5.105 0 6.543.579a8 8 0 0 1 3.242 2.402Zm0 0"/><path fill="#ff5d01" d="M84.094 90.074c-3.57 3.055-10.696 5.137-18.903 5.137c-10.07 0-18.515-3.137-20.754-7.356c-.8 2.418-.98 5.184-.98 6.954c0 0-.527 8.675 5.508 14.71a5.67 5.67 0 0 1 5.672-5.671c5.37 0 5.367 4.683 5.363 8.488v.336c0 5.773 3.527 10.719 8.543 12.805a11.6 11.6 0 0 1-1.172-5.098c0-5.508 3.23-7.555 6.988-9.938c2.989-1.894 6.309-4 8.594-8.222a15.5 15.5 0 0 0 1.875-7.41a15.6 15.6 0 0 0-.734-4.735m0 0"/><path fill="url(#SVGwA6xje2h)" d="M84.094 90.074c-3.57 3.055-10.696 5.137-18.903 5.137c-10.07 0-18.515-3.137-20.754-7.356c-.8 2.418-.98 5.184-.98 6.954c0 0-.527 8.675 5.508 14.71a5.67 5.67 0 0 1 5.672-5.671c5.37 0 5.367 4.683 5.363 8.488v.336c0 5.773 3.527 10.719 8.543 12.805a11.6 11.6 0 0 1-1.172-5.098c0-5.508 3.23-7.555 6.988-9.938c2.989-1.894 6.309-4 8.594-8.222a15.5 15.5 0 0 0 1.875-7.41a15.6 15.6 0 0 0-.734-4.735m0 0"/></svg>' },
    { name: 'Plaintext', component: Plaintext, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#32322a" d="M57.62 61.68c-1.7.24-2.87 1.78-2.62 3.43a3.07 3.07 0 0 0 2.22 2.54s7.47 2.46 20.18 3.51c10.21.85 21.8-.73 21.8-.73c1.7-.04 3.03-1.45 2.99-3.15a3.065 3.065 0 0 0-3.15-2.99c-.2 0-.4.04-.61.08c0 0-11.34 1.41-20.55.65c-12.15-.97-18.77-3.19-18.77-3.19c-.48-.16-1.01-.24-1.49-.16Zm0-15.22c-1.7.24-2.87 1.78-2.62 3.43a3.07 3.07 0 0 0 2.22 2.54s7.47 2.46 20.18 3.51c10.21.85 21.8-.73 21.8-.73c1.7-.04 3.03-1.45 2.99-3.15a3.065 3.065 0 0 0-3.15-2.99c-.2 0-.4.04-.61.08c0 0-11.34 1.41-20.55.65c-12.15-.97-18.77-3.19-18.77-3.19c-.48-.16-1.01-.24-1.49-.16Zm0-15.22c-1.7.24-2.87 1.78-2.62 3.43a3.07 3.07 0 0 0 2.22 2.54s7.47 2.46 20.18 3.51c10.21.85 21.8-.73 21.8-.73c1.7-.04 3.03-1.45 2.99-3.15a3.065 3.065 0 0 0-3.15-2.99c-.2 0-.4.04-.61.08c0 0-11.34 1.41-20.55.65c-12.15-.97-18.77-3.19-18.77-3.19c-.48-.16-1.01-.2-1.49-.16Zm0-15.18c-1.7.24-2.87 1.78-2.62 3.43a3.07 3.07 0 0 0 2.22 2.54s7.47 2.46 20.18 3.51c10.21.85 21.8-.73 21.8-.73c1.7-.04 3.03-1.45 2.99-3.15a3.065 3.065 0 0 0-3.15-2.99c-.2 0-.4.04-.61.08c0 0-11.34 1.41-20.55.65c-12.15-.97-18.77-3.19-18.77-3.19a2.74 2.74 0 0 0-1.49-.16ZM36.31 0C20.32.12 14.39 5.05 14.39 5.05v119.37s5.81-5.01 24.54-4.24s22.57 7.35 45.58 7.79s28.78-3.55 28.78-3.55l.32-121.67S103.28 5.7 83.09 5.86C62.95 6.01 58.11.73 39.62.12C38.49.04 37.4 0 36.31 0m13.36 7.79s9.69 3.19 27.57 4.08c15.14.77 30.28-1.49 30.28-1.49v108.15s-7.67 4.04-26.84 2.66c-14.86-1.05-31.2-6.7-31.2-6.7l.2-106.69Zm-9.32 2.83c1.7 0 3.11 1.37 3.11 3.11s-1.37 3.11-3.11 3.11c0 0-5.01.04-8.07.32c-5.13.52-8.64 2.38-8.64 2.38c-1.49.81-3.39.2-4.16-1.29c-.81-1.49-.2-3.39 1.29-4.16s4.56-2.42 10.9-3.03c3.67-.4 8.68-.44 8.68-.44m-2.99 15.26c1.7-.04 2.99 0 2.99 0c1.7.2 2.91 1.74 2.7 3.43a3.08 3.08 0 0 1-2.7 2.7s-5.01.04-8.07.32c-5.13.52-8.64 2.38-8.64 2.38c-1.49.81-3.39.2-4.16-1.29c-.81-1.49-.2-3.39 1.29-4.16c0 0 4.56-2.42 10.9-3.03c1.86-.24 4-.32 5.69-.36Zm2.99 15.18c1.7 0 3.11 1.37 3.11 3.11s-1.37 3.11-3.11 3.11c0 0-5.01-.04-8.07.28c-5.13.52-8.64 2.38-8.64 2.38c-1.49.81-3.39.2-4.16-1.29c-.81-1.49-.2-3.39 1.29-4.16c0 0 4.56-2.42 10.9-3.03c3.67-.44 8.68-.4 8.68-.4"/></svg>' },
    { name: 'Git', component: Git, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#f34f29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314c2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295c3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 0 1-13.683 0a9.68 9.68 0 0 1-2.105-10.521L68.574 47.933l-.002 34.341a9.7 9.7 0 0 1 2.559 1.828c3.778 3.777 3.778 9.898 0 13.683c-3.779 3.777-9.904 3.777-13.679 0c-3.778-3.784-3.778-9.905 0-13.683a9.7 9.7 0 0 1 3.167-2.11V47.333a9.6 9.6 0 0 1-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333L3.264 58.123a8.133 8.133 0 0 0 0 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 0 0-.001-11.501"/></svg>' },
    { name: 'Vue', component: Vue, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="none" d="m0 8.934l49.854.158l14.167 24.47l14.432-24.47L128 8.935l-63.834 110.14zm126.98.637l-24.36.02l-38.476 66.053L25.691 9.592L.942 9.572l63.211 107.89zm-25.149-.008l-22.745.168l-15.053 24.647L49.216 9.73l-22.794-.168l37.731 64.476zm-75.834-.17l23.002.009m-23.002-.01l23.002.01"/><path fill="#35495e" d="m25.997 9.393l23.002.009L64.035 34.36L79.018 9.404L102 9.398L64.15 75.053z"/><path fill="#41b883" d="m.91 9.569l25.067-.172l38.15 65.659L101.98 9.401l25.11.026l-62.966 108.06z"/></svg>' },
    { name: 'React', component: React, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><g fill="#61dafb"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3c.6-2.4 1.1-4.8 1.5-7.1c2.1-13.2-.2-22.5-6.6-26.1c-1.9-1.1-4-1.6-6.4-1.6c-7 0-15.9 5.2-24.9 13.9c-9-8.7-17.9-13.9-24.9-13.9c-2.4 0-4.5.5-6.4 1.6c-6.4 3.7-8.7 13-6.6 26.1c.4 2.3.9 4.7 1.5 7.1c-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3c-.6 2.4-1.1 4.8-1.5 7.1c-2.1 13.2.2 22.5 6.6 26.1c1.9 1.1 4 1.6 6.4 1.6c7.1 0 16-5.2 24.9-13.9c9 8.7 17.9 13.9 24.9 13.9c2.4 0 4.5-.5 6.4-1.6c6.4-3.7 8.7-13 6.6-26.1c-.4-2.3-.9-4.7-1.5-7.1c2.4-.7 4.7-1.4 6.9-2.3c12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8M92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3c-.3 2.1-.8 4.3-1.4 6.6c-5.2-1.2-10.7-2-16.5-2.5c-3.4-4.8-6.9-9.1-10.4-13c7.4-7.3 14.9-12.3 21-12.3c1.3 0 2.5.3 3.5.9M81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6c-3.7.3-7.4.4-11.2.4c-3.9 0-7.6-.1-11.2-.4q-3.3-4.8-6-9.6c-1.9-3.3-3.7-6.7-5.3-10c1.6-3.3 3.4-6.7 5.3-10c1.8-3.2 3.9-6.4 6.1-9.6c3.7-.3 7.4-.4 11.2-.4c3.9 0 7.6.1 11.2.4q3.3 4.8 6 9.6c1.9 3.3 3.7 6.7 5.3 10c-1.7 3.3-3.4 6.6-5.3 10m8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3c-3.4.8-7 1.4-10.8 1.9c1.2-1.9 2.5-3.9 3.6-6c1.2-2.1 2.3-4.2 3.4-6.2M64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3c2.3.1 4.6.2 6.9.2s4.6-.1 6.9-.2c-2.2 2.9-4.5 5.7-6.9 8.3m-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9c1.1-3.3 2.3-6.8 3.8-10.3c1.1 2 2.2 4.1 3.4 6.1c1.2 2.2 2.4 4.1 3.6 6.1m-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3c3.4-.8 7-1.4 10.8-1.9c-1.2 1.9-2.5 3.9-3.6 6c-1.2 2.1-2.3 4.2-3.4 6.2M64 30.2c2.4 2.6 4.7 5.4 6.9 8.3c-2.3-.1-4.6-.2-6.9-.2s-4.6.1-6.9.2c2.2-2.9 4.5-5.7 6.9-8.3m22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9c-1.1 3.3-2.3 6.8-3.8 10.3c-1.1-2.1-2.2-4.2-3.4-6.2M31.7 35c-1.7-10.5-.3-17.9 3.8-20.3c1-.6 2.2-.9 3.5-.9c6 0 13.5 4.9 21 12.3c-3.5 3.8-7 8.2-10.4 13c-5.8.5-11.3 1.4-16.5 2.5c-.6-2.3-1-4.5-1.4-6.6M7 64c0-4.7 5.7-9.7 15.7-13.4c2-.8 4.2-1.5 6.4-2.1c1.6 5 3.6 10.3 6 15.6c-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64m28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3c.3-2.1.8-4.3 1.4-6.6c5.2 1.2 10.7 2 16.5 2.5c3.4 4.8 6.9 9.1 10.4 13c-7.4 7.3-14.9 12.3-21 12.3c-1.3 0-2.5-.3-3.5-.9M96.3 93c1.7 10.5.3 17.9-3.8 20.3c-1 .6-2.2.9-3.5.9c-6 0-13.5-4.9-21-12.3c3.5-3.8 7-8.2 10.4-13c5.8-.5 11.3-1.4 16.5-2.5c.6 2.3 1 4.5 1.4 6.6m9-15.6c-2 .8-4.2 1.5-6.4 2.1c-1.6-5-3.6-10.3-6-15.6c2.4-5.3 4.5-10.5 6-15.5c13.8 4 22.1 10 22.1 15.6c0 4.7-5.8 9.7-15.7 13.4"/></g></svg>' },
    { name: 'Svelte', component: SvelteIcon, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#ff3e00" d="M110.43 16.936C98.553-.076 75.09-5.118 58.13 5.696l-29.792 19a34.2 34.2 0 0 0-15.48 22.897a25.478 30.64 0 0 0-.572 6.396a36.15 36.15 0 0 0 4.163 16.73A34.4 34.4 0 0 0 11.34 83.5a25.348 30.483 0 0 0 .345 14.412a36.5 36.5 0 0 0 5.9 13.152c11.878 17.01 35.394 22.053 52.3 11.24l29.762-19.001a34.13 34.13 0 0 0 15.438-22.918a35.5 35.5 0 0 0 .572-6.386a36.2 36.2 0 0 0-4.112-16.71a34.4 34.4 0 0 0 5.112-12.77c.369-2.11.557-4.245.562-6.386a36.4 36.4 0 0 0-6.787-21.178z"/><path fill="#fff" d="M55.219 112.662a28.463 34.23 0 0 1-5.954.76a23.64 23.64 0 0 1-19.435-10.187a21.9 21.9 0 0 1-4.08-12.74a15.658 18.83 0 0 1 .333-3.833a15.425 18.55 0 0 1 .72-2.782l.561-1.708l1.52 1.156a38.7 38.7 0 0 0 11.658 5.834l1.104.333l-.104 1.104v.573a6.63 6.63 0 0 0 1.228 3.854a7.1 7.1 0 0 0 2.538 2.288a8.262 9.936 0 0 0 3.312.837a8.251 9.923 0 0 0 1.79-.229a7.272 8.745 0 0 0 1.833-.802l29.76-19.094a6.26 6.26 0 0 0 2.904-5.302a6.62 6.62 0 0 0-1.26-3.844a7.14 7.14 0 0 0-2.553-2.252a8.313 9.997 0 0 0-3.307-.81a8.246 9.917 0 0 0-1.79.23a6.938 8.344 0 0 0-1.822.801l-11.346 7.25a24.376 29.314 0 0 1-6.048 2.656a23.64 23.64 0 0 1-25.39-9.416a21.94 21.94 0 0 1-4.08-12.74c.002-1.285.114-2.567.333-3.833a20.65 20.65 0 0 1 9.286-13.781l29.792-18.99a21.9 21.9 0 0 1 6.048-2.667a24 24 0 0 1 5.954-.75A23.68 23.68 0 0 1 98.22 24.745a21.94 21.94 0 0 1 4.029 12.75a15.748 18.939 0 0 1-.334 3.844a15.407 18.529 0 0 1-.718 2.781l-.562 1.708l-1.52-1.114a38.4 38.4 0 0 0-11.658-5.834l-1.104-.343l.104-1.105v-.572a6.7 6.7 0 0 0-1.228-3.865a7.1 7.1 0 0 0-2.55-2.25a8.309 9.992 0 0 0-3.3-.813a8.221 9.887 0 0 0-1.77.271a6.819 8.2 0 0 0-1.831.802l-29.793 18.99a5.88 7.071 0 0 0-1.836 1.79a4.75 5.713 0 0 0-.963 2.377a5.037 6.057 0 0 0-.136 1.104a6.62 6.62 0 0 0 1.228 3.844a7.1 7.1 0 0 0 2.549 2.25a8.299 9.98 0 0 0 3.301.812a8.247 9.918 0 0 0 1.79-.23a6.943 8.35 0 0 0 1.833-.801l11.367-7.292a24.218 29.125 0 0 1 6.048-2.656a28.526 34.305 0 0 1 5.954-.76A23.66 23.66 0 0 1 96.566 60.61a21.94 21.94 0 0 1 3.737 16.614a20.6 20.6 0 0 1-9.286 13.781l-29.74 18.99a24.308 29.233 0 0 1-6.057 2.667z"/></svg>' },
    { name: 'Bash', component: Bash, svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#293138" d="M112.205 26.129L71.8 2.142A15.3 15.3 0 0 0 64.005 0c-2.688 0-5.386.717-7.796 2.152L15.795 26.14C10.976 28.999 8 34.289 8 40.018v47.975c0 5.729 2.967 11.019 7.796 13.878L56.2 125.858A15.2 15.2 0 0 0 63.995 128a15.3 15.3 0 0 0 7.796-2.142l40.414-23.987c4.819-2.86 7.796-8.16 7.796-13.878V40.007c0-5.718-2.967-11.019-7.796-13.878m-31.29 74.907l.063 3.448c0 .418-.267.889-.588 1.06l-2.046 1.178c-.321.16-.6-.032-.6-.45l-.032-3.394c-1.745.728-3.523.9-4.647.45c-.214-.086-.31-.397-.225-.76l.739-3.117c.064-.246.193-.493.364-.643a.7.7 0 0 1 .193-.139c.117-.064.235-.075.332-.032c1.22.407 2.773.214 4.272-.535c1.907-.964 3.18-2.913 3.16-4.84c-.022-1.757-.964-2.474-3.267-2.496c-2.934.01-5.675-.567-5.718-4.894c-.032-3.555 1.81-7.26 4.744-9.595l-.032-3.48c0-.428.257-.9.589-1.07l1.98-1.264c.322-.161.6.042.6.46l.033 3.48c1.456-.578 2.72-.738 3.865-.47c.247.063.364.406.257.802l-.77 3.084a1.4 1.4 0 0 1-.354.622a.8.8 0 0 1-.203.15c-.108.053-.204.064-.3.053c-.525-.118-1.767-.385-3.727.6c-2.056 1.038-2.773 2.827-2.763 4.155c.022 1.585.825 2.066 3.63 2.11c3.738.063 5.344 1.691 5.387 5.45c.053 3.684-1.917 7.657-4.937 10.077zm28.206-64.787L70.89 59.86c-4.765 2.784-8.278 5.911-8.288 11.662v47.107c0 3.437 1.392 5.665 3.523 6.318a13 13 0 0 1-2.12.204c-2.239 0-4.445-.61-6.383-1.757L17.219 99.408c-3.951-2.345-6.403-6.725-6.403-11.426V40.007c0-4.7 2.452-9.08 6.403-11.426L57.634 4.594a12.56 12.56 0 0 1 6.382-1.756c2.238 0 4.444.61 6.382 1.756l40.415 23.987c3.33 1.981 5.579 5.397 6.21 9.242c-1.36-2.86-4.38-3.63-7.902-1.574"/><path fill="#4fa847" d="m101.614 92.619l-10.066 6.018c-.268.16-.46.332-.46.653v2.635c0 .32.214.46.481.3l10.216-6.212c.268-.16.31-.45.31-.77v-2.324c0-.322-.213-.45-.481-.3"/></svg>' },
  ];

  let copiedId = $state<string | null>(null);
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;

  async function copySvg(svg: string, name: string) {
    try {
      await navigator.clipboard.writeText(svg);
      copiedId = name;
      if (copyTimeout) clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        copiedId = null;
      }, 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = svg;
      ta.style.position = 'fixed';
      ta.style.left = '-999999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy');
        copiedId = name;
        if (copyTimeout) clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => {
          copiedId = null;
        }, 2000);
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  function handleKeydown(e: KeyboardEvent, svg: string, name: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copySvg(svg, name);
    }
  }
</script>

<section>
  <h2>Icon Components</h2>
  <p>Reusable SVG icon components using Tabler Icons (MIT licensed) and Devicons (MIT licensed). All icons use <code>currentColor</code> for theming and adapt to both light and dark themes.</p>

  <h3>Regular Icons (Tabler Icons)</h3>
  <p>These icons use <code>currentColor</code> and automatically adapt to your theme.</p>

  <div class="icons-grid">
    {#each regularIcons as icon}
      {@const IconComponent = icon.component}
      <span class="tooltip-host icon-card-tooltip-host" data-tooltip={copiedId === icon.name ? 'Copied!' : 'Copy SVG code'}>
        <Card variant="outlined" class="icon-card icon-card--regular" data-icon-name={icon.name}>
          <button
            type="button"
            class="icon-card__button"
            aria-label={copiedId === icon.name ? 'Copied!' : `Copy ${icon.name} SVG code`}
            onclick={() => copySvg(icon.svg, icon.name)}
            onkeydown={(e) => handleKeydown(e, icon.svg, icon.name)}
          >
            <div class="icon-card__preview">
              <IconComponent width={32} height={32} class="icon-card__icon" />
            </div>
            <div class="icon-card__content">
              <h4 class="icon-card__name">{icon.name}</h4>
              <p class="icon-card__hint" class:icon-card__hint--copied={copiedId === icon.name}>
                {copiedId === icon.name ? 'Copied!' : 'Click to copy SVG'}
              </p>
            </div>
          </button>
          <span class="sr-only" data-icon-svg-text={icon.svg}>{icon.svg}</span>
        </Card>
      </span>
    {/each}
  </div>

  <h3>Devicons (Colored Brand Icons)</h3>
  <p>These icons use brand colors and are visible on both light and dark themes.</p>

  <div class="icons-grid">
    {#each devicons as icon}
      {@const IconComponent = icon.component}
      <span class="tooltip-host icon-card-tooltip-host" data-tooltip={copiedId === icon.name ? 'Copied!' : 'Copy SVG code'}>
        <Card variant="outlined" class="icon-card icon-card--devicon" data-icon-name={icon.name}>
          <button
            type="button"
            class="icon-card__button"
            aria-label={copiedId === icon.name ? 'Copied!' : `Copy ${icon.name} SVG code`}
            onclick={() => copySvg(icon.svg, icon.name)}
            onkeydown={(e) => handleKeydown(e, icon.svg, icon.name)}
          >
            <div class="icon-card__preview icon-card__preview--devicon">
              <IconComponent width={32} height={32} class="icon-card__icon icon-card__icon--devicon" />
            </div>
            <div class="icon-card__content">
              <h4 class="icon-card__name">{icon.name}</h4>
              <p class="icon-card__hint" class:icon-card__hint--copied={copiedId === icon.name}>
                {copiedId === icon.name ? 'Copied!' : 'Click to copy SVG'}
              </p>
            </div>
          </button>
          <span class="sr-only" data-icon-svg-text={icon.svg}>{icon.svg}</span>
        </Card>
      </span>
    {/each}
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Gear from './icons/Gear.svelte';
  import Css3 from './icons/devicons/Css3.svelte';
</script>
<Gear width={20} height={20} />
<Css3 width={16} height={16} class="my-icon" />`}
    language="svelte"
  />

  <h3>Icon Props</h3>
  <ul>
    <li><code>width</code> — Icon width (default: 16)</li>
    <li><code>height</code> — Icon height (default: 16)</li>
    <li><code>class</code> — Optional CSS class for styling</li>
  </ul>
  <p>All regular icons use <code>currentColor</code> for theming and adapt to the current theme. Devicons use brand colors and are visible on all themes.</p>
  <p><strong>Astro & Vanilla:</strong> <a href="/docs/components/icons">Astro</a> · Vanilla: same SVG markup and BEM; see Usage above.</p>
</section>

<style>
  /* Grid and card dimensions come from global components.css. Only Svelte-specific overrides here. */
  :global(.icon-card) {
    padding: 0;
    overflow: hidden;
  }

  :global(.icon-card__button) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: var(--spacing-3);
    text-align: center;
    cursor: pointer;
    border: none;
    background: transparent;
    font: inherit;
    color: inherit;
    transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base), background-color var(--transition-base);
  }

  :global(.icon-card__button:hover) {
    background-color: var(--background-alt);
  }

  :global(.icon-card__button:focus-visible) {
    outline: var(--outline-width) solid var(--accent);
    outline-offset: var(--outline-offset);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (width <= 640px) {
    :global(.icon-card__button) {
      padding: var(--spacing-2);
    }
  }
</style>
