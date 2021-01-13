import React from 'react'
import {render, screen} from '@testing-library/react'
import App from './App'

test('x', () => {
    render(<App/>)
    const linkElement = screen.getByText(/x/i)
    expect(linkElement).toBeInTheDocument()
})
