import yaml from 'js-yaml';
import 'swagger-ui-react/swagger-ui.css'
import { getMe } from '@/app/data/actions';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import { getBaseUrl } from '@/lib/api';
import { Card, CardBody } from '@/components/nextui-use-client';
import SwaggerUI from 'swagger-ui-react';

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

  const jsonSpec = yaml.load(await fetchOpenApiYaml());

  return (
    <Card className="bg-transparent h-90 w-90 rounded-3xl backdrop-blur-md" shadow="md">
      <CardBody className="flex flex-row justify-between rounded-3xl p-10 ">
        <SwaggerUI spec={ jsonSpec  as string} displayOperationId={ true } />
      </CardBody>
    </Card>
  )
}
