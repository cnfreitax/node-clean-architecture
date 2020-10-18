export const anauthorized = {
  description: 'Invalid credentials',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
