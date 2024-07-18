import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils'
import FileField from '../../../../components/global/fields/FileField.vue';

describe('FileInput', () => {
  it('ファイルが選択された時にファイルデータがemitされること', async () => {
    // モックのFileオブジェクトを作成
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });

    // input[type="file"] を作成
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;

    // FileListを作成
    const fileList = [file];
    Object.defineProperty(input, 'files', {
      value: fileList,
      writable: false
    });

    // コンポーネントをレンダリング
    const wrapper = mount(FileField);

    // input[type="file"] の変更イベントをトリガー
    await wrapper.find('input[type="file"]').element.dispatchEvent(new Event('change'));

    // emitされたイベントが正しいことを検証
    expect(wrapper.emitted().fileData).toBeTruthy();
  });
});
