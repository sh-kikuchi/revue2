import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';
import TextArea from '../../../../components/global/fields/TextArea.vue';

describe('TextArea', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(TextArea)
    
    // Check if the textarea element exists
    expect(wrapper.find('textarea').exists()).toBe(true)
    
    // Check default props
    expect(wrapper.props('id')).toBe('')
    expect(wrapper.props('class')).toBe('')
    expect(wrapper.props('name')).toBe('')
    expect(wrapper.props('disabledBool')).toBe(false)
    expect(wrapper.props('readonlyBool')).toBe(false)
    expect(wrapper.props('placeholder')).toBe('')
    expect(wrapper.props('maxlength')).toBe(null)
    expect(wrapper.props('minlength')).toBe(0)
    expect(wrapper.props('rows')).toBe(5)
    expect(wrapper.props('cols')).toBe(30)
    expect(wrapper.props('valueName')).toBe('')
  })

  it('emits input event with updated value', async () => {
    const wrapper = mount(TextArea)
    
    // Simulate user input
    await wrapper.find('textarea').setValue('Updated value')
    
    // Check if the emitted event is correct
    expect(wrapper.emitted('update:valueName')).toBeTruthy()
    const emittedEvent = wrapper.emitted('update:valueName')
    expect(emittedEvent).toBeTruthy()
    if (emittedEvent) {
      expect(emittedEvent[0]).toEqual(['Updated value'])
    }
  })

  it('renders correctly when disabled or readonly', async () => {
    const wrapper = mount(TextArea, {
      props: {
        disabledBool: true,
        readonlyBool: true
      }
    })

    expect(wrapper.find('textarea[readonly]').exists()).toBe(true)
    expect(wrapper.find('textarea[disabled]').exists()).toBe(true)

  })

  // Add more test cases as needed
})