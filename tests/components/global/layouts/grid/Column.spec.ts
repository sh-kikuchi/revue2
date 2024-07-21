
import { mount } from '@vue/test-utils';
import { describe, it, expect } from "vitest";
import Column from '../../../../../components/global/layouts/grid/Column.vue';

describe('Column', () => {
  it('sets correct class based on cols prop', () => {
    const cols = 6;
    const wrapper = mount(Column, {
      props: {
        cols: cols,
      },
    });

    const colElement = wrapper.find('div');

    expect(colElement.classes()).toContain(`col-${cols}`);
  });

  it('sets correct class based on sm_cols prop', () => {
    const smColumns = 4;
    const wrapper = mount(Column, {
      props: {
        sm_cols: smColumns,
      },
    });

    const colElement = wrapper.find('div');

    expect(colElement.classes()).toContain(`col-sm-${smColumns}`);
  });
});
