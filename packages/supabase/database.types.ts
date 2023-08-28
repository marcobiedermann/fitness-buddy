export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      following: {
        Row: {
          created_at: string;
          followed_id: string;
          following_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          followed_id: string;
          following_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          followed_id?: string;
          following_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'following_followed_id_fkey';
            columns: ['followed_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'following_following_id_fkey';
            columns: ['following_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          gender: string | null;
          id: string;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          gender?: string | null;
          id: string;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          gender?: string | null;
          id?: string;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
