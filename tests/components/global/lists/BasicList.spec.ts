import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from "vitest";
import BasicList from '../../../../components/global/lists/BasicList.vue';

describe('BasicList', () => {
  it('initializes with correct default props', () => {
    const wrapper = shallowMount(BasicList);
    expect(wrapper.props().items).toEqual([
      {
        id: '1',
        title: 'Item #1',
        value: 1,
        href:'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice'
      },
      {
        id: '2',
        title: 'Item #2',
        value: 2,
      },
      {
        id: '3',
        title: 'Item #3',
        value: 3,
      },
    ]);
  });

  it('renders correct number of list items', () => {
    const wrapper = shallowMount(BasicList);
    const listItems = wrapper.findAll('.list-item');
    expect(listItems.length).toBe(3); // 3つのアイテムがあるはず
  });

  it('deletes an item when delete button is clicked', async () => {
    const wrapper = shallowMount(BasicList);
    const deleteButton = wrapper.find('.list-item:first-child div div'); // 最初の削除ボタンを取得
    await deleteButton.trigger('click'); // ボタンをクリック
    expect(wrapper.props().items).toHaveLength(2); // 1つのアイテムが削除されているはず
  });
});