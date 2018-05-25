import { createLocalVue, mount } from '@vue/test-utils';
import { AbilityBuilder, Ability } from '@casl/ability';
import { abilitiesPlugin } from '../src';
import Can from '../src/component/can';
import AbilityProvider from '../src/component/abilityProvider';


describe('vue Can component', () => {
  const localVue = createLocalVue();
  const abilityToPlugin = AbilityBuilder.define(can => can('read Plugin', 'Ability'));
  localVue.use(abilitiesPlugin, abilityToPlugin);

  // describe('when not provider', () => {
  //   const CanComponent = localVue.extend({
  //     name: 'CanComponent',
  //     render(h) {
  //       return h(Can, {
  //         props: {
  //           I: 'read Plugin',
  //           of: 'Ability'
  //         }
  //       }, [h('div')]);
  //     }
  //   });
  //   it('use default ability from plugin', () => {
  //     const wrapper = mount(CanComponent, {
  //       localVue,
  //     });
  //     expect(wrapper).to.equal(abilityToPlugin);
  //   });
  // });

  describe('when provider exist', () => {
    const providerAbility = AbilityBuilder.define(can => can('read Ability', 'Provider'));
    const Component = {
      template: `
               <AbilityProvider :ability="ability">
                  <div></div>
                  <Can  I = 'read Ability' of = 'Provider'>
                    <div>123123</div>
                  </Can>
               </AbilityProvider>
      `,
      props: { ability: providerAbility }
    };
    it('use ability from provider', () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          ability: providerAbility
        }
      });
      expect(wrapper).to.equal(abilityToPlugin);
    });
  });
});
