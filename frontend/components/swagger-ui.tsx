"use client";
import SwaggerUI from 'swagger-ui-react'
import { Card, CardBody } from "@/components/nextui-use-client";

interface SwaggerUIProps {
  jsonSpec: string;
}

export default function SwaggerUi ({ jsonSpec }: Readonly<SwaggerUIProps>) {
  return (
    <Card className="bg-transparent h-90 w-90 rounded-3xl backdrop-blur-md" shadow="md">
      <CardBody className="flex flex-row justify-between rounded-3xl p-10 ">
        <SwaggerUI spec={ jsonSpec } displayOperationId={ true } />
      </CardBody>
    </Card>
  )
}
