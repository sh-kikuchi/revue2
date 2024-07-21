import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils'
import RangeField from '../../../../components/global/fields/RangeField.vue'

describe('RangeField', () => {
  it('renders the range input component with default values', () => {
    const wrapper = mount(RangeField);

    // Check if range input element exists
    const rangeInputElement = wrapper.find('input[type="range"]');
    expect(rangeInputElement.exists()).toBe(true);

    // Check if default props are applied correctly
    expect(rangeInputElement.attributes('id')).toBe('');
    expect(rangeInputElement.attributes('class')).toBe('');
    expect(rangeInputElement.attributes('name')).toBe('');
    expect(rangeInputElement.attributes('min')).toBe('0');
    expect(rangeInputElement.attributes('max')).toBe('100');
    expect(rangeInputElement.attributes('step')).toBe('10');
    expect(rangeInputElement.attributes('readonly')).toBe(undefined);
    expect(rangeInputElement.attributes('disabled')).toBe(undefined);
  });

  it('emits update:range-value event on change', async () => {
    const wrapper = mount(RangeField);

    // Simulate range input change
    const rangeInputElement = wrapper.find('input[type="range"]');
    await rangeInputElement.setValue(50);

    // Check if update:range-value event is emitted with correct value
    expect(wrapper.emitted('update:range-value')).toBeTruthy();
    expect(wrapper.emitted('update:range-value')?.at(0)).toEqual(["50"]);
  });
});
