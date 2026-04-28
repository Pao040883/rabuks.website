import { routes } from './app.routes';

describe('App route SEO metadata', () => {
  it('should provide title and description for the home route', () => {
    const homeRoute = routes.find((route) => route.path === '');
    const seo = homeRoute?.data?.['seo'] as { title?: string; description?: string } | undefined;

    expect(seo?.title).toBeTruthy();
    expect(seo?.description).toBeTruthy();
  });

  it('should provide title and description for legal routes', () => {
    const legalPaths = ['impressum', 'datenschutz'];

    for (const path of legalPaths) {
      const route = routes.find((candidateRoute) => candidateRoute.path === path);
      const seo = route?.data?.['seo'] as { title?: string; description?: string } | undefined;

      expect(seo?.title).toBeTruthy();
      expect(seo?.description).toBeTruthy();
    }
  });
});
