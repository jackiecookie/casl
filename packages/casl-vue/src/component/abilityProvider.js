import { Ability } from '@casl/ability';

export default {
  name: 'AbilityProvider',
  props: {
    ability: Ability
  },
  provide() {
    const { ability } = this;
    return {
      ability: ability || undefined
    };
  },
  render(_) {
    return _('div', {}, this.$slots.default);
    // return _('div');
  }
};

