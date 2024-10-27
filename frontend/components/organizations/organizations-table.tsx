import { getOrganizations } from "@/app/server-actions/organizations/actions";
import { Organization } from "@/lib/api";

export async function OrganizationsTable() {
  const { partners, nonpartners } = await getOrganizations();

  return (
    <div className="flex flex-col items-center h-50 overflow-y-visible">
      <table className="w-fit divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {partners.map(organizationTableRow)}
          {nonpartners.map(organizationTableRow)}
        </tbody>
      </table>
    </div>
  );
}

function organizationTableRow(organization: Organization) {
  return (
    <tr key={organization.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{organization.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{organization.description}</td>
    </tr>
  );
}
