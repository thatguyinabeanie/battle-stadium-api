import { Card, CardBody, CardHeader } from "~/components/nextui/client-components";

interface MetagameProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
  }>;
}

export default async function Metagame(props: Readonly<MetagameProps>) {
  const params = await props.params;
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
