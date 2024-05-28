import { PropsWithChildren } from "react";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import styles from './Layout.module.scss';
import MainProvider from "@/components/layout/MainProvider";
import { Toaster } from "react-hot-toast";

export default function LayoutClient({ children }: PropsWithChildren<unknown>) {
  return (
    <MainProvider>
      <main className={styles.layout}>
        <Sidebar/>
        <section>{children}</section>
        <Toaster position='top-right'/>
      </main>
    </MainProvider>
  );
}
