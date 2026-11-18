export default function Page() {
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '50px' }}>
      <h1>Taytay Citizen Portal</h1>
      <p>Official gateway for Taytay residents.</p>
      <a href="/report" style={{ display: 'block', marginTop: '20px', padding: '15px', background: 'blue', color: 'white', borderRadius: '10px' }}>
        Report a Problem
      </a>
    </div>
  )
}
