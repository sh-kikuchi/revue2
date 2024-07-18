import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';
import NavBar from '../../../../components/global/navigations/NavBar.vue';

describe('NavBar', () => {
  it('コンポーネントが表示されること', async () => {
    const wrapper = mount(NavBar, {
      props: {
        isVisible: true
      }
    });

    // コンポーネントが表示されていることを確認
    expect(wrapper.find('.navigation').exists()).toBe(true);
  });

  it('コンポーネントが非表示になること', async () => {
    const wrapper = mount(NavBar, {
      props: {
        isVisible: false
      }
    });
    await wrapper.vm.$nextTick()

    // コンポーネントが非表示になっていることを確認
    const navigationContentElement = wrapper.find('.navigation-content').element as HTMLElement;
    expect(navigationContentElement.style.display).toBe('none');
  });

  it('コンポーネントが閉じられること', async () => {
    const wrapper = mount(NavBar, {
      props: {
        isVisible: true
      }
    });

    // コンポーネントが閉じられることを確認
    await wrapper.find('.navigation').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
