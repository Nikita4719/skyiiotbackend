import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Collapse,
  IconButton,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  CheckCircleIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import './sidenav.css';

export function Sidenav() {
  const [openCMS, setOpenCMS] = useState(false);
  const [openSolution, setOpenSolution] = useState(false);
  const [openNavbar, setOpenNavbar] = useState(false);
  const [openMaster, setOpenMaster] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const navigate = useNavigate();
  
  return (
    <aside className="fixed h-screen w-72 bg-white shadow-lg p-4 
                  overflow-y-auto overflow-x-hidden 
                  transition-all duration-300 ease-in-out">


      <Typography variant="h5" className="mb-6">
        Admin Panel
      </Typography>

      {/* Dashboard */}
      <NavLink to="/dashboard/home">
        {({ isActive }) => (
          <Button
            variant={isActive ? "gradient" : "text"}
            className="flex items-center gap-3 mb-2"
            fullWidth
          >
            <HomeIcon className="w-5 h-5" />
            Dashboard
          </Button>
        )}
      </NavLink>

      {/*Navbar */}

      <Button
        variant="text"
        onClick={() => setOpenNavbar(!openNavbar)}
        className="flex items-center justify-between mb-2"
        fullWidth
      >
        <div className="flex items-start gap-3">
          < EnvelopeIcon className="w-5 h-5" />
          Navbar
        </div>
        <ChevronDownIcon className="w-4 h-4" />
      </Button>

      <Collapse open={openNavbar}>

        <NavLink to="/dashboard/navbar/navbar-top">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Header Top
          </Button>
        </NavLink>

        <NavLink to="/dashboard/navbar/navbar-logo">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Navbar Logo
          </Button>
        </NavLink>

        <NavLink to="/dashboard/navbar/navbar-menu">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Navbar Menu
          </Button>
        </NavLink>

      </Collapse>


      {/* Solution */}

      <Button
        variant="text"
        onClick={() => setOpenSolution(!openSolution)}
        className="flex items-center justify-between mb-2"
        fullWidth
      >
        <div className="flex items-start gap-3">
          <CheckCircleIcon className="w-5 h-5" />
          Solution
        </div>
        <ChevronDownIcon className="w-4 h-4" />
      </Button>

      <Collapse open={openSolution}>

        <NavLink to="/dashboard/solution/solution-cat">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Solution Cat
          </Button>
        </NavLink>

        <NavLink to="/dashboard/solution/solution-sub-cat">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Solution Sub Cat
          </Button>
        </NavLink>

        <NavLink to="/dashboard/solution/solution-images">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Solution Image
          </Button>
        </NavLink>

      </Collapse>

      {/* CMS */}
      <Button
        variant="text"
        onClick={() => setOpenCMS(!openCMS)}
        className="flex items-center justify-between mb-2"
        fullWidth
      >
        <div className="flex items-start gap-3">
          <DocumentTextIcon className="w-5 h-5" />
          CMS
        </div>
        <ChevronDownIcon className="w-4 h-4" />
      </Button>

      <Collapse open={openCMS}>
        <NavLink to="/dashboard/cms/about-us">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            About Us
          </Button>
        </NavLink>

        <NavLink to="/dashboard/cms/about-us-enterprise">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            About Us Enterprise
          </Button>
        </NavLink>

        <NavLink to="/dashboard/cms/about-us-benefits">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            About Us Benefits
          </Button>
        </NavLink>


        <NavLink to="/dashboard/cms/footer">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Footer
          </Button>
        </NavLink>

        <NavLink to="/dashboard/cms/testimonial">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Testimonial
          </Button>
        </NavLink>


        <NavLink to="/dashboard/cms/smarter">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Smarter
          </Button>
        </NavLink>


        <NavLink to="/dashboard/cms/ai-powered">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            AI-Powered
          </Button>
        </NavLink>

        <NavLink to="/dashboard/cms/our-team">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Our Team
          </Button>
        </NavLink>

        <NavLink to="/dashboard/cms/faq">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            FAQ
          </Button>
        </NavLink>

      </Collapse>

      {/* Master */}
      <Button
        variant="text"
        onClick={() => setOpenMaster(!openMaster)}
        className="flex items-center justify-between mb-2"
        fullWidth
      >
        <div className="flex items-center gap-3">
          <Cog6ToothIcon className="w-5 h-5" />
          Master
        </div>
        <ChevronDownIcon className="w-4 h-4" />
      </Button>

      <Collapse open={openMaster}>

        <NavLink to="/dashboard/master/slides-content">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Slides Content
          </Button>
        </NavLink>

        <NavLink to="/dashboard/master/what-section">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            What Section
          </Button>
        </NavLink>

        <NavLink to="/dashboard/master/image">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Image
          </Button>
        </NavLink>

        <NavLink to="/dashboard/master/services">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Services
          </Button>
        </NavLink>

        <NavLink to="/dashboard/master/services-category">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Service Category
          </Button>
        </NavLink>

        <NavLink to="/dashboard/master/services-sub-cat">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Service Sub Category
          </Button>
        </NavLink>

        <NavLink to="/dashboard/master/supported-section">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Supported Content
          </Button>
        </NavLink>

        <NavLink to="/dashboard/master/offer-section">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Offer Section
          </Button>
        </NavLink>

        <NavLink to="/dashboard/master/everywhere-slide">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Everywhere Slide
          </Button>
        </NavLink>

        <NavLink to="/dashboard/master/faqs">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            FAQ'S
          </Button>
        </NavLink>

        <NavLink to="/dashboard/master/contact-messages">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Contact
          </Button>
        </NavLink>

        <NavLink to="/dashboard/master/contact-settings">
          <Button variant="text" className="flex justify-start pl-12 mb-1 normal-case" fullWidth>
            Contact Settings
          </Button>
        </NavLink>

      </Collapse>

      {/* Settings */}
      <Button
        variant="text"
        onClick={() => setOpenSettings(!openSettings)}
        className="flex items-center justify-between mb-2"
        fullWidth
      >
        <div className="flex items-center gap-3">
          <UserCircleIcon className="w-5 h-5" />
          Settings
        </div>
        <ChevronDownIcon className="w-4 h-4" />
      </Button>

      <Collapse open={openSettings}>

        <Button
          variant="text"
          className="flex justify-start pl-12 mb-1 normal-case"
          fullWidth
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/auth/sign-in");
          }}
        >
          Logout
        </Button>
      </Collapse>
    </aside>
  );
}

export default Sidenav;
