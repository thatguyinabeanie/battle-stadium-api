import { Card, CardBody, CardHeader } from "@/components/nextui-use-client";

interface MetagameProps {
  params: {
    org_slug: string;
    tournament_id: number;
  };
}

export default function Metagame({ params }: Readonly<MetagameProps>) {
  const { org_slug, tournament_id } = params;

  return (
    <Card>
      <CardHeader>
        Metagame for Organization {org_slug} Tournament {tournament_id}
      </CardHeader>
      <CardBody>
        <p>Metagame content</p>
      </CardBody>
    </Card>
  );
}
