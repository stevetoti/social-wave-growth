import BrandingSettings from '@/components/admin/settings/BrandingSettings'

export default function BrandingPage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Branding Settings</h1>
        <p className="text-gray-600 mt-2">
          Customize your site&apos;s logo, favicon, and brand colors
        </p>
      </div>
      <BrandingSettings />
    </div>
  )
}
