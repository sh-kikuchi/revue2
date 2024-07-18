import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';
import Accordion from '../../../../components/global/lists/Accordion.vue';

describe('Accordion', () => {
  it('クリックしたタイトルのアイテムが表示されること', async () => {
    const wrapper = mount(Accordion)

    // 最初のリストのタイトルをクリックしてアイテムが表示されることを確認
    await wrapper.findAll('.accordion > div')[0].trigger('click')
    expect(wrapper.findAll('ul')[0].isVisible()).toBe(true)
    
    // 2番目のリストのタイトルをクリックしてアイテムが表示されることを確認
    await wrapper.findAll('.accordion > div')[1].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('ul')[1].isVisible()).toBe(true)
    
  })

  it('同じタイトルのアイテムが非表示になること', async () => {
    const wrapper = mount(Accordion)

    // console.log("START2");
    // console.log(wrapper.findAll('ul')[0].isVisible());
    // console.log("END");
    
    // 最初のリストのタイトルをクリックしてアイテムが表示されることを確認
    await wrapper.findAll('.accordion > div')[0].trigger('click')
    expect(wrapper.findAll('ul')[0].isVisible()).toBe(true)
    
    // 同じリストのタイトルを再度クリックしてアイテムが非表示になることを確認
    await wrapper.findAll('.accordion > div')[0].trigger('click')
    await wrapper.vm.$nextTick()
    // アコーディオンコンポーネントのインスタンスを取得
    const accordionComponent:any = wrapper.findComponent(Accordion)
    expect(accordionComponent.vm.block.open).toBe('')
  })

  // 他のテストケースを追加しても良いです
})