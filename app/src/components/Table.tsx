import { For, type Component } from 'solid-js';

type DataTableProps = {
  data: Array<Record<string, any>>;
  columns?: string[]; // optional: if not provided, use keys from first row
  title?: string;
};

const DataTable: Component<DataTableProps> = (props) => {
  const cols = () => props.columns || (props.data[0] ? Object.keys(props.data[0]) : []);

  return (
    <div class="overflow-x-auto p-4">
      {props.title && <h2 class="text-lg font-semibold mb-2">{props.title}</h2>}
      <table class="min-w-full border border-gray-300 border-collapse rounded-lg overflow-hidden">
        <thead class="bg-gray-200">
          <tr>
            <For each={cols()}>{(col) => <th class="border border-gray-300 p-2 text-left">{col}</th>}</For>
          </tr>
        </thead>
        <tbody>
          <For each={props.data}>
            {(row) => (
              <tr class="hover:bg-gray-100">
                <For each={cols()}>{(col) => <td class="border border-gray-300 p-2">{row[col]}</td>}</For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
