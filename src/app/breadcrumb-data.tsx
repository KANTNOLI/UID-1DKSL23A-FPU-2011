import { generateBreadcrumbs } from '../lib/breadcrumbs';

export function BreadcrumbData({ pathname }: { pathname: string }) {
  const breadcrumbData = generateBreadcrumbs(pathname);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  )
}