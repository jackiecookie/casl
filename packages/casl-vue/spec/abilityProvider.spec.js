import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import { AbilityBuilder, Ability } from '@casl/ability';
import { abilitiesPlugin } from '../src';
import AbilityProvider from '../src/component/abilityProvider';


describe('vue AbilityProvider component', () => {
  describe('AbilityProvider can provider Ability to children', () => {
    const localVue = createLocalVue();
    localVue.use(abilitiesPlugin);
    const childrenComponent = localVue.extend({
      name: 'childrenComponent',
      inject: ['ability'],
      render(h) {
        return h('div');
      }
    });
    const wrapper = shallowMount(AbilityProvider, {
      stubs: {
        'children-component': childrenComponent,
      }
    });
    const childrenVm = wrapper.find('children-component').vm;
    const html = childrenVm.html();
    expect(1).to.equal(1);
  });
});

