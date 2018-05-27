import { createLocalVue, mount } from '@vue/test-utils';
import { AbilityBuilder, Ability } from '@casl/ability';
import { abilitiesPlugin } from '../src';


describe('vue Can component', () => {
  const localVue = createLocalVue();
  const abilityToPlugin = AbilityBuilder.define(can => can('read Plugin', 'Ability'));
  localVue.use(abilitiesPlugin, abilityToPlugin);

  describe('when provider exist', () => {
    const Component = {
      template: `
                <div>
                  <Can  I = 'read' of = 'Provider'>
                    <div></div>
                  </Can>
                  <button @click="updateAbility"></button>
                </div>
      `,
      data() {
        return {
          ability: this.$defineAbility(can => can('read', 'Provider'))
        };
      },
      provide() {
        return {
          ability: this.ability
        };
      },
      methods: {
        updateAbility() {
          this.ability.update([{}]);
        }
      }
    };
    const wrapper = mount(Component, {
      localVue
    });
    it('use ability from provider', () => {
      expect(wrapper.contains('div')).to.equal(true);
    });
    it('update ability', () => {
      wrapper.find('button').trigger('click');
      expect(wrapper.contains('div')).to.equal(false);
    });
  });
});
