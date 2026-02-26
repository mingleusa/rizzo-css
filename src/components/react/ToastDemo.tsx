import { Toast } from './Toast';

export function ToastDemo() {
  return (
    <Toast variant="info" position="top-right" dismissible>
      Toast message. Same BEM as Astro and Svelte.
    </Toast>
  );
}
