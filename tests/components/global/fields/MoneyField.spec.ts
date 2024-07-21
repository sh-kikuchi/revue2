import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils'
import MoneyField from '../../../../components/global/fields/MoneyField.vue'


describe('MoneyField', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(MoneyField);
    expect(wrapper.exists()).toBe(true);
    // デフォルトプロップスを持つコンポーネントが正しくレンダリングされたことを確認するテストを追加できます
  });

  it('formats the money value correctly', async () => {
    const wrapper = mount(MoneyField, {
      props: {
        money: 1000,
      },
    });
    await wrapper.vm.$nextTick(); // レンダリングが完了するのを待ちます

    const input = wrapper.find('input');
    expect(input.element.value).toBe('1,000'); // お金の値が適切にフォーマットされたことを確認します
  });

  it('emits update:money event when value changes', async () => {
    const wrapper = mount(MoneyField);
    const input = wrapper.find('input');
    await input.setValue('2000'); // inputの値を変更します

    expect(wrapper.emitted('update:money')).toBeTruthy(); // update:moneyイベントがemitされたことを確認します
    expect(wrapper.emitted('update:money')?.at(0)?.at(0)).toBe('2,000'); // emitされた値が正しいことを確認します
  });

  // 他のテストケースも追加できます
});