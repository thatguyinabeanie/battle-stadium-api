import { Card, CardBody, CardHeader } from "@/components/nextui-use-client";

interface MatchPageProps {
  params: {
    org_slug: string;
    tournament_id: number;
  };
}
export default async function MatchPage(props: Readonly<MatchPageProps>) {
  const params = await props.params;
  const { org_slug, tournament_id } = params;

  return (
    <Card>
      <CardHeader>
        Matches for {org_slug} Tournament {tournament_id}{" "}
      </CardHeader>
      <CardBody>
        <p>Matches content</p>
      </CardBody>
    </Card>
  );
}
