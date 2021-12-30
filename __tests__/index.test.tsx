import { act, render, screen, cleanup } from '@testing-library/react';

import Home from '../src/pages/index';

afterEach(cleanup);

describe('Should render the app without crashing', () => {
  it('Renders the home page', async () => {
    await act(() => {
      render(<Home />)
    });
    expect(screen.getByText('User Table')).toBeInTheDocument()
  })
});

describe('Table matches snapshot', () => {
  it('Renders the home page', async () => {
    const mainHome = render(<Home />)
    const table = mainHome.getByTestId('mytable')
    expect(table).toMatchSnapshot()
  });
});