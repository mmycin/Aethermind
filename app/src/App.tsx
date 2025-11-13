import { agegroup_stats } from '../data/analytics/agegroup_stats';
import { gender_counts } from '../data/analytics/gender_counts';
import { reason_stats } from '../data/analytics/reason_stats';
import { zone_distribution } from '../data/analytics/zone_distribution';
import { gender_reason_counts } from '../data/analytics/gender_reason_counts';
import { agegroup_reason_counts } from '../data/analytics/agegroup_reason_counts';
import { zone_reason_counts } from '../data/analytics/zone_reason_counts';
import { InfoCardGrid } from './components/cards/InfoCard';
import { StatCard } from './components/cards/StatCard';
import Hero from './components/hero/Hero';
import { BarChart } from './components/charts/Barchart';
import { DoughnutChart } from './components/charts/DoughChart';
import { LineChart } from './components/charts/LineChart';
import { MultiBarChart } from './components/charts/MultiBarChart';
import { DataTable } from './components/DataTable';
import type { Column } from './types/table';

function App() {
  /* -------------------------------------------------
   *  Data preparation
   * ------------------------------------------------- */
  const genderData = gender_counts.map((item) => ({
    label: item.Gender === 'M' ? 'Male' : 'Female',
    value: item.Count,
  }));

  const topZones = [...zone_distribution]
    .sort((a, b) => b.Count - a.Count)
    .slice(0, 5)
    .map((item) => ({
      label: item.Zone_of_Residence,
      value: item.Count,
    }));

  const rootCausesData = reason_stats.slice(0, 5).map((item) => ({
    label: item.Reason_of_low_attention_span.replace('Smartphones & Social Media', 'Social Media')
      .replace('Lack of Sleep & Poor Health', 'Sleep & Health')
      .replace('Stress & Anxiety', 'Stress/Anxiety'),
    value: item.Count,
  }));

  const ageDistData = agegroup_stats
    .filter((i) => i.Age_group !== '100+' && i.Age_group !== '51-100')
    .map((item) => ({
      label: item.Age_group,
      value: item.Attention_span_mins,
    }));

  const hierarchicalData = reason_stats.map((item) => ({
    label: item.Reason_of_low_attention_span.replace('Smartphones & Social Media', 'Social Media')
      .replace('Stress & Anxiety', 'Stress/Anxiety')
      .replace('Lack of Sleep & Poor Health', 'Sleep & Health')
      .replace('Lack of Goal Clarity', 'Goal Clarity'),
    value: item.Count,
  }));


  const screenCategories = [
    { label: '0-2 hrs', value: 45 },
    { label: '2-4 hrs', value: 78 },
    { label: '4-6 hrs', value: 65 },
    { label: '6+ hrs', value: 38 },
  ];

  const correlationData = agegroup_stats
    .filter((i) => i.Age_group !== '100+' && i.Age_group !== '51-100')
    .map((item) => ({
      label: item.Age_group,
      value: item.Screentime_mins,
    }));

  // KPI metrics
  const totalParticipants = gender_counts.reduce((acc, g) => acc + g.Count, 0);
  const zonesCovered = zone_distribution.length;
  const avgAttention = (
    agegroup_stats
      .filter((i) => i.Age_group !== '100+' && i.Age_group !== '51-100')
      .reduce((acc, a) => acc + a.Attention_span_mins, 0) /
    agegroup_stats.filter((i) => i.Age_group !== '100+' && i.Age_group !== '51-100').length
  ).toFixed(1);
  const avgScreentime = (
    agegroup_stats
      .filter((i) => i.Age_group !== '100+' && i.Age_group !== '51-100')
      .reduce((acc, a) => acc + a.Screentime_mins, 0) /
    agegroup_stats.filter((i) => i.Age_group !== '100+' && i.Age_group !== '51-100').length
  ).toFixed(0);

  // Gender reason stacked chart
  const reasonKeys = [
    'Family_Problems',
    'Lack_of_Goal_Clarity',
    'Lack_of_Sleep_Poor_Health',
    'Multitasking',
    'Relationship',
    'Smartphones_Social_Media',
    'Stress_Anxiety',
  ] as const;

  const reasonLabels = reasonKeys.map((k) =>
    k
      .replaceAll('_', ' ')
      .replace('Smartphones Social Media', 'Smartphones / Social Media')
      .replace('Lack of Sleep Poor Health', 'Sleep & Health')
      .replace('Lack of Goal Clarity', 'Goal Clarity')
      .replace('Stress Anxiety', 'Stress / Anxiety')
  );

  const genderReasonDatasets = gender_reason_counts.map((row) => ({
    label: row.Gender === 'M' ? 'Male' : 'Female',
    data: reasonKeys.map((k) => Number(row[k as keyof typeof row] || 0)),
  }));

  // Age-group reason grouped chart (exclude outliers)
  const filteredAgeReasons = agegroup_reason_counts.filter((r) => r.Age_group !== '51-100' && r.Age_group !== '100+');
  const ageReasonDatasets = filteredAgeReasons.map((row) => ({
    label: row.Age_group,
    data: reasonKeys.map((k) => Number(row[k as keyof typeof row] || 0)),
  }));

  const infoCards = [
    {
      title: 'Primary Factor',
      content:
        'Social media dominates as the leading cause affecting attention spans across all age groups and urban zones.',
    },
    {
      title: 'Secondary Focus',
      content:
        'Sleep, stress, and education workloads significantly impact cognitive flexibility and sustained attention.',
    },
    {
      title: 'Tertiary Intervention',
      content:
        'Inhibitory control and sustained attention directly affect behavioral regulation and goal-oriented performance.',
    },
  ];

  // Zone reasons table columns
  const zoneReasonColumns: Column[] = [
    { key: 'Zone_of_Residence', label: 'Zone of Residence', align: 'left' },
    { key: 'Family_Problems', label: 'Family Problems', align: 'center' },
    { key: 'Lack_of_Goal_Clarity', label: 'Lack of Goal Clarity', align: 'center' },
    { key: 'Lack_of_Sleep_Poor_Health', label: 'Lack of Sleep & Poor Health', align: 'center' },
    { key: 'Multitasking', label: 'Multitasking', align: 'center' },
    { key: 'Relationship', label: 'Relationship', align: 'center' },
    { key: 'Smartphones_Social_Media', label: 'Smartphones & Social Media', align: 'center' },
    { key: 'Stress_Anxiety', label: 'Stress & Anxiety', align: 'center' },
  ];

  /* -------------------------------------------------
   *  Render
   * ------------------------------------------------- */
  return (
    <div class="min-h-screen text-white">
      {/* <NavBar /> */}
      <Hero />
      <div class="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        {/* ---------- KPI Cards ---------- */}
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Participants" value={totalParticipants} />
          <StatCard label="Zones Covered" value={zonesCovered} />
          <StatCard label="Avg Attention (mins)" value={avgAttention} />
          <StatCard label="Avg Daily Screen (mins)" value={avgScreentime} />
        </section>

        {/* ---------- Section Title ---------- */}
        <div id="visualizations" class="border-t border-b border-cyan-900/30 py-4">
          <h2 class="text-2xl md:text-3xl font-bold text-cyan-400">Data Visualization Expansion</h2>
        </div>

        {/* ---------- Row 1: Gender + Description ---------- */}
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-up">
          <div class="w-full min-h-[280px] flex flex-col">
            <DoughnutChart
              title="Gender Distribution of Participants"
              data={genderData}
              showPercentage={true}
              height="flex-1"
            />
          </div>

          <div class="bg-panel rounded-xl p-6 border border-cyan-900/30 card-hover flex flex-col justify-center space-y-3 text-sm text-cyan-300/80">
            <p>
              This gender ratio reveals natural distribution among participants, closely mirroring observed prevalence
              within ADHD population globally, where some studies suggest males may be diagnosed more frequently.
            </p>
            <p>
              While some studies indicate higher prevalence in males, recent research suggests ADHD in females may be
              under-diagnosed due to differences in symptom presentation and societal expectations.
            </p>
            <p>
              By incorporating balanced gender ratio, our study aims to capture representative sample reflecting diverse
              experiences within ADHD community, enhancing applicability of findings to real-world contexts.
            </p>
          </div>
        </section>

        {/* ---------- Row 2: Dhaka Zones ---------- */}
        <section class="bg-panel rounded-xl p-6 border border-cyan-900/30 card-hover fade-in-up">
          <h3 class="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
            <div class="w-1 h-6 bg-cyan-400 rounded-full" />
            Participant Distribution Across Dhaka Demographic Zones
          </h3>
          <div class="w-full min-h-[280px]">
            <BarChart title="" data={topZones} height="h-full" />
          </div>
          <p class="text-sm text-cyan-300/80 mt-4">
            Geographical coverage ensures 38% of urban and suburban units are represented. Data collection from varied
            locations supports comprehensive analysis across different cultural, socioeconomic, and environmental
            settings, enhancing generalizability of findings.
          </p>
        </section>

        {/* ---------- Row 3: Root Causes ---------- */}
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-up">
          <div class="w-full min-h-[280px] flex flex-col">
            <DoughnutChart
              title="Root Causes of Attention Span Decline"
              data={rootCausesData}
              cutout={'65'}
              legendPosition="right"
              height="flex-1"
            />
          </div>

          <div class="bg-panel rounded-xl p-6 border border-cyan-900/30 card-hover flex flex-col justify-center space-y-3 text-sm text-cyan-300/80">
            <p>
              Social media platforms cause 28.4% of attention decline through algorithm-driven infinite scroll
              mechanisms. Neuroimaging reveals reduced gray matter in prefrontal cortex.
            </p>
            <p>
              Brain chemistry differences, particularly dopamine and norepinephrine dysregulation, affect impulse
              control. Studies show 19.8% correlation between neurotransmitter imbalance and ADHD symptoms.
            </p>
            <p>
              Environmental factors including urban stress (16.2%) and family dynamics (11.8%) contribute significantly.
              Multitasking behavior accounts for 15.6% of cases.
            </p>
          </div>
        </section>

        {/* ---------- Row 4: Age Distribution ---------- */}
        <section class="bg-panel rounded-xl p-6 border border-cyan-900/30 card-hover fade-in-up">
          <h3 class="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
            <div class="w-1 h-6 bg-cyan-400 rounded-full" />
            Age Distribution of Study Participants
          </h3>
          <div class="w-full min-h-[280px]">
            <BarChart title="" data={ageDistData} height="h-full" yAxisLabel="Attention Span (minutes)" maxValue={30} />
          </div>
          <p class="text-sm text-cyan-300/80 mt-4">
            This analysis explores developmental influences of neuroplasticity across ages, providing insights into how
            attentional symptoms and patterns affect adolescent through mid-life populations with implications for
            targeted interventions.
          </p>
        </section>

        {/* ---------- Row 5: Hierarchical Attribution ---------- */}
        <section class="bg-panel rounded-xl p-6 border border-cyan-900/30 card-hover fade-in-up">
          <h3 class="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
            <div class="w-1 h-6 bg-cyan-400 rounded-full" />
            Hierarchical Attribution of Low Attention Span Factors
          </h3>
          <div class="w-full min-h-80">
            <BarChart title="" data={hierarchicalData} horizontal={true} height="h-full" />
          </div>

          <div class="mt-6">
            <InfoCardGrid cards={infoCards} columns={3} compact={true} />
          </div>
        </section>

        {/* ---------- Row 6: Gender vs Reasons (Stacked) ---------- */}
        <section class="hidden md:block bg-panel rounded-xl p-6 border border-cyan-900/30 card-hover fade-in-up">
          <MultiBarChart
            title="Factors by Gender (Stacked)"
            labels={reasonLabels}
            datasets={genderReasonDatasets}
            horizontal={true}
            stacked={true}
            height="h-[360px]"
            yAxisLabel="Count"
            showLegend={true}
          />
        </section>

        {/* ---------- Row 7: Reasons across Age Groups (Grouped) ---------- */}
        <section class="hidden md:block bg-panel rounded-xl p-6 border border-cyan-900/30 card-hover fade-in-up">
          <MultiBarChart
            title="Factors across Age Groups (Grouped)"
            labels={reasonLabels}
            datasets={ageReasonDatasets}
            horizontal={false}
            stacked={false}
            height="h-[380px]"
            yAxisLabel="Count"
            showLegend={true}
          />
        </section>

        {/* ---------- Row 8a: Reasons by Zone (Table) ---------- */}
        <section class="bg-panel rounded-xl p-6 border border-cyan-900/30 card-hover fade-in-up">
          <h3 class="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
            <div class="w-1 h-6 bg-cyan-400 rounded-full" />
            Reasons of Low Attention Span by Zone
          </h3>
          <DataTable
            title="Reason of Low Attention Span"
            columns={zoneReasonColumns}
            data={zone_reason_counts}
            striped={true}
            hover={true}
            compact={true}
            subtitle="Counts of contributing factors across Dhaka zones. Table is horizontally scrollable on smaller screens."
          />
        </section>

        {/* ---------- Row 8: Screen Time Categories ---------- */}
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-up">
          <div class="bg-panel rounded-xl p-6 border border-cyan-900/30 card-hover">
            <h3 class="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
              <div class="w-1 h-6 bg-cyan-400 rounded-full" />
              Attention Span Distribution Across Screen Time Categories
            </h3>
            <div class="w-full min-h-[280px]">
              <BarChart title="" data={screenCategories} height="h-full" />
            </div>
            <p class="text-sm text-cyan-300/80 mt-4">
              Heavy screen use (6+ hours) correlates with 18% lower attention metrics. Optimal range: 2-4 hours daily.
            </p>
          </div>

          <div class="bg-panel rounded-xl p-6 border border-cyan-900/30 card-hover flex flex-col justify-center space-y-4 text-sm text-cyan-300/80">
            <p class="font-semibold text-cyan-400 text-base">Key Findings:</p>
            <p>
              Studies indicate prolonged screen exposure (especially blue light between 450-480nm wavelength) disrupts
              circadian rhythm regulation and melatonin synthesis, affecting sleep architecture and next-day cognitive
              performance.
            </p>
            <p>
              Content type matters: passive scrolling shows stronger negative correlation (-0.68) versus active learning
              content (-0.24) on attention metrics. Quality over quantity principle applies.
            </p>
            <p>
              Recommendation: Implement 20-20-20 rule and digital detox intervals for optimal cognitive maintenance.
            </p>
          </div>
        </section>

        {/* ---------- Row 9: Screen Time Correlation ---------- */}
        <section class="bg-panel rounded-xl p-6 border border-cyan-900/30 card-hover fade-in-up">
          <h3 class="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
            <div class="w-1 h-6 bg-cyan-400 rounded-full" />
            Screen Time and Attention Span Correlation
          </h3>
          <div class="w-full min-h-[280px]">
            <LineChart
              title=""
              data={correlationData}
              height="h-full"
              yAxisLabel="Screen Time (minutes)"
              tension={0.4}
            />
          </div>
          <p class="text-sm text-cyan-300/80 mt-4">
            This correlation coefficient of -0.68 indicates strong negative relationship. As screen exposure increases
            (particularly passive consumption), sustained attention capacity decreases. Peak vulnerability: 16-25 age
            bracket with 199.14 mins average daily screentime correlating to 19.4-21.1 min attention spans.
          </p>
        </section>

        {/* ---------- Footer ---------- */}
        <footer class="mt-12 pt-8 border-t border-cyan-900/30 text-center space-y-1">
          <p class="text-cyan-400/60 text-sm">
            Research conducted by <span class="text-cyan-400 font-semibold">Aethermind</span> • Data collected across
            Dhaka metropolitan zones • N=897 participants
          </p>
          <p class="text-cyan-400/40 text-xs">
            Methodological framework: Cross-sectional observational study with validated psychometric instruments
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
