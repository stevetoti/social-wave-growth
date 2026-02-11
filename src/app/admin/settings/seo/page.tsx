import SEOSettings from '@/components/admin/settings/SEOSettings'

export default function SEOPage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">SEO & Analytics Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure meta tags, social sharing, and tracking codes
        </p>
      </div>
      <SEOSettings />
    </div>
  )
}
