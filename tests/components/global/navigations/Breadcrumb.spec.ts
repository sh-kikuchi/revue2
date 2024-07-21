import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from "vitest";
import Breadcrumb from '../../../../components/global/navigations/Breadcrumb.vue';

describe('Breadcrumb', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Breadcrumb);
    const items = wrapper.findAll('.breadcrumb li');

    // パンくずリストの要素数を確認する
    expect(items.length).toBe(3);

    // パンくずリストの各アイテムを確認する
    expect(items[0].text()).toBe('ホーム');
    expect(items[1].text()).toBe('2層目');
    expect(items[2].text()).toBe('現在のページ');
  });
});
