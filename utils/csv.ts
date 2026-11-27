// CSV の読み書き。EditableTable の Column / Row をそのまま渡せる形にしている

/** CSV にする列。key は行データのキー。type が "number" の列は読み込み時に数値に戻す */
export type CsvColumn = { key: string; type?: string };
export type CsvRow = Record<string, string | number>;

/** 値を CSV の1マスにする。カンマ・ダブルクォート・改行を含むときは " で囲む */
const toCell = (value: string | number) => {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

/** 行データを CSV の文字列にする（1行目は列のキー） */
export function toCsv(columns: CsvColumn[], rows: CsvRow[]): string {
  const header = columns.map((col) => toCell(col.key)).join(",");
  const lines = rows.map((row) => columns.map((col) => toCell(row[col.key] ?? "")).join(","));
  return [header, ...lines].join("\r\n");
}

/** CSV の文字列を行データに戻す。" で囲まれたカンマや改行もそのまま読む */
export function parseCsv(text: string, columns: CsvColumn[]): CsvRow[] {
  const records: string[][] = [];
  let record: string[] = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      record.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      record.push(cell);
      records.push(record);
      record = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell !== "" || record.length > 0) {
    record.push(cell);
    records.push(record);
  }

  // 1行目（見出し）を飛ばし、空行は捨てる。数値の列は数値に戻す
  return records
    .slice(1)
    .filter((cells) => cells.some((c) => c !== ""))
    .map((cells) =>
      Object.fromEntries(
        columns.map((col, i) => {
          const value = cells[i] ?? "";
          return [col.key, col.type === "number" && value !== "" ? Number(value) : value];
        }),
      ),
    );
}
