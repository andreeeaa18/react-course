<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const code = `const isLoggedIn = false; // ← schimbă în true!

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <span style={styles.navBrand}>BlogApp</span>
    </nav>
  );
}

function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarItem}>Acasă</div>
      <div style={styles.sidebarItem}>Articole</div>
      <div style={styles.sidebarItem}>Categorii</div>
    </aside>
  );
}

function ProfileCard() {
  return <div style={styles.profileCard}>Salut, <strong>User</strong>!</div>;
}

function ActivityFeed() {
  return <div style={styles.activityFeed}>Activitate recentă: 3 articole citite</div>;
}

function UserDashboard() {
  return (
    <div style={styles.dashboard}>
      <p style={styles.dashTitle}>UserDashboard</p>
      <ProfileCard />
      <ActivityFeed />
    </div>
  );
}

function EmailInput() {
  return <input style={styles.input} type="email" placeholder="email@exemplu.ro" />;
}

function SubmitButton() {
  return <button style={styles.submitBtn}>Intră în cont</button>;
}

function LoginForm() {
  return (
    <div style={styles.loginForm}>
      <p style={styles.loginTitle}>LoginForm</p>
      <EmailInput />
      <SubmitButton />
    </div>
  );
}

function Layout({ isLoggedIn }) {
  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.main}>
        {isLoggedIn ? <UserDashboard /> : <LoginForm />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={styles.app}>
      <Navbar />
      <Layout isLoggedIn={isLoggedIn} />
    </div>
  );
}


const styles = {
  app: { fontFamily: 'system-ui', padding: 16, minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  navbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0ea5e9', color: 'white', padding: '10px 16px', borderRadius: 10, marginBottom: 12 },
  navBrand: { fontWeight: 700, fontSize: 14 },
  layout: { display: 'flex', gap: 10, flex: 1 },
  sidebar: { width: 90, background: '#f1f5f9', borderRadius: 10, padding: 10, fontSize: 12 },
  sidebarItem: { padding: '6px 0', color: '#475569', borderBottom: '1px solid #e2e8f0' },
  main: { flex: 1 },
  dashboard: { background: '#dcfce7', border: '2px solid #16a34a', borderRadius: 10, padding: 12 },
  dashTitle: { margin: '0 0 8px', fontSize: 13, color: '#166534', fontWeight: 700 },
  profileCard: { background: '#fff', border: '1px solid #bbf7d0', borderRadius: 8, padding: 8, marginBottom: 8, fontSize: 12 },
  activityFeed: { background: '#fff', border: '1px solid #bbf7d0', borderRadius: 8, padding: 8, fontSize: 12 },
  loginForm: { background: '#fef3c7', border: '2px solid #d97706', borderRadius: 10, padding: 12 },
  loginTitle: { margin: '0 0 8px', fontSize: 13, color: '#92400e', fontWeight: 700 },
  input: { width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #fcd34d', marginBottom: 8, fontSize: 12, boxSizing: 'border-box' },
  submitBtn: { width: '100%', background: '#d97706', color: 'white', border: 'none', borderRadius: 6, padding: '7px 0', fontWeight: 700, fontSize: 12, cursor: 'pointer' },
};`
</script>

<template>
  <LiveReact :code="code" :editorHeight="380" :showTabs="false" />
</template>
