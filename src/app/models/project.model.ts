export interface Technology {
  id?: string;
  name: string;
  icon: string;
  category?: string;
  created_at?: string;
}

export interface Project {
  id?: string;
  name: string;
  role: string;
  description: string;
  period_start: string;
  period_end: string;
  importance: 'high' | 'medium' | 'low';
  highlights: string[];
  impact: string;
  is_current: boolean;
  sort_order: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
  technologies?: Technology[];
}

export interface ProjectTechnology {
  id?: string;
  project_id: string;
  technology_id: string;
}

export interface UserProfile {
  id: string;
  role: string;
}

export interface ProfileInfo {
  id?: string;
  name: string;
  title: string;
  description: string;
  photo: string;
  education: string[];
  updated_at?: string;
}
