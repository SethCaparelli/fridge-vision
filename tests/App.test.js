import React from 'react'
import App from '../App'

import renderer from 'react-test-renderer'


it('renders without crashing', () => {
  const navigation = { navigate: jest.fn() }
  jest.mock('react-navigation', () => 'App')

  expect(renderer.create(<App navigation={navigation} />)).toMatchSnapshot()
})
