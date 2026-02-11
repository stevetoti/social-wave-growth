'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Check, Search, Globe, Share2 } from 'lucide-react'
import { toast } from 'sonner'

interface SEOData {
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  canonicalUrl: string
  robotsIndex: boolean
  robotsFollow: boolean
  googleVerification: string
  bingVerification: string
}

interface SocialData {
  ogImage: string | null
  ogTitle: string
  ogDescription: string
  twitterCard: string
  twitterSite: string
  facebookAppId: string
}

interface AnalyticsData {
  googleAnalyticsId: string
  googleTagManagerId: string
  facebookPixelId: string
  customHeadScripts: string
  customBodyScripts: string
}

const defaultSEO: SEOData = {
  metaTitle: '',
  metaDescription: '',
  metaKeywords: [],
  canonicalUrl: '',
  robotsIndex: true,
  robotsFollow: true,
  googleVerification: '',
  bingVerification: '',
}

const defaultSocial: SocialData = {
  ogImage: null,
  ogTitle: '',
  ogDescription: '',
  twitterCard: 'summary_large_image',
  twitterSite: '',
  facebookAppId: '',
}

const defaultAnalytics: AnalyticsData = {
  googleAnalyticsId: '',
  googleTagManagerId: '',
  facebookPixelId: '',
  customHeadScripts: '',
  customBodyScripts: '',
}

