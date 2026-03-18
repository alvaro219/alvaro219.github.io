import { Injectable, signal, computed } from '@angular/core';
import { SupabaseService } from './supabase.service';
import type { User } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isAdmin = signal(false);
  private ready = signal(false);

  user = computed(() => this.currentUser());
  admin = computed(() => this.isAdmin());
  loggedIn = computed(() => !!this.currentUser());
  initialized = computed(() => this.ready());

  constructor(private supabase: SupabaseService) {
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.currentUser.set(session?.user ?? null);
      if (session?.user) {
        this.checkAdminRole(session.user.id).then(() => this.ready.set(true));
      } else {
        this.isAdmin.set(false);
        this.ready.set(true);
      }
    });
  }

  private async checkAdminRole(userId: string): Promise<void> {
    const { data, error } = await this.supabase.client
      .from('user_profiles')
      .select('role')
      .eq('id', userId)
      .single();
    if (error) {
      console.warn('Could not fetch user role:', error.message);
      this.isAdmin.set(false);
    } else {
      this.isAdmin.set(data?.role === 'admin');
    }
  }

  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error: error.message };
    }
    if (data.user) {
      await this.checkAdminRole(data.user.id);
    }
    return { error: null };
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
    this.currentUser.set(null);
    this.isAdmin.set(false);
  }
}
