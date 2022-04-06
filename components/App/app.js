import { Header, Footer } from ".";
import styles from "../../styles/Home.module.css";
import { UploadModal, Table } from "..";
import { permissions } from "../../constants/perms";

export default function App() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <UploadModal permissions={permissions} />
      </main>

      <Footer />
    </div>
  );
}
