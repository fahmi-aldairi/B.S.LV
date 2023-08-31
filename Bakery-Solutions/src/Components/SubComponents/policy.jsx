import { styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from "@mui/icons-material/Call";

const WhiteSeparator = styled("span")({
  backgroundColor: "#fff",
  width: "1px",
  height: "15px",
  margin: "0 8px",
});

const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
  backgroundColor: "#8B4403",
  height: theme.spacing(3.5),
  color: "#fff",
  fontWeight: theme.typography.fontWeightRegular,
  "&:hover, &:focus": {
    backgroundColor: "#FFD966",
    color: "#8B4403",
  },
}));

function Policy() {
  return (
    <>
      <div className="container-fluid page-headerPoliciy py-6 d-flex flex-column-reverse justify-content-center ">
        <div className="container text-center py-5">
          <h1 className="display-4 mb-3" style={{ color: "#FFD966" }}>
            Privacy policy
          </h1>
          <div className="d-flex justify-content-center">
            <Breadcrumbs aria-label="breadcrumb" separator={<WhiteSeparator />}>
              <StyledBreadcrumb
                component="a"
                href="/"
                label="Home"
                icon={<HomeIcon fontSize="small" color="#8B4403" />}
              />
              <StyledBreadcrumb
                component="a"
                label="Privacy-policy"
                icon={<CallIcon fontSize="small" color="#8B4403" />}
              />
            </Breadcrumbs>
          </div>
        </div>
      </div>
      <main
        className="d-flex justify-content-center"
        style={{ color: "#8B4403" }}
      >
        <div
          className="container login-cont mt-4 p-5"
          style={{ borderRadius: "15px" }}
        >
          <h1 className="text-center mt-2 mb-4">privacy policy</h1>
          <p>
            {" "}
            At Bakery-Solutions we are committed to honoring the privacy of our
            online customers. We recognize the importance to you of maintaining
            an appropriate level of privacy and security for the personal
            information we collect from you over the Internet. We have created
            this Privacy Policy to demonstrate our commitment to privacy and
            security. The following discloses our Web site information gathering
            and use practices and is limited to the protection and use of
            personal information collected by us in the online environment. Your
            access to and use of our site are subject to this policy, as
            amended, revised or modified from time to time and any other terms
            of use or policies posted by us. All references to
            “Bakery-Solutions” throughout this policy statement include, unless
            otherwise stated, all Bakery & Company affiliate companies,
            successors and assigns.
          </p>
          <h3>Collection and Use of Personally Identifiable Information:</h3>
          <p>
            Bakery & Company is committed to respecting your privacy. Once you
            choose to provide personally identifiable information, it will only
            be used in the context of your customer’s relationship with Bakery &
            Company.
          </p>
          <p>
            You can order products and services, make requests and register to
            receive more information. The types of personal information
            collected at these pages are name, username, contact and billing
            information, transaction and credit card information. Data collected
            online may also be combined with information provided during
            ownership registration of Bakery & Company products and services. In
            order to tailor and customize subsequent communications and to
            continuously improve products and services, Bakery & Company may ask
            you to voluntarily provide information regarding your personal or
            professional interests, demographics, product experience and contact
            information.
          </p>
          <p>
            Bakery & Company will not sell, rent or lease your personally
            identifiable information to others, unless required by law or in
            special circumstances described below. Bakery & Company will only
            share the personal data provided with business partners who are
            acting on our behalf to complete the activities you requested. Such
            business partners are governed by Bakery & Company privacy policy
            with respect to the use of this data. Should your personal
            information be required by a company not governed by Bakery &
            Company privacy policy, your permission will be initially obtained.
            If you choose to share such information, the use of that data will
            be governed by the company’s respective privacy policy.
          </p>
          <p>
            Bakery & Company uses your information to better understand
            customer’s needs and continuously improve the level of services
            provided. Specifically, your information is used to help complete a
            transaction, to communicate back to you, to update you on services
            and benefits and to personalize Bakery & Company web site. Credit
            card numbers are used only for payment processing and are not
            utilized for any other purposes.
          </p>
          <p>
            From time to time, Bakery & Company where disclosed at the time of
            collection, may use your information to contact you for market
            research or to provide you with information thought to be of a
            particular interest. At a minimum, you have the opportunity to opt
            out of receiving such direct marketing or market research contacts.
            Where applicable, Bakery & Company will also follow local
            requirements such as allowing you to opt in before receiving an
            unsolicited contact.
          </p>
          <p>
            Bakery & Company strives to keep your personally identifiable
            information accurate. Every effort is made to provide you with
            online access to your registration data so that you may update or
            correct your information at any time. Bakery & Company is committed
            to ensuring the security of your information. We strive to prevent
            unauthorized access, maintain data accuracy and ensure the
            appropriate use of information. Appropriate procedures are in place
            to safeguard and secure the information collected online. Bakery &
            Company uses encryption when collecting or transferring sensitive
            data such as credit card information.
          </p>
          <h3>Who Has Access to This Information?</h3>
          <p>
            Unless we specifically disclose it to you at the time of collection
            or subsequently obtain your approval, we will not make visitor or
            customer-specific information that is gathered on our site available
            to unaffiliated organizations for commercial purposes unrelated to
            the business. Bakery & Company and its affiliated companies use this
            information to help us deliver the services you have requested or to
            design or offer specific products or services that we believe will
            be useful to you. While we may use this information to contact you
            or to send materials to you for marketing purposes, we will take
            commercially reasonable steps to safeguard such information from
            unauthorized access by any other parties. As we strive to meet the
            needs of our customers, we may disclose personal identifiable
            information we collect, as described above, to companies and vendors
            that perform marketing or other services on our behalf or with whom
            we have joint marketing agreements so that we may provide a full
            range of products and services to you. Our policy is to prohibit
            these companies from otherwise selling or disclosing the personal
            information we provide.
          </p>
          <p>
            Bakery & Company may disclose personal information about visitors or
            customers or information regarding your use of the Services or Web
            sites accessible through our Services, for any reason if, in our
            sole discretion, we believe that it is reasonable to do so,
            including: to satisfy laws, such as the Electronic Communications
            Privacy Act, regulations, or governmental or legal requests for such
            information; to disclose information that is necessary to identify,
            contact, or bring legal action against someone who may be violating
            our Acceptable Use Policy or other user policies; to operate the
            Services properly; or to protect Bakery & Company and our customers.
          </p>
          <h3>Voluntary Customers’ Surveys:</h3>
          <p>
            We may periodically conduct both business and individual customers’
            surveys. We encourage our customers to participate in these surveys
            because they provide us with important information that helps us to
            improve the types of services we offer and how we provide them to
            you. Your personal information and responses will remain strictly
            confidential. Participation in our customers’ surveys is voluntary.
          </p>
          <p>
            We may take the information we receive from individuals responding
            to our Customer Surveys and combine it with the responses of other
            Bakery & Company customers to create broader, generic responses to
            the survey questions (such as gender, age, residence, hobbies,
            education, employment, industry sector, or other demographic
            information). We may then use the aggregated information to improve
            the quality of our services to you and to develop new services and
            products.
          </p>
          <h3>Cookies:</h3>
          <p>
            Our site may make use of cookies or a similar technology to better
            manage our sites and to assist us in providing you with tailored
            information and services. You may set your browser to notify you or
            to decline the receipt of a cookie; however, certain features of our
            sites may not function properly or be available if your browser is
            configured to disable cookies. Advertisers and partners may also use
            their own cookies. We do not control use of these cookies and
            expressly disclaim responsibility for information collected through
            them.
          </p>
          <h3>E-Mail:</h3>
          <p>
            Bakery & Company policy is not to read or disclose private email
            communications that are transmitted using Bakery & Company services
            except to respond, if directed to us, or as required to operate the
            services, as set forth in the terms of use and policies established
            from time to time governing the services or as otherwise required by
            law. We may use your e-mail address to convey marketing-related
            communications like newsletters and updates regarding special offers
            or features on the site and/or our mobile phone application. We may
            also use this information to contact you for administrative or
            customer’s service.
          </p>
          <h3>Security:</h3>
          <p>
            All procedural safeguards are designed to protect the
            confidentiality of personal information provided by you at our Web
            site. For example, unique passcodes or passwords are required to
            access a number of our Web site services. In addition to requiring
            the use of a unique passcode or password, all payments processed
            through our Web site require personal transactional information
            provided by you to be sent in a “Secure Session” using Secure Square
            Space encryption technology. This technology encrypts – or scrambles
            – your financial or credit card account information to help prevent
            unauthorized parties from reading it. We regularly test and update
            our technology to help protect your personal information. However,
            such precautions do not guarantee that our Web site is invulnerable
            to all security breaches. Bakery & Company makes no warranty,
            guarantee, or representation that use of our Web site is protected
            from all viruses, security threats or other vulnerabilities and that
            your information will always be secured. When doing business with
            others, such as advertisers to whom you can link from our site, you
            should consider the separate security and privacy policies of those
            other sites.
          </p>
          <h3>Links to Other Sites:</h3>
          <p>
            For the convenience of our visitors and customers, this Web site may
            contain links to other sites. While we generally try to link only to
            sites that share similar high standards and respect for privacy, we
            are not responsible for the content, products or services offered or
            the privacy and security practices employed by these other sites.
          </p>
          <h3>Revisions:</h3>
          <p>
            Because of the evolving nature of the technologies that we use and
            the way that we conduct business, we reserve the right to revise,
            amend or modify this policy and agreements, at any time and in any
            manner. We will post any revisions, modification or amendments on
            this site.
          </p>
          <h5>
            If you have any questions regarding this statement, you should first
            contact Bakery & Company via email at{" "}
            <a
              href="mailto:BakerySol@mail.com"
              style={{ textDecoration: "none" }}
            >
              BakerySol@mail.com
            </a>
          </h5>
        </div>
      </main>
    </>
  );
}

export default Policy;
