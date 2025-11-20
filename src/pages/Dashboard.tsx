import React from "react";
import "./Dashboard.css";
import { Button } from "../components/Button/Button";
import { Tag } from "../components/Tag/Tag";
import { TextField } from "../components/TextField/TextField";
import { Autocomplete, Option } from "../components/Autocomplete/Autocomplete";

const statusOptions: Option[] = [
  { value: "all", label: "All statuses" },
  { value: "new", label: "New" },
  { value: "in-process", label: "In process" },
  { value: "interview", label: "Interviewing" },
  { value: "offer", label: "Offer" },
];

const mockRows = [
  {
    name: "Mare Sheehan",
    role: "Frontend Engineer",
    stage: "Phone screen",
    status: "In process",
    tags: ["React", "TypeScript"],
    updated: "Today",
  },
  {
    name: "Eva Garvey",
    role: "Engineer Who Can Design",
    stage: "Onsite",
    status: "Interviewing",
    tags: ["Design systems"],
    updated: "Yesterday",
  },
  {
    name: "Peggy Olsen",
    role: "Product Designer",
    stage: "Portfolio review",
    status: "New",
    tags: ["Figma", "Prototyping"],
    updated: "2 days ago",
  },
  {
    name: "Rebecca Welton",
    role: "Full Stack Engineer",
    stage: "Offer extended",
    status: "Offer",
    tags: ["Node.js", "Postgres"],
    updated: "3 days ago",
  },
];

export const Dashboard: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<Option | null>(
    statusOptions[0]
  );

  const filteredRows = mockRows.filter((row) => {
    const matchesSearch =
      !search ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      !statusFilter ||
      statusFilter.value === "all" ||
      row.status.toLowerCase().includes(statusFilter.label.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dash-root">
      <header className="dash-header">
        <div>
          <h1>Candidates dashboard</h1>
        </div>
        <Button>New job posting</Button>
      </header>

      <section className="dash-kpiRow">
        <article className="dash-kpiCard">
          <h2>Open roles</h2>
          <p className="dash-kpiValue">8</p>
          <p className="dash-kpiMeta">3 closing this month</p>
        </article>

        <article className="dash-kpiCard">
          <h2>Active candidates</h2>
          <p className="dash-kpiValue">24</p>
          <p className="dash-kpiMeta">+6 in the last 7 days</p>
        </article>

        <article className="dash-kpiCard">
          <h2>Interviews this week</h2>
          <p className="dash-kpiValue">12</p>
          <p className="dash-kpiMeta">4 onsite, 8 virtual</p>
        </article>

        <article className="dash-kpiCard">
          <h2>Offers</h2>
          <p className="dash-kpiValue">3</p>
          <p className="dash-kpiMeta">2 awaiting response</p>
        </article>
      </section>

      <section className="dash-panel">
        <div className="dash-panelHeader">
          <div>
            <h2>Candidates</h2>
            <p>Filter by name, role, or status.</p>
          </div>
          <div className="dash-filters">
            <div className="dash-filterSearch">
              <TextField
                label="Search"
                placeholder="Search by name or role"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="dash-filterStatus">
              <Autocomplete
                label="Status"
                placeholder="Filter by status"
                options={statusOptions}
                helperText="Choose a pipeline status."
                onChange={(opt) => setStatusFilter(opt)}
              />
            </div>
          </div>
        </div>

        <div className="dash-tableWrapper">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Role</th>
                <th>Stage</th>
                <th>Status</th>
                <th>Tags</th>
                <th>Last updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.role}</td>
                  <td>{row.stage}</td>
                  <td>
                    <Tag tone="accent">{row.status}</Tag>
                  </td>
                  <td className="dash-tagCell">
                    {row.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </td>
                  <td>{row.updated}</td>
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={6} className="dash-empty">
                    No candidates match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
