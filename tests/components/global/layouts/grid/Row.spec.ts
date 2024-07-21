import { mount } from '@vue/test-utils';
import { describe, it, expect } from "vitest";
import Row from '../../../../../components/global/layouts/grid/Row.vue';

describe('Row', () => {
  it('renders grid container with correct class', () => {
    const wrapper = mount(Row);
    const gridElement = wrapper.find('.grid');

    expect(gridElement.exists()).toBe(true);
    expect(gridElement.classes()).toContain('grid');
  });

  it('renders slot content', () => {
    const content = '<div>Hello World</div>';
    const wrapper = mount(Row, {
      slots: {
        default: content,
      },
    });

    expect(wrapper.html()).toContain(content);
  });
});
