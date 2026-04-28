export default function StatusBadge({ status }) {
  const labels = { PENDING: 'Pending', VERIFIED: 'Verified', REJECTED: 'Rejected', IN_PROGRESS: 'In Progress', RESOLVED: 'Resolved' };
  return <span className={`badge badge-${status?.toLowerCase()}`}>{labels[status] || status}</span>;
}
