"use client";

import { useState } from "react";
import { Shield, Mail, Lock, Palette, MessageSquare, Settings as SettingsIcon, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { LiveDataNotice } from "@/components/admin/live-data-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import type { SiteSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ManageSettingsProps {
  initialSettings: SiteSettings;
  live: boolean;
}

type TabType = 'general' | 'maintenance' | 'security' | 'content';

export function ManageSettings({ initialSettings, live }: ManageSettingsProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [showPassword, setShowPassword] = useState(false);

  const saveSettings = async () => {
    setIsSaving(true);
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert(settings, { onConflict: "id" });

    setIsSaving(false);

    if (error) {
      toast.error("Unable to save settings", {
        description: error.message,
      });
      return;
    }

    toast.success("Settings updated");
  };

  const tabs = [
    {
      id: 'general' as TabType,
      label: 'General',
      icon: SettingsIcon,
      description: 'Basic site settings'
    },
    {
      id: 'maintenance' as TabType,
      label: 'Maintenance',
      icon: Eye,
      description: 'Site maintenance control'
    },
    {
      id: 'security' as TabType,
      label: 'Security',
      icon: Shield,
      description: 'Email and password'
    },
    {
      id: 'content' as TabType,
      label: 'Content',
      icon: Palette,
      description: 'Hero and labels'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <Label className="font-semibold text-sm text-slate-700">WhatsApp Number</Label>
                <Input
                  className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                  value={settings.whatsapp_number}
                  onChange={(event) =>
                    setSettings((current) => ({ ...current, whatsapp_number: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-3">
                <Label className="font-semibold text-sm text-slate-700">Facebook URL</Label>
                <Input
                  className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                  value={settings.facebook_url}
                  onChange={(event) =>
                    setSettings((current) => ({ ...current, facebook_url: event.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <Label className="font-semibold text-sm text-slate-700">Contact Phone</Label>
                <Input
                  className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                  value={settings.contact_phone}
                  onChange={(event) =>
                    setSettings((current) => ({ ...current, contact_phone: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-3">
                <Label className="font-semibold text-sm text-slate-700">Contact Email</Label>
                <Input
                  type="email"
                  className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                  value={settings.contact_email}
                  onChange={(event) =>
                    setSettings((current) => ({ ...current, contact_email: event.target.value }))
                  }
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="font-semibold text-sm text-slate-700">Contact Address</Label>
              <Textarea
                className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                value={settings.contact_address}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, contact_address: event.target.value }))
                }
              />
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 p-6">
              <div>
                <h3 className="font-display text-lg font-bold text-blue-900">Maintenance Mode</h3>
                <p className="text-sm text-blue-700 mt-1">Control website visibility and access</p>
              </div>
              <Switch
                checked={settings.website_paused}
                onCheckedChange={(checked) =>
                  setSettings((current) => ({ ...current, website_paused: checked }))
                }
              />
            </div>

            <div className="space-y-3">
              <Label className="font-semibold text-sm text-slate-700">Maintenance Message</Label>
              <Textarea
                className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                placeholder="Enter reason for maintenance..."
                value={settings.pause_reason ?? ""}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, pause_reason: event.target.value }))
                }
              />
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <Label className="font-semibold text-sm text-slate-700">Admin Email</Label>
                <Input
                  type="email"
                  className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                  value={settings.contact_email}
                  onChange={(event) =>
                    setSettings((current) => ({ ...current, contact_email: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-3">
                <Label className="font-semibold text-sm text-slate-700">Admin Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="Enter new password..."
                    value={settings.admin_password ?? ""}
                    onChange={(event) =>
                      setSettings((current) => ({ ...current, admin_password: event.target.value }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-sm text-blue-900 mb-2">Security Tips</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <Lock className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Use strong, unique passwords with minimum 8 characters</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Keep admin email secure and up-to-date</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6">
            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold text-slate-900">Hero Content</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <Label className="font-semibold text-sm text-slate-700">Hero Title</Label>
                  <Input
                    className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                    value={settings.hero_title}
                    onChange={(event) =>
                      setSettings((current) => ({ ...current, hero_title: event.target.value }))
                    }
                  />
                </div>
                <div className="space-y-3">
                  <Label className="font-semibold text-sm text-slate-700">Hero Subtitle</Label>
                  <Input
                    className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                    value={settings.hero_subtitle}
                    onChange={(event) =>
                      setSettings((current) => ({ ...current, hero_subtitle: event.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="font-semibold text-sm text-slate-700">Hero Description</Label>
                <Textarea
                  className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                  value={settings.hero_description}
                  onChange={(event) =>
                    setSettings((current) => ({ ...current, hero_description: event.target.value }))
                  }
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold text-slate-900">Result Labels</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <Label className="font-semibold text-sm text-slate-700">Pass Rate Label</Label>
                  <Input
                    className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                    value={settings.pass_rate_label}
                    onChange={(event) =>
                      setSettings((current) => ({ ...current, pass_rate_label: event.target.value }))
                    }
                  />
                </div>
                <div className="space-y-3">
                  <Label className="font-semibold text-sm text-slate-700">A/B Results Label</Label>
                  <Input
                    className="rounded-xl border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500"
                    value={settings.ab_rate_label}
                    onChange={(event) =>
                      setSettings((current) => ({ ...current, ab_rate_label: event.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <LiveDataNotice live={live} />

      <div className="rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-sm p-6 shadow-lg">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <tab.icon className="size-4" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {renderTabContent()}
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-8 border-t border-slate-200">
          <Button
            onClick={saveSettings}
            disabled={isSaving}
            className="px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-transparent border-r-transparent animate-spin rounded-full" />
                <span>Saving...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <SettingsIcon className="size-4" />
                <span>Save Changes</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
