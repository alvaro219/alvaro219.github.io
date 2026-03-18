import { Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Project, Technology, ProfileInfo } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  projects = signal<Project[]>([]);
  technologies = signal<Technology[]>([]);
  profile = signal<ProfileInfo | null>(null);
  loading = signal(false);

  constructor(private supabase: SupabaseService) {}

  async loadProfile(): Promise<void> {
    const { data } = await this.supabase.client
      .from('profiles')
      .select('*')
      .single();
    if (data) this.profile.set(data as ProfileInfo);
  }

  async loadProjects(): Promise<void> {
    this.loading.set(true);
    const { data: projects } = await this.supabase.client
      .from('projects')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (projects) {
      const enriched = await Promise.all(
        projects.map(async (p: Project) => {
          const { data: techs } = await this.supabase.client
            .from('project_technologies')
            .select('technology_id')
            .eq('project_id', p.id);

          if (techs && techs.length > 0) {
            const techIds = techs.map((t: { technology_id: string }) => t.technology_id);
            const { data: techData } = await this.supabase.client
              .from('technologies')
              .select('*')
              .in('id', techIds);
            p.technologies = (techData as Technology[]) ?? [];
          } else {
            p.technologies = [];
          }
          return p;
        })
      );
      this.projects.set(enriched);
    }
    this.loading.set(false);
  }

  async loadTechnologies(): Promise<void> {
    const { data } = await this.supabase.client
      .from('technologies')
      .select('*')
      .order('name', { ascending: true });
    if (data) this.technologies.set(data as Technology[]);
  }

  async getProjectById(id: string): Promise<Project | null> {
    const { data } = await this.supabase.client
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (!data) return null;

    const project = data as Project;
    const { data: techs } = await this.supabase.client
      .from('project_technologies')
      .select('technology_id')
      .eq('project_id', id);

    if (techs && techs.length > 0) {
      const techIds = techs.map((t: { technology_id: string }) => t.technology_id);
      const { data: techData } = await this.supabase.client
        .from('technologies')
        .select('*')
        .in('id', techIds);
      project.technologies = (techData as Technology[]) ?? [];
    } else {
      project.technologies = [];
    }
    return project;
  }

  // ─── CRM Methods ───

  async saveProject(project: Partial<Project>): Promise<{ error: string | null }> {
    const payload = { ...project, updated_at: new Date().toISOString() };
    delete payload.technologies;

    if (project.id) {
      const { error } = await this.supabase.client
        .from('projects')
        .update(payload)
        .eq('id', project.id);
      return { error: error?.message ?? null };
    } else {
      const { error } = await this.supabase.client.from('projects').insert(payload);
      return { error: error?.message ?? null };
    }
  }

  async deleteProject(id: string): Promise<{ error: string | null }> {
    await this.supabase.client.from('project_technologies').delete().eq('project_id', id);
    const { error } = await this.supabase.client.from('projects').delete().eq('id', id);
    return { error: error?.message ?? null };
  }

  async saveTechnology(tech: Partial<Technology>): Promise<{ error: string | null }> {
    if (tech.id) {
      const { error } = await this.supabase.client
        .from('technologies')
        .update(tech)
        .eq('id', tech.id);
      return { error: error?.message ?? null };
    } else {
      const { error } = await this.supabase.client.from('technologies').insert(tech);
      return { error: error?.message ?? null };
    }
  }

  async deleteTechnology(id: string): Promise<{ error: string | null }> {
    await this.supabase.client.from('project_technologies').delete().eq('technology_id', id);
    const { error } = await this.supabase.client.from('technologies').delete().eq('id', id);
    return { error: error?.message ?? null };
  }

  async setProjectTechnologies(
    projectId: string,
    technologyIds: string[]
  ): Promise<{ error: string | null }> {
    await this.supabase.client.from('project_technologies').delete().eq('project_id', projectId);
    if (technologyIds.length === 0) return { error: null };

    const rows = technologyIds.map((tid) => ({ project_id: projectId, technology_id: tid }));
    const { error } = await this.supabase.client.from('project_technologies').insert(rows);
    return { error: error?.message ?? null };
  }

  async saveProfile(profile: Partial<ProfileInfo>): Promise<{ error: string | null }> {
    const payload = { ...profile, updated_at: new Date().toISOString() };
    const { error } = await this.supabase.client
      .from('profiles')
      .upsert(payload, { onConflict: 'id' });
    return { error: error?.message ?? null };
  }

  async getAllProjects(): Promise<Project[]> {
    const { data } = await this.supabase.client
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
    return (data as Project[]) ?? [];
  }
}