export default function SEOSettings() {
  const [seo, setSEO] = useState<SEOData>(defaultSEO)
  const [social, setSocial] = useState<SocialData>(defaultSocial)
  const [analytics, setAnalytics] = useState<AnalyticsData>(defaultAnalytics)
  const [keywordsInput, setKeywordsInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // Using imported supabase client

  useEffect(() => {
    loadSettings()
  }, [])

  useEffect(() => {
    setKeywordsInput(seo.metaKeywords.join(', '))
  }, [seo.metaKeywords])

  async function loadSettings() {
    try {
      const [seoRes, socialRes, analyticsRes] = await Promise.all([
        supabase.from('site_settings').select('value').eq('key', 'seo').single(),
        supabase.from('site_settings').select('value').eq('key', 'social').single(),
        supabase.from('site_settings').select('value').eq('key', 'analytics').single(),
      ])

      if (seoRes.data?.value) setSEO({ ...defaultSEO, ...seoRes.data.value })
      if (socialRes.data?.value) setSocial({ ...defaultSocial, ...socialRes.data.value })
      if (analyticsRes.data?.value) setAnalytics({ ...defaultAnalytics, ...analyticsRes.data.value })
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  async function saveSettings() {
    setSaving(true)
    try {
      const keywords = keywordsInput.split(',').map(k => k.trim()).filter(Boolean)
      const seoData = { ...seo, metaKeywords: keywords }

      await Promise.all([
        supabase.from('site_settings').upsert({ key: 'seo', value: seoData, updated_at: new Date().toISOString() }, { onConflict: 'key' }),
        supabase.from('site_settings').upsert({ key: 'social', value: social, updated_at: new Date().toISOString() }, { onConflict: 'key' }),
        supabase.from('site_settings').upsert({ key: 'analytics', value: analytics, updated_at: new Date().toISOString() }, { onConflict: 'key' }),
      ])

      toast.success('SEO settings saved!')
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* SEO Meta Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Engine Optimization
          </CardTitle>
          <CardDescription>
            Configure how your site appears in search results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Meta Title</Label>
            <Input
              value={seo.metaTitle}
              onChange={e => setSEO(prev => ({ ...prev, metaTitle: e.target.value }))}
              placeholder="My Website - Tagline"
              maxLength={60}
            />
            <p className="text-xs text-gray-500 mt-1">{seo.metaTitle.length}/60 characters</p>
          </div>

          <div>
            <Label>Meta Description</Label>
            <Textarea
              value={seo.metaDescription}
              onChange={e => setSEO(prev => ({ ...prev, metaDescription: e.target.value }))}
              placeholder="A brief description of your website for search engines..."
              maxLength={160}
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">{seo.metaDescription.length}/160 characters</p>
          </div>

          <div>
            <Label>Keywords</Label>
            <Input
              value={keywordsInput}
              onChange={e => setKeywordsInput(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated keywords</p>
          </div>

          <div>
            <Label>Canonical URL</Label>
            <Input
              value={seo.canonicalUrl}
              onChange={e => setSEO(prev => ({ ...prev, canonicalUrl: e.target.value }))}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center justify-between">
              <Label>Allow Search Indexing</Label>
              <Switch
                checked={seo.robotsIndex}
                onCheckedChange={checked => setSEO(prev => ({ ...prev, robotsIndex: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Allow Link Following</Label>
              <Switch
                checked={seo.robotsFollow}
                onCheckedChange={checked => setSEO(prev => ({ ...prev, robotsFollow: checked }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <Label>Google Verification Code</Label>
              <Input
                value={seo.googleVerification}
                onChange={e => setSEO(prev => ({ ...prev, googleVerification: e.target.value }))}
                placeholder="google-site-verification=..."
              />
            </div>
            <div>
              <Label>Bing Verification Code</Label>
              <Input
                value={seo.bingVerification}
                onChange={e => setSEO(prev => ({ ...prev, bingVerification: e.target.value }))}
                placeholder="msvalidate.01=..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Sharing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Social Sharing
          </CardTitle>
          <CardDescription>
            Configure how your site appears when shared on social media
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Social Share Title (OG Title)</Label>
            <Input
              value={social.ogTitle}
              onChange={e => setSocial(prev => ({ ...prev, ogTitle: e.target.value }))}
              placeholder="Title shown when shared on social media"
            />
          </div>

          <div>
            <Label>Social Share Description (OG Description)</Label>
            <Textarea
              value={social.ogDescription}
              onChange={e => setSocial(prev => ({ ...prev, ogDescription: e.target.value }))}
              placeholder="Description shown when shared on social media"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Twitter Handle</Label>
              <Input
                value={social.twitterSite}
                onChange={e => setSocial(prev => ({ ...prev, twitterSite: e.target.value }))}
                placeholder="@yourhandle"
              />
            </div>
            <div>
              <Label>Facebook App ID</Label>
              <Input
                value={social.facebookAppId}
                onChange={e => setSocial(prev => ({ ...prev, facebookAppId: e.target.value }))}
                placeholder="123456789"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Analytics & Tracking
          </CardTitle>
          <CardDescription>
            Connect analytics and tracking services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Google Analytics 4 ID</Label>
              <Input
                value={analytics.googleAnalyticsId}
                onChange={e => setAnalytics(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            <div>
              <Label>Google Tag Manager ID</Label>
              <Input
                value={analytics.googleTagManagerId}
                onChange={e => setAnalytics(prev => ({ ...prev, googleTagManagerId: e.target.value }))}
                placeholder="GTM-XXXXXXX"
              />
            </div>
          </div>

          <div>
            <Label>Facebook Pixel ID</Label>
            <Input
              value={analytics.facebookPixelId}
              onChange={e => setAnalytics(prev => ({ ...prev, facebookPixelId: e.target.value }))}
              placeholder="123456789"
            />
          </div>

          <div>
            <Label>Custom Head Scripts</Label>
            <Textarea
              value={analytics.customHeadScripts}
              onChange={e => setAnalytics(prev => ({ ...prev, customHeadScripts: e.target.value }))}
              placeholder="<script>...</script>"
              rows={3}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Scripts added to &lt;head&gt;</p>
          </div>

          <div>
            <Label>Custom Body Scripts</Label>
            <Textarea
              value={analytics.customBodyScripts}
              onChange={e => setAnalytics(prev => ({ ...prev, customBodyScripts: e.target.value }))}
              placeholder="<script>...</script>"
              rows={3}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Scripts added before &lt;/body&gt;</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={saving} size="lg">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
          Save SEO Settings
        </Button>
      </div>
    </div>
  )
}
