import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';
import Pagination from '../../../../components/global/navigations/Pagination.vue';

describe('Pagination', () => {
  it('paginationメソッドが適切な値を設定すること', async () => {
    const wrapper = mount(Pagination, {
      props: {
        itemLength: 16,
        steps: 3
      }
    });
    
    expect(wrapper.vm.totalPages).toBe(6);
    expect(wrapper.vm.first).toBe(1);
    expect(wrapper.vm.last).toBe(3);
  });

  it('nextメソッドが最後のページで呼び出されたときページが変更されないこと', async () => {
    const wrapper = mount(Pagination, {
      props: {
        itemLength: 16,
        steps: 3
      }
    });
    
    wrapper.vm.page = 6;
    await wrapper.vm.next();
    
    expect(wrapper.vm.page).toBe(6);
  });

  it('prevメソッドが最初のページで呼び出されたときページが変更されないこと', async () => {
    const wrapper = mount(Pagination, {
      props: {
        itemLength: 16,
        steps: 3
      }
    });
    
    wrapper.vm.page = 1;
    await wrapper.vm.prev();
    
    expect(wrapper.vm.page).toBe(1);
  });

  it('pushNumperメソッドが正しいページ番号に移動すること', async () => {
    const wrapper = mount(Pagination, {
      props: {
        itemLength: 16,
        steps: 3
      }
    });
    
    await wrapper.vm.pushNumper(3);
    
    expect(wrapper.vm.page).toBe(3);
  });
});