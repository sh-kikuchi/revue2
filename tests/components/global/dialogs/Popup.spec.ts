import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';
import Popup from '../../../../components/global/dialogs/Popup.vue';

describe('Popup', () => {
  it('親要素をクリックして子要素が表示されること', async () => {
    const wrapper = mount(Popup);
    
    // 親要素をクリック
    await wrapper.find('.parent').trigger('click');
    
    // 子要素が表示されていることを確認
    expect(wrapper.find('.child').isVisible()).toBe(true);
  });

  it('子要素をクリックして子要素が非表示になること', async () => {
    const wrapper = mount(Popup);
    
    // 親要素をクリック
    await wrapper.find('.parent').trigger('click');
    
    // 子要素をクリック
    await wrapper.find('.child').trigger('click');
    
    // 子要素が非表示になっていることを確認
    expect(wrapper.find('.child').exists()).toBe(false);
  });

  it('子要素が非表示の状態で再度親要素をクリックして子要素が再表示されること', async () => {
    const wrapper = mount(Popup);
    
    // 親要素をクリック
    await wrapper.find('.parent').trigger('click');
    
    // 子要素をクリック
    await wrapper.find('.child').trigger('click');
    
    // 親要素を再度クリック
    await wrapper.find('.parent').trigger('click');
    
    // 子要素が再表示されていることを確認
    expect(wrapper.find('.child').isVisible()).toBe(true);
  });
});
