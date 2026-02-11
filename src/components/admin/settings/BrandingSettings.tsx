/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Loader2, Check, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

interface BrandingData {
  siteName: string
  logo: string | null
  logoWhite: string | null
  favicon: string | null
  favicon16: string | null
  favicon32: string | null
  favicon192: string | null
  favicon512: string | null
  appleIcon: string | null
  ogImage: string | null
  primaryColor: string
  accentColor: string
}

const defaultBranding: BrandingData = {
  siteName: '',
  logo: null,
  logoWhite: null,
  favicon: null,
  favicon16: null,
  favicon32: null,
  favicon192: null,
  favicon512: null,
  appleIcon: null,
  ogImage: null,
  primaryColor: '#233C6F',
  accentColor: '#EF5E33',
}

export default function BrandingSettings() {
  const [branding, setBranding] = useState<BrandingData>(defaultBranding)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  
  // Using imported supabase client

  useEffect(() => {
    loadBranding()
  }, [])

  async function loadBranding() {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'branding')
        .single()

      if (data?.value) {
        setBranding({ ...defaultBranding, ...data.value })
      }
    } catch (_error) {
      console.error('Error loading branding:', _error)
    } finally {
      setLoading(false)
    }
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof BrandingData,
    generateFavicons = false
  ) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(field)

    try {
      // Upload to Supabase Storage
      const fileName = `${field}-${Date.now()}.${file.name.split('.').pop()}`
      const { error: uploadError } = await supabase.storage
        .from('branding')
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('branding')
        .getPublicUrl(fileName)

      // Update branding state
      const updates: Partial<BrandingData> = { [field]: publicUrl }

      // If uploading favicon source, generate all sizes
      if (generateFavicons && field === 'favicon512') {
        const sizes = await generateFaviconSizes(file)
        Object.assign(updates, sizes)
      }

      setBranding(prev => ({ ...prev, ...updates }))
      toast.success('Image uploaded successfully')
    } catch (_error) {
      console.error('Upload error:', _error)
      toast.error('Failed to upload image')
    } finally {
      setUploading(null)
    }
  }

  async function generateFaviconSizes(file: File): Promise<Partial<BrandingData>> {
    const sizes = [
      { key: 'favicon16', size: 16 },
      { key: 'favicon32', size: 32 },
      { key: 'favicon192', size: 192 },
      { key: 'appleIcon', size: 180 },
    ]

    const results: Partial<BrandingData> = {}

    for (const { key, size } of sizes) {
      try {
        const resizedBlob = await resizeImage(file, size, size)
        const fileName = `${key}-${Date.now()}.png`
        
        const { error: storageError } = await supabase.storage
          .from('branding')
          .upload(fileName, resizedBlob, { upsert: true })

        if (!storageError) {
          const { data: { publicUrl } } = supabase.storage
            .from('branding')
            .getPublicUrl(fileName)
          results[key as keyof BrandingData] = publicUrl
        }
      } catch (err) {
        console.error(`Failed to generate ${key}:`, err)
      }
    }

    // Generate .ico file
    try {
      const icoBlob = await resizeImage(file, 32, 32)
      const { error: storageError } = await supabase.storage
        .from('branding')
        .upload(`favicon-${Date.now()}.ico`, icoBlob, { upsert: true })
      
      if (!storageError) {
        const { data: { publicUrl } } = supabase.storage
          .from('branding')
          .getPublicUrl(`favicon-${Date.now()}.ico`)
        results.favicon = publicUrl
      }
    } catch (err) {
      console.error('Failed to generate favicon.ico:', err)
    }

    return results
  }

  async function resizeImage(file: File, width: number, height: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(blob => {
          if (blob) resolve(blob)
          else reject(new Error('Failed to create blob'))
        }, 'image/png')
      }
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  async function saveBranding() {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'branding',
          value: branding,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'key' })

      if (error) throw error
      toast.success('Branding settings saved!')
    } catch (_error) {
      console.error('Save error:', _error)
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
      <Card>
        <CardHeader>
          <CardTitle>Brand Identity</CardTitle>
          <CardDescription>
            Upload your logo and set brand colors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Site Name</Label>
            <Input
              value={branding.siteName}
              onChange={e => setBranding(prev => ({ ...prev, siteName: e.target.value }))}
              placeholder="Your Site Name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Logo (Dark backgrounds)</Label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
                {branding.logo ? (
                  <img src={branding.logo} alt="Logo" className="h-16 mx-auto" />
                ) : (
                  <ImageIcon className="h-16 w-16 mx-auto text-gray-400" />
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={e => handleImageUpload(e, 'logo')}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload">
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <span>
                      {uploading === 'logo' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                      Upload Logo
                    </span>
                  </Button>
                </label>
              </div>
            </div>

            <div>
              <Label>Logo White (Light backgrounds)</Label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center bg-gray-800">
                {branding.logoWhite ? (
                  <img src={branding.logoWhite} alt="Logo White" className="h-16 mx-auto" />
                ) : (
                  <ImageIcon className="h-16 w-16 mx-auto text-gray-500" />
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={e => handleImageUpload(e, 'logoWhite')}
                  className="hidden"
                  id="logo-white-upload"
                />
                <label htmlFor="logo-white-upload">
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <span>
                      {uploading === 'logoWhite' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                      Upload White Logo
                    </span>
                  </Button>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Primary Color</Label>
              <div className="flex gap-2 mt-2">
                <input
                  type="color"
                  value={branding.primaryColor}
                  onChange={e => setBranding(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <Input
                  value={branding.primaryColor}
                  onChange={e => setBranding(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label>Accent Color</Label>
              <div className="flex gap-2 mt-2">
                <input
                  type="color"
                  value={branding.accentColor}
                  onChange={e => setBranding(prev => ({ ...prev, accentColor: e.target.value }))}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <Input
                  value={branding.accentColor}
                  onChange={e => setBranding(prev => ({ ...prev, accentColor: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Favicon & App Icons</CardTitle>
          <CardDescription>
            Upload a square image (512x512 minimum) to auto-generate all favicon sizes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Favicon Source (512x512 PNG)</Label>
            <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center">
              {branding.favicon512 ? (
                <img src={branding.favicon512} alt="Favicon" className="h-32 w-32 mx-auto rounded" />
              ) : (
                <ImageIcon className="h-32 w-32 mx-auto text-gray-400" />
              )}
              <input
                type="file"
                accept="image/png"
                onChange={e => handleImageUpload(e, 'favicon512', true)}
                className="hidden"
                id="favicon-upload"
              />
              <label htmlFor="favicon-upload">
                <Button variant="outline" className="mt-4" asChild>
                  <span>
                    {uploading === 'favicon512' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                    Upload Favicon (auto-generates all sizes)
                  </span>
                </Button>
              </label>
            </div>
          </div>

          {branding.favicon && (
            <div>
              <Label>Generated Favicons Preview</Label>
              <div className="flex items-end gap-4 mt-2 p-4 bg-gray-100 rounded-lg">
                {branding.favicon16 && (
                  <div className="text-center">
                    <img src={branding.favicon16} alt="16x16" className="h-4 w-4 mx-auto" />
                    <span className="text-xs text-gray-500">16px</span>
                  </div>
                )}
                {branding.favicon32 && (
                  <div className="text-center">
                    <img src={branding.favicon32} alt="32x32" className="h-8 w-8 mx-auto" />
                    <span className="text-xs text-gray-500">32px</span>
                  </div>
                )}
                {branding.appleIcon && (
                  <div className="text-center">
                    <img src={branding.appleIcon} alt="180x180" className="h-12 w-12 mx-auto rounded" />
                    <span className="text-xs text-gray-500">Apple</span>
                  </div>
                )}
                {branding.favicon192 && (
                  <div className="text-center">
                    <img src={branding.favicon192} alt="192x192" className="h-16 w-16 mx-auto rounded" />
                    <span className="text-xs text-gray-500">Android</span>
                  </div>
                )}
                <Check className="h-5 w-5 text-green-500 ml-auto" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Sharing</CardTitle>
          <CardDescription>
            Image shown when your site is shared on social media (1200x630 recommended)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            {branding.ogImage ? (
              <img src={branding.ogImage} alt="OG Image" className="max-h-40 mx-auto rounded" />
            ) : (
              <div className="h-32 flex items-center justify-center text-gray-400">
                <ImageIcon className="h-16 w-16" />
              </div>
            )}
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={e => handleImageUpload(e, 'ogImage')}
              className="hidden"
              id="og-upload"
            />
            <label htmlFor="og-upload">
              <Button variant="outline" className="mt-2" asChild>
                <span>
                  {uploading === 'ogImage' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                  Upload Social Image
                </span>
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveBranding} disabled={saving} size="lg">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
          Save Branding Settings
        </Button>
      </div>
    </div>
  )
}
