import { mount } from '@vue/test-utils';
import { describe, it, expect } from "vitest";
import Card from '../../../../components/global/displays/Card.vue';

describe('Card', () => {
  it('デフォルトのプロパティで正しくレンダリングされること', () => {
    const wrapper = mount(Card)
    
    // カード要素が存在するかどうかを確認
    expect(wrapper.find('.card').exists()).toBe(true)
    
    // デフォルトのプロパティを確認
    expect(wrapper.props('width')).toBe('500px')
    expect(wrapper.props('height')).toBe('200px')
    expect(wrapper.props('color')).toBe('transparent')
    expect(wrapper.find('.card-title').exists()).toBe(true)
    expect(wrapper.find('.card-subtitle').exists()).toBe(true)
    
  })

  it('指定されたプロパティで正しくレンダリングされること', () => {
    const wrapper = mount(Card, {
      props: {
        width: '600px',
        height: '300px',
        color: 'blue',
        title: 'Test Title',
        subtitle: 'Test Subtitle'
      }
    })

    // 指定されたプロパティが正しく適用されていることを確認
    expect(wrapper.props('width')).toBe('600px')
    expect(wrapper.props('height')).toBe('300px')
    expect(wrapper.props('color')).toBe('blue')
    expect(wrapper.props('title')).toBe('Test Title')
    expect(wrapper.props('subtitle')).toBe('Test Subtitle')

    // タイトルとサブタイトルが正しく表示されていることを確認
    expect(wrapper.find('.card-title').text()).toBe('Test Title')
    expect(wrapper.find('.card-subtitle').text()).toBe('Test Subtitle')
  })

  // 他のテストケースを追加しても良いです
})
