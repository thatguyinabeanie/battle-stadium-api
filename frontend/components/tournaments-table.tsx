"use client";

import { Table, TableHeader, TableColumn, TableBody, TableCell, TableRow } from "@nextui-org/react";
import * as React from "react";

import { renderCell, TableProps } from "./tournament-table/helpers";

const TournamentsTable = ({ columns, data }: TableProps) => {
  return (
    <Table isHeaderSticky isStriped isVirtualized aria-label="list of tournaments" shadow="md">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={data}>
        {(row) => (
          <TableRow key={JSON.stringify(row)}>
            {(columnKey) => <TableCell>{renderCell({ row, columnKey })}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TournamentsTable;
