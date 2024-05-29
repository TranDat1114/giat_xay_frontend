import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import HomePage from '@/pages/home';
import AboutPage from '@/pages/about';
import Layout from '@/components/layout/layout';
import SignInPage from '@/pages/signin';
import SignUpPage from '@/pages/signup';
import {DashboardHomePage, DashboardOrderPage} from '@/pages/dashboard';
import { isLoggedIn, isAdmin } from '@/lib/utils';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from '@/components/ui/tooltip';
import OrdersLaundryPage from '@/pages/orders-laundry';
import CompleteOrdersLaundryPage from '@/pages/complete-orders-laundry';
import { SingletonProvider } from '@/context/SingletonContext';
import ContactPage from '@/pages/contact';
const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/signin" />;
};

function App() {


  return (
    <Router>
      <SingletonProvider>
        <AuthProvider>
          <TooltipProvider>
            <Layout>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/signup" element={isLoggedIn() ? <Navigate to="/dashboard" /> : <SignUpPage />} />

                <Route path="/" element={<HomePage />} />

                <Route path="/signin" element={isLoggedIn() ? <Navigate to="/" /> : <SignInPage />} />
                <Route path="/dashboard-home" element={<PrivateRoute><DashboardHomePage /></PrivateRoute>} />
                <Route path="/dashboard-order" element={<PrivateRoute><DashboardOrderPage /></PrivateRoute>} />

                <Route path="/orders-laundry/:guid" element={<OrdersLaundryPage />} />

                <Route path="/complete-orders-laundry" element={<CompleteOrdersLaundryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<div>404</div>} />
              </Routes>
            </Layout>
          </TooltipProvider>
        </AuthProvider>
        <Toaster />

      </SingletonProvider>
    </Router>

  )
}

export default App
