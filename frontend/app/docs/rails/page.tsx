import SwaggerUI from "swagger-ui-react";

import "swagger-ui-react/swagger-ui.css";
import { getAccountMe } from "@/app/server-actions/accounts/actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { Card, CardBody } from "@/components/nextui-use-client";

export default async function OpenApiDocs() {
  const { sessionId } = auth();

  if (!sessionId) {
    return redirect("/");
  }

  const me = (await getAccountMe())?.data;

  if (!me?.admin) {
    return redirect("/"); // Redirect to home page if account is not an admin)
  }

  // const jsonSpec = yaml.load(await fetchOpenApiYaml());
  const jsonSpec = '{"openapi": "3.0.1"}';

  return (
    <Card
      className="bg-transparent h-90 w-90 rounded-3xl
    backdrop-blur"
      shadow="md"
    >
      <CardBody className="flex flex-row justify-between rounded-3xl p-10 ">
        <SwaggerUI displayOperationId={true} spec={jsonSpec} />
      </CardBody>
    </Card>
  );
}
