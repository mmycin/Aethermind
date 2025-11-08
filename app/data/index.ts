export { agegroup_reason_counts } from './analytics/agegroup_reason_counts';
export { agegroup_stats } from './analytics/agegroup_stats';
export { gender_counts } from './analytics/gender_counts';
export { gender_reason_counts } from './analytics/gender_reason_counts';
export { reason_span_attention_stats } from './analytics/reason_span_attention_stats';
export { reason_stats } from './analytics/reason_stats';
export { zone_distribution } from './analytics/zone_distribution';
export { zone_reason_counts } from './analytics/zone_reason_counts';
export { zone_stats } from './analytics/zone_stats';

import alasql from 'alasql';

export function query(query: string, table_name: object): typeof table_name {
    var result: typeof table_name = alasql(query, [table_name]);
    console.log(result);
    return result;
}