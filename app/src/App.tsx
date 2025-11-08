import { createEffect, createSignal } from 'solid-js';
import { query, gender_counts } from '../data';
import { sql } from './utils/sql';
import PieChart from './components/charts/PieChart';
import DataTable from './components/Table';

function App() {
  const [result, setResult] = createSignal<typeof gender_counts>();

  createEffect(() => {
    const res = query(sql`SELECT * FROM ?;`, gender_counts);
    setResult(res as typeof gender_counts);
  });

  const labels = () => result()?.map((r) => r.Gender) || [];
  const values = () => result()?.map((r) => r.Count) || [];

  return (
    <div class="flex flex-row gap-10 p-4">
      <div class="w-full max-w-xs aspect-square">
        <PieChart labels={labels()} data={values()} title="Gender Count" />
      </div>

      <div class="p-4">
        <DataTable data={result() || []} title="Gender Count Table" />
      </div>

      
    </div>
  );
}

export default App;
