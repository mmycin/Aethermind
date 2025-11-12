export interface GenderCount {
  Gender: 'M' | 'F';
  Count: number;
}

export interface ZoneDistribution {
  Zone_of_Residence: string;
  Count: number;
}

export interface ReasonStats {
  Reason_of_low_attention_span: string;
  Count: number;
}

export interface AgeGroupStats {
  Age_group: string;
  Screentime_mins: number;
  Attention_span_mins: number;
}

export interface ZoneStats {
  Zone_of_Residence: string;
  Screentime_mins: number;
  Attention_span_mins: number;
}

export interface ZoneReasonCounts {
  Zone_of_Residence: string;
  Family_Problems: number;
  Lack_of_Goal_Clarity: number;
  Lack_of_Sleep_Poor_Health: number;
  Multitasking: number;
  Relationship: number;
  Smartphones_Social_Media: number;
  Stress_Anxiety: number;
}

export interface AgeGroupReasonCounts {
  Age_group: string;
  Family_Problems: number;
  Lack_of_Goal_Clarity: number;
  Lack_of_Sleep_Poor_Health: number;
  Multitasking: number;
  Relationship: number;
  Smartphones_Social_Media: number;
  Stress_Anxiety: number;
}

export interface GenderReasonCounts {
  Gender: 'M' | 'F';
  Family_Problems: number;
  Lack_of_Goal_Clarity: number;
  Lack_of_Sleep_Poor_Health: number;
  Multitasking: number;
  Relationship: number;
  Smartphones_Social_Media: number;
  Stress_Anxiety: number;
}

export interface ReasonSpanAttentionStats {
  Reason_of_low_attention_span: string;
  Screentime_mins: number;
  Attention_span_mins: number;
}
