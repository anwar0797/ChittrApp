import React from 'React';
import Feed from '../src/component/tabs/feed/Feed'

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});