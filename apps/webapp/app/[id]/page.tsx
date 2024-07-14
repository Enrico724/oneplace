import { AppBreadcrumb } from "./components/breadcrumb";
import { ContentSidebar } from "./components/contentSidebar";
import { ContentTable } from "./components/contentTable";
import AppNavbar from "./components/navbar";
import AppSidebar from "./components/sidebar";
import { Toolbar } from "./components/toolbar";

export default function ContentPage() {
  return (
    <main className=" h-screen">
      <AppNavbar />
    <div className="flex">    
      <div className="flex-none w-64">
        <AppSidebar />
      </div>
      <div className="grow p-3">
        <Toolbar />
        <AppBreadcrumb />
        <ContentTable />
      </div>
      <div className="flex-none w-64">
        <ContentSidebar />
      </div>
    </div>
    </main>
  );
}
