export function generateBreadcrumbs(pathname: string) {
  const baseUrl = "https://chazen.de";

  const breadcrumbMap: { [key: string]: string } = {
    "/": "Home",
    "/product": "Products",
    "/vacancy": "Careers",
    "/contacts": "Contact Us",
    "/track": "Order Tracking",
    "/admin": "Admin",
  };

  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
  ];

  if (pathname === "/") {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    };
  }

  if (breadcrumbMap[pathname]) {
    breadcrumbs.push({
      "@type": "ListItem",
      position: 2,
      name: breadcrumbMap[pathname],
      item: `${baseUrl}${pathname}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  };
}
