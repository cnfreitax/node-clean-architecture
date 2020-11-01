export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'API to authenticated',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account',
            },
          },
        },
      },
      400: {
        $ref: '#components/badRequest',
      },
      401: {
        $ref: '#components/anauthorized',
      },
      500: {
        $ref: '#components/serverError',
      },
    },
  },
};