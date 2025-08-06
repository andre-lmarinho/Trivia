// vitest.setup.ts
import { expect } from 'vitest';

expect.extend({
  toBeInTheDocument(received: unknown) {
    const pass = received instanceof Node && document.body.contains(received);
    return {
      pass,
      message: () =>
        pass
          ? 'expected element not to be in the document'
          : 'expected element to be in the document',
    };
  },
});
