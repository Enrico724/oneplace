import { AppBreadcrumb } from "./components/breadcrumb";
import { ContentSidebar } from "./components/contentSidebar";
import { ContentTable } from "./components/contentTable";
import AppNavbar from "./components/navbar";
import AppSidebar from "./components/sidebar";
import { Toolbar } from "./components/toolbar";

export default function ContentPage() {
    return (
        <main>
            <AppNavbar/>
            <AppSidebar/>
            <ContentSidebar/>
            <div className="p-4 sm:mx-64">
                <Toolbar/>
                <AppBreadcrumb/>
                <ContentTable/>
            </div>
        </main>
    );
}