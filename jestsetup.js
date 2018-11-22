// Make Enzyme functions available in all test files without importing
import Enzyme, { shallow, render, mount } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Configure an adapter
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
// Fail tests on any warning
console.error = message => {
   throw new Error(message);
};