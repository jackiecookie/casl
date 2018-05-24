import { Ability } from '@casl/ability';

export default {
  name: 'AbilityProvider',
  props: {
    ability: Ability
  },
  // functional: true,
  provide() {
    const { ability } = this;
    return {
      ability: ability || null
    };
  },
  render(_) {
    return _(this.$children);
  }
};

