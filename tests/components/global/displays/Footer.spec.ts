import { mount } from '@vue/test-utils';
import { describe, it, expect } from "vitest";
import Footer from '../../../../components/global/displays/Footer.vue';

describe('Footer', () => {
  it('renders footer element with correct class', () => {
    const wrapper = mount(Footer);
    const footerElement = wrapper.find('footer');

    expect(footerElement.exists()).toBe(true);
    expect(footerElement.classes()).toContain('text-white');
  });

  it('renders current year in footer text', () => {
    const wrapper = mount(Footer);
    const currentYear = new Date().getFullYear();
    const footerText = `2021-${currentYear}-<strong>Re:Vue</strong>`;

    expect(wrapper.html()).toContain(footerText);
  });
});
