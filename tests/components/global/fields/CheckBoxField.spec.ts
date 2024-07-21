import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils'
import CheckBoxField from '../../../../components/global/fields/CheckBoxField.vue'

describe('CheckBoxField', () => {
  it('emits update:checked event on checkbox click', async () => {
    const wrapper = mount(CheckBoxField, {
      props: {
        item: 'neko', // item プロパティの値をここで指定してください
        isChecked: true
      },
    });

    // シミュレートされたチェックボックスのクリックイベント
    await wrapper.find('input[type="checkbox"]').trigger('click');

    // update:checked イベントが正しく発生したか確認する
    expect(wrapper.emitted('update:checked')).toBeTruthy();
    expect(wrapper.emitted('update:checked')?.at(0)?.at(0)).toBe('neko');
  });
});
