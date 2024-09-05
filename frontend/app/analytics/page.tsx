export default async function Dashboard() {
  try {
    return (
      <div>
        <h1>Analytics</h1>
      </div>
    );
  } catch (error) {
    return <div>Something went wrong</div>;
  }
}
