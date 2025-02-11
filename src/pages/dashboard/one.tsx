import { CONFIG } from 'src/global-config';
import { PageContent } from 'src/layouts/dashboard';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page one | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <PageContent pageTitle={metadata.title}>
      <BlankView title="Page one" />
    </PageContent>
  );
}
