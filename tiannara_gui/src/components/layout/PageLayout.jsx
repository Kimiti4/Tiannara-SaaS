import Sidebar from "./Sidebar";
import Header from "./Header";

export default function PageLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-slate-950 grid grid-cols-[260px_1fr]">
      <Sidebar />
      <main className="flex flex-col">
        <Header title={title} />
        <section className="p-6 flex-1 overflow-auto">
          {children}
        </section>
      </main>
    </div>
  );
}
