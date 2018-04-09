import React from 'react'
import App from '../App'

import renderer from 'react-test-renderer'

jest.mock('react-navigation', () => 'App')
it('renders without crashing', () => {
  const navigation = { navigate: jest.fn() }
  const rendered = renderer.create(<App />).toJSON()
  expect(rendered).toMatchSnapshot
})
