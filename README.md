# 🪶 slim — Simple Event Management for Svelte

**slim** is a lightweight, modular, and easy-to-use event management library for Svelte that allows you to register and dispatch custom events using a context-aware bus mechanism.

---

## 🚀 Features

- ✅ Register custom events with a `useEvents()` API
- ✅ Context-aware bus support
- ✅ Optional `stopPropagation` for scoped event control
- ✅ TypeScript + JavaScript compatible
- ✅ Supports async event handlers
- ✅ Works with all Svelte versions (v3 and up)

---

## 📦 Installation

```bash
npm install slim
```

⚡ Quick Start

```bash
<script>
  import { useEvents, dispatch } from 'slim';

  // Register an event
  onMount(() => {
    useEvents({
      ['ALERT']: (payload) => {
        alert(payload.message);
      },
      stopPropagation: true
    });
  })

  function sendEvent() {
    dispatch('my-event', { message: 'Hello from slim!' });
  }
</script>

<button on:click={sendEvent}>Send Event</button>
  ```

## 📚 API Reference

`useEvents(events: Record<string, EventConfig>): () => void`

  Registers multiple event handlers and returns a cleanup function to unregister them.

- Parameters:

  events: An object where keys are event names and values are EventConfig objects.

- Returns:

  A cleanup function to unregister all event handlers when called.

- Example:

  ```bash
  import { useEvents } from 'slim';
  
  useEvents({
    ['LOG_MESSAGE']: {
      handler: (payload) => {
        console.log('Received:', payload);
      },
      stopPropagation: true, // Optional, default value is false
    },
    ['LOAD_DATA']: {
      handler: async (payload) => {
        await fetch('/api/log', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        console.log('Logged data:', payload);
      }
    },
  });
  
  ```

`dispatch(event: string, ...args: any[]): Promise<void>`

  Dispatches an event asynchronously to all registered handlers.

- Parameters:

  event: The name of the event to dispatch.

  ...args: Any arguments to pass to event handlers.

- Returns:

  A Promise that resolves when all event handlers have been invoked.

- Example:

  ```bash
  import { dispatch } from 'slim';
  
  dispatch('my-event', { message: 'Hello, world!' });
  
  ```

## 🎯 Why Use slim?

Traditional event handling in Svelte often requires passing callbacks or using external stores. slim simplifies event management by providing a dedicated, context-aware event bus that keeps your components decoupled and scalable.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.
