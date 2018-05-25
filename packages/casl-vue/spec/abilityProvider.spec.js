import { createLocalVue, mount } from '@vue/test-utils';
import { AbilityBuilder, Ability } from '@casl/ability';
import { abilitiesPlugin } from '../src';
import AbilityProvider from '../src/component/abilityProvider';


describe('vue AbilityProvider component', () => {
  describe('when AbilityProvider exist', () => {
    const localVue = createLocalVue();
    localVue.use(abilitiesPlugin);
    const ability = AbilityBuilder.define(can => can('read', 'Post'));

    localVue.component('ChildrenComponent', {
      name: 'ChildrenComponent',
      inject: ['ability'],
      render(h) {
        return h('div');
      }
    });

    const ProviderComponent = localVue.extend({
      name: 'providerComponent',
      render(h) {
        return h(AbilityProvider, { props: { ability } }, [h('ChildrenComponent')]);
      }
    });
    const wrapper = mount(ProviderComponent, {
      localVue,
    });
    const childrenVm = wrapper.find({ name: 'ChildrenComponent' }).vm;
    it('children component exist', () => {
      expect(childrenVm).not.to.be.empty;
    });
    it('AbilityProvider can provider Ability to children', () => {
      expect(childrenVm.ability).to.equal(ability);
    });
  });

  // const vm = new ProviderComponent().$mount();
});

