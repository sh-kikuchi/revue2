import { mount } from '@vue/test-utils';
import { describe, it, expect } from "vitest";
import Tooltip from '../../../../components/global/displays/Tooltip.vue';

describe('Tooltip', () => {
  it('has default tooltip position of top', () => {
    const wrapper = mount(Tooltip);
    const tooltipElement = wrapper.find('.tooltip-content');

    expect(tooltipElement.exists()).toBe(true);
    expect(wrapper.classes()).toContain('top');
  });

  it('applies specified tooltip position', async () => {
    const tooltipPosition = 'right';
    const wrapper = mount(Tooltip, {
      props: {
        tooltipPosition: tooltipPosition,
      },
    });
    const tooltipElement = wrapper.find('.tooltip-content');

    expect(tooltipElement.exists()).toBe(true);
    expect(wrapper.classes()).toContain(tooltipPosition);
  });

  it('displays tooltip content', async () => {
    const tooltipContent = 'Hello World';
    const wrapper = mount(Tooltip, {
      props: {
        tooltipContent: tooltipContent,
      },
    });
    const tooltipElement = wrapper.find('.tooltip-content');

    expect(tooltipElement.text()).toBe(tooltipContent);
  });
});
