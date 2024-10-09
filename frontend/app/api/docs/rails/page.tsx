import yaml from 'js-yaml';
import 'swagger-ui-react/swagger-ui.css'
import { getMe } from '@/app/data/actions';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import SwaggerUI from '@/components/swagger-ui';
import { getBaseUrl } from '@/lib/api';

async function fetchOpenApiYaml() {
  const response = await fetch(`${getBaseUrl()}/api-docs/v1/openapi.yaml`);
  return response.text();
}

export default async function OpenApiDocs() {
  const {sessionId} = auth();

  if (!sessionId) {
    return redirect('/');
  }

  const me = (await getMe())?.data;
  if (!me?.admin) {
    return redirect('/'); // Redirect to home page if user is not an admin)
  }

  const jsonObject = yaml.load(await fetchOpenApiYaml());

  return (
    <SwaggerUI jsonSpec={jsonObject as string} />
  )
}
