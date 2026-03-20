import {
  HomeIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { Home } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

//NAVABR
import HeaderTop from "./pages/navbar/header_top/HeaderTopTable";
import HeaderTopForm from "./pages/navbar/header_top/HeaderTopForm";
import NavbarMenuForm from "./pages/navbar/navbarmenu/NavbarMenuForm";
import NavbarMenuTable from "./pages/navbar/navbarmenu/NavbarMenuTable";
import NavbarLogo from "./pages/navbar/navbarlogo/NavbarLogo";
import NavbarLogoForm from "./pages/navbar/navbarlogo/NavbarLogoForm";


//SOLUTION ROUTES
import SolutionCat from "./pages/solution/solutioncat/SolutionCat";
import SolutionCatForm from "./pages/solution/solutioncat/SolutionCatForm";
import SolutionSubCat from "./pages/solution/solutionsubcat/SolutionSubCat";
import SolutionSubCatForm from "./pages/solution/solutionsubcat/SolutionSubCatForm";
import SolutionImage from "./pages/solution/solutionimage/SolutionImage";
import SolutionImageForm from "./pages/solution/solutionimage/SolutionImageForm";

//CMS ROUTES
import AboutUs from "./pages/cms/about_us/AboutUs";
import AboutUsForm from "./pages/cms/about_us/AboutUsForm";
import AboutUsEnterprise from "./pages/cms/about_us_enterprise/AboutUsEnterprise";
import AboutUsEnterpriseForm from "./pages/cms/about_us_enterprise/AboutUsEnterpriseForm";
// import Solution from "./pages/cms/solution/Solution";
import Footer from "./pages/cms/footer/Footer";
import FooterForm from "./pages/cms/footer/FooterForm";
import OurTeam from "./pages/cms/our_team/OurTeam";
import OurTeamForm from "./pages/cms/our_team/OurTeamForm";
import Testimonial from "./pages/cms/testimonial/Testimonial";
import TestimonialForm from "./pages/cms/testimonial/TestimonialForm";
import Smarter from "./pages/cms/smarter/Smarter";
import SmarterForm from "./pages/cms/smarter/SmarterForm";
import Faq from "./pages/cms/faq/Faq";
import FaqForm from "./pages/cms/faq/FaqForm";



//MASTER ROUTES
import SlidesContent from "./pages/master/slides_content/SlidesContent";
import AddSlidesContent from "./pages/master/slides_content/AddSlidesContent";
import WhatSection from "./pages/master/wh_section/WhatSection";
import WhatSectionForm from "./pages/master/wh_section/WhatSectionForm";
import Image from "./pages/master/image/Image";
import ImageForm from "./pages/master/image/ImageForm";
// import EmbeddedSection from "./pages/master/embedded_section/Services";

import ServicesCategory from "./pages/master/services_category/ServicesCategory";
import ServicesCategoryForm from "./pages/master/services_category/ServicesCategoryForm";
import ServicesSubCat from "./pages/master/services_sub_cat/ServicesSubCat";
import ServicesSubCatForm from "./pages/master/services_sub_cat/ServicesSubCatForm";
import ManagementSection from "./pages/master/management_section/ManagementSection";
import ManagementSectionForm from "./pages/master/management_section/ManagementSectionForm";
import SupportedContent from "./pages/master/supported_content/SupportedContent";
import SupportedContentForm from "./pages/master/supported_content/SupportedContentForm";
import OfferSection from "./pages/master/offer_section/OfferSection";
import OfferSectionForm from "./pages/master/offer_section/OfferSectionForm";
import EverywhereSlide from "./pages/master/everywhere_slide/EverywhereSlide";
import EverywhereSlideForm from "./pages/master/everywhere_slide/EverywhereSlideForm";
// import SolutionForm from "./pages/cms/solution/SolutionForm";
import AIPowered from "./pages/cms/ai_powered/AIPowered";
import AIPoweredForm from "./pages/cms/ai_powered/AIPoweredForm";
import Faqs from "./pages/master/faqs/Faqs";
import FaqsForm from "./pages/master/faqs/FaqsForm";
import AboutUsBenefits from "./pages/cms/about_us_benefits/AboutUsBenefits";
import AboutUsBenefitsForm from "./pages/cms/about_us_benefits/AboutUsBenefitsForm";
import ContactMessages from "./pages/master/contact_messages/ContactMessages";
import ContactMessageForm from "./pages/master/contact_messages/ContactMessagesForm";
import ContactSettings from "./pages/master/contact_settings/ContactSettings";
import ContactSettingsForm from "./pages/master/contact_settings/ContactSettingsForm"
import Services from "./pages/master/services/Services";
import ServicesForm from "./pages/master/services/ServicesForm";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      //NAVBAR

       {
        name: "navbar",
        path: "/navbar/navbar-top",
        element: <HeaderTop />,
      },
      {
        path: "/navbar/navbar-top/add",
        element: <HeaderTopForm />,
      },
      {
        path: "/navbar/navbar-top/edit/:id",
        element: <HeaderTopForm />,
      },
    //NAVABR LOGO
{
        name: "navbar logo",
        path: "/navbar/navbar-logo",
        element: <NavbarLogo />,
      },
      {
        path: "/navbar/navbar-logo/add",
        element: <NavbarLogoForm />,
      },
      {
        path: "/navbar/navbar-logo/edit/:id",
        element: <NavbarLogoForm />,
      },

//NAVBAR MENU

{
        name: "navbar-menu",
        path: "/navbar/navbar-menu",
        element: <NavbarMenuTable/>,
      },
      {
        path: "/navbar/navbar-menu/add",
        element: <NavbarMenuForm />,
      },
      {
        path: "/navbar/navbar-menu/edit/:id",
        element: <NavbarMenuForm />,
      },


      //SOLUTION CAT
      {
        name: "solution category",
        path: "/solution/solution-cat",
        element: <SolutionCat />,
      },
      {
        path: "/solution/solution-cat/add",
        element: <SolutionCatForm />,
      },
      {
        path: "/solution/solution-cat/edit/:id",
        element: <SolutionCatForm />,
      },
      //SOLUTION SUB CAT
      {
        name: "solution category",
        path: "/solution/solution-sub-cat",
        element: <SolutionSubCat />,
      },
      {
        path: "/solution/solution-sub-cat/add",
        element: <SolutionSubCatForm />,
      },
      {
        path: "/solution/solution-sub-cat/edit/:id",
        element: <SolutionSubCatForm />,
      },
      //SOLUTION IMAGE FORM
      {
        name: "solution image",
        path: "/solution/solution-images",
        element: <SolutionImage />,
      },
      {
        path: "/solution/solution-images/add",
        element: <SolutionImageForm />,
      },
      {
        path: "/solution/solution-images/edit/:id",
        element: <SolutionImageForm />,
      },
      // CMS ROUTES
      //About Us
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "about us",
        path: "/cms/about-us",
        element: <AboutUs />,
      },
      {
        path: "/cms/about-us/add",
        element: <AboutUsForm />,
      },
      {
        path: "/cms/about-us/edit/:id",
        element: <AboutUsForm />,
      },
      // ABOUT US ENTERPRISE
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "about us enterprise",
        path: "/cms/about-us-enterprise",
        element: <AboutUsEnterprise />,
      },
      {
        path: "/cms/about-us-enterprise/add",
        element: <AboutUsEnterpriseForm />,
      },
      {
        path: "/cms/about-us-enterprise/edit/:id",
        element: <AboutUsEnterpriseForm />,
      },
      //ABOUT US BENEFITS
      // ABOUT US ENTERPRISE
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "about us enterprise",
        path: "/cms/about-us-benefits",
        element: <AboutUsBenefits />,
      },
      {
        path: "/cms/about-us-benefits/add",
        element: <AboutUsBenefitsForm />,
      },
      {
        path: "/cms/about-us-benefits/edit/:id",
        element: <AboutUsBenefitsForm />,
      },

      // //Solution
      // {
      //   icon: <DocumentTextIcon {...icon} />,
      //   name: "solution",
      //   path: "/cms/solution",
      //   element: <Solution />,
      // },
      // {
      //   path: "/cms/solution/add",
      //   element: <SolutionForm />,
      // },
      // {
      //   path: "/cms/solution/edit/:id",
      //   element: <SolutionForm />,
      // },
      //FOOTER 
      {
        path: "/cms/footer",
        element: <Footer />,
      },
      {
        path: "/cms/footer/add",
        element: <FooterForm />,
      },
      {
        path: "/cms/footer/edit/:id",
        element: <FooterForm />,
      },
      //FAQ
      {
        path: "/cms/faq",
        element: <Faq />,
      },
      {
        path: "/cms/faq/add",
        element: <FaqForm />,
      },
      {
        path: "/cms/faq/edit/:id",
        element: <FaqForm />,
      },

      //OUR TEAM
      {
        path: "/cms/our-team",
        element: <OurTeam />,
      },
      {
        path: "/cms/our-team/add",
        element: <OurTeamForm />,
      },
      {
        path: "/cms/our-team/edit/:id",
        element: <OurTeamForm />,
      },
      //TESTIMONIAL

      {
        path: "/cms/testimonial",
        element: <Testimonial />,
      },
      {
        path: "/cms/testimonial/add",
        element: <TestimonialForm />,
      },
      {
        path: "/cms/testimonial/edit/:id",
        element: <TestimonialForm />,
      },

      //SMARTER
      {
        path: "/cms/smarter",
        element: <Smarter />,
      },
      {
        path: "/cms/smarter/add",
        element: <SmarterForm />,
      },
      {
        path: "/cms/smarter/edit/:id",
        element: <SmarterForm />,
      },
      //AI POWERED
      {
        path: "/cms/ai-powered",
        element: <AIPowered />,
      },
      {
        path: "/cms/ai-powered/add",
        element: <AIPoweredForm />,
      },
      {
        path: "/cms/ai-powered/edit/:id",
        element: <AIPoweredForm />,
      },
      //CMS FAQ
      {
        path: "/cms/faq",
        element: <Faq />,
      },
      {
        path: "/cms/faq/add",
        element: <FaqForm />,
      },
      {
        path: "/cms/faq/edit/:id",
        element: <FaqForm />,
      },

      // MASTER ROUTES
      //SLIDES CONTENT
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "slides-content",
        path: "/master/slides-content",
        element: <SlidesContent />,
      },
      {
        name: "Edit Slide",
        path: "/master/slides-content/edit/:id",
        element: <AddSlidesContent />, // or EditSlide component
      },

      {
        name: "Add Slide",
        path: "/master/slides-content/add",
        element: <AddSlidesContent />,
      },

      // WHAT SECTION ROUTES
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "what-section",
        path: "/master/what-section",
        element: <WhatSection />,
      },
      {
        name: "Add What Section",
        path: "/master/what-section/add",
        element: <WhatSectionForm />,
      },
      {
        name: "Edit What Section",
        path: "/master/what-section/edit/:id",
        element: <WhatSectionForm />,
      },
      //Image Route
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "image",
        path: "/master/image",
        element: <Image />,
      },
      {
        name: "Add Image",
        path: "/master/image/add",
        element: <ImageForm />,
      },
      {
        name: "Edit Image",
        path: "/master/image/edit/:id",
        element: <ImageForm />,
      },
      //Embedded Section
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "embedded-section",
        path: "/master/services",
        element: <Services />,
      },
      {
        name: "Add Embedded Section",
        path: "/master/services/add",
        element: <ServicesForm/>,
      },
      {
        name: "Edit Embedded Section",
        path: "/master/services/edit/:id",
        element: <ServicesForm/>,
      },
      //Network Section
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "network-section",
        path: "/master/services-category",
        element: <ServicesCategory/>,
      },
      {
        name: "Add Network Section",
        path: "/master/services-category/add",
        element: <ServicesCategoryForm />,
      },
      {
        name: "Edit Network Section",
        path: "/master/services-category/edit/:id",
        element: <ServicesCategoryForm />,
      },
      //Cloud Section
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "cloud-section",
        path: "/master/services-sub-cat",
        element: <ServicesSubCat />,
      },
      {
        name: "Add Cloud Section",
        path: "/master/services-sub-cat/add",
        element: <ServicesSubCatForm />,
      },
      {
        name: "Edit Cloud Section",
        path: "/master/services-sub-cat/edit/:id",
        element: <ServicesSubCatForm />,
      },
      //Management Section
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "management-section",
        path: "/master/management-section",
        element: <ManagementSection />,
      },
      {
        name: "Add Management Section",
        path: "/master/management-section/add",
        element: <ManagementSectionForm />,
      },
      {
        name: "Edit Management Section",
        path: "/master/management-section/edit/:id",
        element: <ManagementSectionForm />,
      },
      //Supported Content Route
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "supported-section",
        path: "/master/supported-section",
        element: <SupportedContent />,
      },
      {
        name: "Add Supported Content",
        path: "/master/supported-section/add",
        element: <SupportedContentForm />,
      },
      {
        name: "Edit Supported Content",
        path: "/master/supported-section/edit/:id",
        element: <SupportedContentForm />,
      },
      //OFFER SECTION
      {
        path: "/master/offer-section",
        element: <OfferSection />,
      },
      {
        path: "/master/offer-section/add",
        element: <OfferSectionForm />,
      },
      {
        path: "/master/offer-section/edit/:id",
        element: <OfferSectionForm />,
      },
      //EverywhereSlideForm
      {
        path: "/master/everywhere-slide",
        element: <EverywhereSlide />,
      },
      {
        path: "/master/everywhere-slide/add",
        element: <EverywhereSlideForm />,
      },
      {
        path: "/master/everywhere-slide/edit/:id",
        element: <EverywhereSlideForm />,
      },
      //FAQ'S
      {
        path: "/master/faqs",
        element: <Faqs />,
      },
      {
        path: "/master/faqs/add",
        element: <FaqsForm />,
      },
      {
        path: "/master/faqs/edit/:id",
        element: <FaqsForm />,
      },
      // CONTACT MESSAGES
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "contact-messages",
        path: "/master/contact-messages",
        element: <ContactMessages />,
      },
      {
        path: "/master/contact-messages/add",
        element: <ContactMessageForm />,
      },
      {
        path: "/master/contact-messages/edit/:id",
        element: <ContactMessageForm />,
      },
      // CONTACT SETTINGS
      {
        name: "contact-settings",
        path: "/master/contact-settings",
        element: <ContactSettings />,
      },
      {
        path: "/master/contact-settings/add",
        element: <ContactSettingsForm />,
      },
      {
        path: "/master/contact-settings/edit/:id",
        element: <ContactSettingsForm />,
      }


    ],
  },

  {
    layout: "auth",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
