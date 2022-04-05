import { Header, Footer } from ".";
import styles from "../../styles/Home.module.css";
import { UploadModal, Table } from "..";

export default function App() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <UploadModal />
      </main>

      <Footer />
    </div>
  );
}
