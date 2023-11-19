import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '.';

describe('Loading component', () => {
  it('renders the Loading component with default size "md"', () => {
    render(<Loading />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders the Loading component with size "sm"', () => {
    render(<Loading size="sm" />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders the Loading component with size "lg"', () => {
    render(<Loading size="lg" />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders the Loading component with size "xs"', () => {
    render(<Loading size="xs" />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
  });

  it('verifies that the "sr-only" span is present', () => {
    render(<Loading />);
    const srOnlyElement = screen.getByText('Loading...');
    expect(srOnlyElement).toBeInTheDocument();
  });
});


