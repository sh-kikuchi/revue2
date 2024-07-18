import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from "vitest";
import TreeList from '../../../../components/global/lists/TreeList.vue';

describe('TreeList', () => {
  it('renders correct HTML structure based on props', () => {
    const parents = [
      {
        id: '1',
        title: 'Parents #1',
        href:'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice',
        children:[
          {
            id: '1',
            title: 'Children #1',
            href:'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice',
            grandChildren:[
              {
                id: '1',
                title: 'GrandChildren #1',
                href:'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice',
                items:[
                  {
                    id: '1',
                    title: 'Items #1',
                    href:'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice',
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    const wrapper = shallowMount(TreeList, {
      props: { parents }
    });

    // レンダリングされたHTML構造をチェックするテスト
    expect(wrapper.html()).toMatchSnapshot();
  });
});
