import { mount } from '@vue/test-utils';
import { describe, it, expect } from "vitest";
import PageTitle from '../../../../components/global/displays/PageTitle.vue';

describe('PageTitle', () => {
  it('renders title correctly', () => {
    const title = 'Sample PageTitle';
    const wrapper = mount(PageTitle, {
      props: {
        title: title,
      },
    });

    expect(wrapper.text()).toBe(title);
  });

  it('applies correct styles to title element', () => {
    const title = 'Sample PageTitle';
    const wrapper = mount(PageTitle, {
      props: {
        title: title,
      },
    });

    const titleElement = wrapper.find('h1');

    expect(titleElement.exists()).toBe(true);
    expect(titleElement.classes()).toContain('text-center');
   
  });
});
