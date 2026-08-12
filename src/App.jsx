import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import LoginRolePicker from "./pages/LoginRolePicker";
import GuestEmptyState from "./pages/GuestEmptyState";
import MemberMyMembership from "./pages/MemberMyMembership";
import MemberCourseList from "./pages/MemberCourseList";
import MemberMyBookings from "./pages/MemberMyBookings";
import MemberNoShowSuspension from "./pages/MemberNoShowSuspension";
import FrontDeskMembers from "./pages/FrontDeskMembers";
import FrontDeskBooking from "./pages/FrontDeskBooking";
import FrontDeskCheckin from "./pages/FrontDeskCheckin";
import StoreManagerCourses from "./pages/StoreManagerCourses";
import StoreManagerStaff from "./pages/StoreManagerStaff";
import StoreManagerCounter from "./pages/StoreManagerCounter";
import CoachOpenClass from "./pages/CoachOpenClass";
import CoachMyCourses from "./pages/CoachMyCourses";

const DEST_FOR_ROLE = {
  MEMBER: "/member/membership",
  FRONT_DESK: "/front-desk/members",
  STORE_MANAGER: "/store-manager/courses",
  COACH: "/coach/open-class",
  GUEST: "/guest",
};

// Route map is illustrative only — swap for the target app's real router/auth guards.
// LoginRolePicker's onLogin just routes to each role's first screen; there's no real
// auth check here.
function LoginRoute() {
  const navigate = useNavigate();
  return <LoginRolePicker onLogin={({ role }) => navigate(DEST_FOR_ROLE[role])} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route path="/guest" element={<GuestEmptyState />} />
        <Route path="/member/membership" element={<MemberMyMembership />} />
        <Route path="/member/courses" element={<MemberCourseList />} />
        <Route path="/member/bookings" element={<MemberMyBookings />} />
        <Route path="/member/no-show" element={<MemberNoShowSuspension />} />
        <Route path="/front-desk/members" element={<FrontDeskMembers />} />
        <Route path="/front-desk/booking" element={<FrontDeskBooking />} />
        <Route path="/front-desk/checkin" element={<FrontDeskCheckin />} />
        <Route path="/store-manager/courses" element={<StoreManagerCourses />} />
        <Route path="/store-manager/staff" element={<StoreManagerStaff />} />
        <Route path="/store-manager/counter" element={<StoreManagerCounter />} />
        <Route path="/coach/open-class" element={<CoachOpenClass />} />
        <Route path="/coach/my-courses" element={<CoachMyCourses />} />
      </Routes>
    </BrowserRouter>
  );
}
