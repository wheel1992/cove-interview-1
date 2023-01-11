import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Page from './good';

const server = setupServer(
  rest.get(
    'https://my-json-server.typicode.com/savayer/demo/posts',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1000,
            title: { en: 'hello en', id: 'hello id' },
            body: { en: 'body en', id: 'body id' },
            link_title: 'some link here',
            link: 'http://www.linkedin.com',
          },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders page with cards', async () => {
  render(<Page />);

  const linkElement = await screen.findByText('some link here');
  expect(linkElement).toBeInTheDocument();
});
