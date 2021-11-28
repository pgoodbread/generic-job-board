import FeedbackWidget from "./FeedbackWidget";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <FeedbackWidget></FeedbackWidget>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
