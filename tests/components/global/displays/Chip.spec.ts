import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';
import Chip from '../../../../components/global/displays/Chip.vue';

describe('Chip', () => {
  it('レンダリングが正しいこと', async () => {
    const wrapper = mount(Chip, {
      props: {
        fontColor: 'white',
        backgroundColor: 'blue',
        content: 'Test Chip'
      }
    });

    // コンポーネントが正しくレンダリングされていることを確認
    expect(wrapper.find('.chip').exists()).toBe(true);
    expect(wrapper.find('.chip-content').text()).toBe('Test Chip');

  });

});
