import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";

import _config from "../../sanity.config";
import { useEffect, useState } from "react";

export default function StudioPage() {
  const [config, setConfig] = useState(_config);

  useEffect(
    // Start fetching the theme in parallel with the Studio auth loading
    () =>
      // The webpackIgnore tells webpack to not attempt bundling this dynamic import,
      // and instead let it run natively in the browser at runtime
      void import(
        /* webpackIgnore: true */ "https://themer.sanity.build/api/hues?preset=tw-cyan"
      ).then(({ theme }) => setConfig((config) => ({ ...config, theme }))),
    []
  );
  return (
    <>
      <Head>
        <NextStudioHead />
      </Head>
      <NextStudio config={config} />
    </>
  );
}
