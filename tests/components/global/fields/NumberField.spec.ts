import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils'
import NumberField from '../../../../components/global/fields/NumberField.vue'

describe('NumberField', () => {
  it('renders input element with correct attributes and binds value correctly', () => {
    const number = 100 // 右辺のnumberに100が入っていると仮定します
    const wrapper = mount(NumberField, {
      props: {
        id: 'testId',
        class: 'testClass',
        style: 'color: red;',
        name: 'testName',
        number: number,
        min: 0,
        max: 100,
        disabledBool: true,
        readonlyBool: false
      }
    })

    // テスト対象のinput要素を取得します
    const inputElement = wrapper.find('input[type="number"]')

    // 要素が存在することを確認します
    expect(inputElement.exists()).toBe(true)

    // 各属性が正しくバインドされていることを確認します
    expect(inputElement.attributes('id')).toBe('testId')
    expect(inputElement.attributes('class')).toBe('testClass')
    expect(inputElement.attributes('style')).toBe('color: red;')
    expect(inputElement.attributes('name')).toBe('testName')
    expect(wrapper.find('input').element.value).toBe('100')
    expect(inputElement.attributes('min')).toBe('0')
    expect(inputElement.attributes('max')).toBe('100')
    expect(wrapper.find('input[readonly]').exists()).toBe(false)
    expect(wrapper.find('input[disabled]').exists()).toBe(true)
  })

  it('correctly updates value when input changes', async () => {
    const wrapper = mount(NumberField, {
      props: {
        number: 10
      }
    })

    // テスト対象のinput要素を取得します
    const inputElement = wrapper.find('input[type="number"]')

    // input要素の値を変更します
    await inputElement.setValue('20')

    // 値が正しく更新されたことを確認します
    expect(wrapper.find('input').element.value).toBe('20')
  })
})
