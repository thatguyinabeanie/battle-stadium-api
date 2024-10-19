"use client";

import { Modal } from "@/components/nextui-use-client";
import TournamentRegistration from "@/components/tournament-registration";

interface RegistrationProps {
  params: {
    org_slug: string;
    tournament_id: number;
  };
}

export default function Registration({ params }: Readonly<RegistrationProps>) {
  return (
    <Modal title="Register for tournament">
      <TournamentRegistration {...params} />
    </Modal>
  );
}
