import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../components/features/Layout";
import AdminLayout from "../components/features/AdminLayout";
import AppProvider from "../providers/AppProvider";
import { Loader } from "../components/ui";
import { useAtuh } from "../providers/contexts/Auth.use";

const Home = lazy(() => import("./Home"));
const AuthHome = lazy(() => import("./auth/AuthHome"));
const Test = lazy(() => import("./auth/Test"));
const AdminHome = lazy(() => import("./admin/AdminHome"));

const StudentHome = lazy(() => import("./admin/students/StudentHome"));
const StudentNew = lazy(() => import("./admin/students/StudentNew"));
const StudentDetail = lazy(() => import("./admin/students/StudentDetail"));

const SchoolHome = lazy(() => import("./admin/schools/SchoolHome"));
const SchoolNew = lazy(() => import("./admin/schools/SchoolNew"));
const SchoolDetail = lazy(() => import("./admin/schools/SchoolDetail"));

const LessonHome = lazy(() => import("./admin/lessons/LessonHome"));
const LessonNew = lazy(() => import("./admin/lessons/LessonNew"));
const LessonDetail = lazy(() => import("./admin/lessons/LessonDetail"));

const ParentHome = lazy(() => import("./admin/parents/ParentHome"));
const ParentNew = lazy(() => import("./admin/parents/ParerntNew"));
const ParentDetail = lazy(() => import("./admin/parents/ParentDetail"));

export default function AppRouter() {
  return (
    <AppProvider>
      <Suspense fallback={<Loader />}>
        <Routers />
      </Suspense>
    </AppProvider>
  );
}

function Routers() {
  const auth = useAtuh();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={auth.user} />}>
          <Route index Component={Home} />
          <Route path="auth">
            <Route index Component={AuthHome} />
            <Route path=":id" Component={Test} />
          </Route>
          {auth.user && (
            <Route path="admin" Component={AdminLayout}>
              <Route index Component={AdminHome} />
              <Route path="students">
                <Route index Component={StudentHome} />
                <Route Component={StudentNew} path="new" />
                <Route path=":student_id" Component={StudentDetail} />
              </Route>
              <Route path="schools">
                <Route index element={<SchoolHome {...auth} />} />
                <Route path="new" element={<SchoolNew />} />
                <Route path=":school_id" element={<SchoolDetail />} />
              </Route>
              <Route path="lessons">
                <Route index element={<LessonHome {...auth} />} />
                <Route path="new" element={<LessonNew />} />
                <Route path=":lesson_id" element={<LessonDetail />} />
              </Route>

              <Route path="parents">
                <Route index element={<ParentHome {...auth} />} />
                <Route path="new" element={<ParentNew />} />
                <Route path=":parent_id" element={<ParentDetail />} />
              </Route>
            </Route>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
