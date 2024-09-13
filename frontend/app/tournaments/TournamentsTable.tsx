"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Link } from "@nextui-org/react";
import * as React from "react";

import { components } from "@/lib/battle-stadium-api";

export interface TournamentsTableProps {
  tournaments?: components["schemas"]["Tournament"][];
  disableColumns?: string[];
  RenderCell: typeof getKeyValue;
}

const columns = [
  {
    key: "start_at",
    label: "DATE",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "organization.name",
    label: "ORGANIZATION",
  },
  {
    key: "players",
    label: "PLAYERS",
  },
  {
    key: "registration",
    label: "REGISTRATION",
  },
];


const TournamentsTable = ({ tournaments, disableColumns, RenderCell }: TournamentsTableProps) => {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // or a loading spinner
  }

  return (
    <Table isStriped aria-label="list of tournaments">
      <TableHeader columns={columns.filter((c) => !disableColumns?.includes(c.key))}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={tournaments}>
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell> <RenderCell row={item} columnKey={columnKey}/></TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TournamentsTable;
