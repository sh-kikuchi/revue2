import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from "vitest";
import { TabPanel }from '../../../../components/global/navigations/Tab.vue';

describe('Tab', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(Tab);
    
    // propsが適切にデフォルト値で初期化されていることを確認
    expect(wrapper.vm.$props.count).toBe(2);
    expect(wrapper.vm.$props.width).toBe(200);
    expect(wrapper.vm.$props.tabs).toEqual(['apple', 'banana']);
  });

  it('changes active tab when clicked', async () => {
    const wrapper = shallowMount(Tab);

    // 最初のタブがアクティブであることを確認
    expect(wrapper.find('.tabnav li:nth-child(1)').classes()).toContain('active');
    expect(wrapper.find('.tabnav li:nth-child(2)').classes()).not.toContain('active');
    expect(wrapper.find('.tabcontent-list:nth-child(1)').exists()).toBe(true);
    expect(wrapper.find('.tabcontent-list:nth-child(2)').exists()).toBe(false);
  
    // 2番目のタブをクリックする
    await wrapper.find('.tabnav li:nth-child(2)').trigger('click');

    // クリックイベントの処理を待機する
    await wrapper.trigger('click');

    // Vueの非同期更新を待機する
    await wrapper.vm.$nextTick();
  
    // 2番目のタブがアクティブになり、2番目のコンテンツが表示されることを確認
    expect(wrapper.find('.tabnav li:nth-child(1)').classes()).not.toContain('active');
    expect(wrapper.find('.tabnav li:nth-child(2)').classes()).toContain('active');
    // expect(wrapper.find('.tabcontent-list:nth-child(1)').exists()).toBe(false);
    // expect(wrapper.find('.tabcontent-list:nth-child(2)').exists()).toBe(true);
  });
  
});
