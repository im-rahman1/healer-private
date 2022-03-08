import { Typography, Box } from "@mui/material";
import Layout from "@/components/Layout";

export default function PrivacyPolicy() {
  const styles = {
    heading: {
      margin: "30px 0px 5px 0px",
    },
    para: {
      margin: "10px 0px",
    },
    box: {
      marginLeft: "20px",
    },
  };

  return (
    <Layout title="Privacy Policy">
      <Box sx={{ margin: "30px 20px" }}>
        <Typography variant="h4" sx={{ margin: "30px 0 5px 0" }}>
          Privacy Policy
        </Typography>
        <Typography>
          Healercare Pvt Ltd, (“We, us or our”), are committed to protecting and
          respecting your privacy. This policy together with our website terms
          of use (TERMS) sets out the basis on which any personal data we
          collect from you, or that you provide to us, will be processed by us.
          The website www.healer.pk (“our site”) is not intended for children
          and we do not knowingly collect data relating to children. Please read
          the following carefully to understand our views and practices
          regarding your personal data and how we will treat it.
        </Typography>
        <Typography sx={styles.heading} variant="h6">
          1. INFORMATION WE MAY COLLECT FROM YOU
        </Typography>
        <Typography sx={styles.para}>
          We may collect and process the following data about you:
        </Typography>
        <Typography sx={styles.para}>
          a) Information you give us. You may give us information about you by
          completing the order form or medical consultation form on our site, or
          by corresponding with us by phone, e-mail or otherwise. This includes
          information you provide when you register to use our site. The
          information you give us may include your name, address, e-mail address
          and phone number.
        </Typography>
        <Typography sx={styles.para}>
          b) Information we collect about you. With regard to each of your
          visits to our site we may automatically collect the following
          information:
        </Typography>
        <Box sx={styles.box}>
          <Typography sx={styles.para}>
            i. technical information, including the Internet protocol (IP)
            address used to connect your computer to the Internet, browser type
            and version, time zone setting, browser plug-in types and versions,
            operating system and platform; and
          </Typography>
          <Typography sx={styles.para}>
            ii. information about your visit, including the full Uniform
            Resource Locators (URL) clickstream to, through and from our site
            (including date and time); page response times, length of visits to
            certain pages, page interaction information (such as scrolling,
            clicks, and mouse-overs), and methods used to browse away from the
            page and any phone number used to call our customer service number.
          </Typography>
        </Box>
        <Typography sx={styles.heading} variant="h6">
          2. HOW WE COLLECT YOUR INFORMATION
        </Typography>
        <Typography sx={styles.para}>
          We use different methods to collect information from and about you
          including through:
        </Typography>
        <Typography sx={styles.para}>
          a) Direct interactions. You may give us your personal data by filling
          in forms or by corresponding with us by post, phone, email or
          otherwise. This includes personal data you provide when you:
        </Typography>
        <Box sx={styles.box}>
          <Typography sx={styles.para}>
            i. order medication on our site;
          </Typography>
          <Typography sx={styles.para}>
            ii. create an account on our site;
          </Typography>
          <Typography sx={styles.para}>
            iii. request marketing to be sent to you; or
          </Typography>
          <Typography sx={styles.para}>iv. give us some feedback.</Typography>
        </Box>
        <Typography sx={styles.para}>
          b) Automated technologies or interactions. As you interact with our
          site, we may automatically collect data about your computer equipment,
          browsing actions and patterns. We collect this personal data by using
          cookies and other similar technologies.
        </Typography>
        <Typography sx={styles.heading} variant="h6">
          3. COOKIES
        </Typography>
        <Typography sx={styles.para}>
          Our site uses cookies to distinguish you from other users of our site.
          This helps us to provide you with a good experience when you browse
          our site and also allows us to improve our site. You can set your
          browser not to accept cookies and the above websites tell you how to
          remove cookies from your browser.
        </Typography>
        <Typography sx={styles.heading} variant="h6">
          4. USES MADE OF THE INFORMATION
        </Typography>
        <Typography sx={styles.para}>
          We will only use your personal data when the law allows us to. Most
          commonly, we will use your personal data in the following
          circumstances:
        </Typography>
        <Typography sx={styles.para}>
          a) where we need to perform the contract we are about to enter into or
          have entered into with you;
        </Typography>
        <Typography sx={styles.para}>
          b) where it is necessary for our legitimate interests (or those of a
          third party) and your interests and fundamental rights do not override
          those interests ; and
        </Typography>
        <Typography sx={styles.para}>
          c) where we need to comply with a legal or regulatory obligation.
        </Typography>
        <Typography sx={styles.para}>
          a) Information you give to us. We will use this information:
        </Typography>
        <Box sx={styles.box}>
          <Typography sx={styles.para}>
            i. to assess whether the medication ordered is suitable in light of
            your medical history and symptoms experienced;
          </Typography>
          <Typography sx={styles.para}>
            ii. to verify your identity against other mediums we deem relevant
            for our checks;
          </Typography>
          <Typography sx={styles.para}>
            iii. to store in our customer database;
          </Typography>
          <Typography sx={styles.para}>
            iv. to notify you about changes to our service;
          </Typography>
          <Typography sx={styles.para}>
            v. to provide marketing material about services or medication that
            may be of interest to you (consent to such material can be
            withdrawn); and
          </Typography>
          <Typography sx={styles.para}>
            vi. to ensure that content from our site is presented in the most
            effective manner for you and for your computer.
          </Typography>
        </Box>
        <Typography sx={styles.para}>
          b) Information we collect about you. We will use this information:
        </Typography>
        <Box sx={styles.box}>
          <Typography sx={styles.para}>
            i. to administer our site and for internal operations, including
            troubleshooting, data analysis, testing, research and statistical;
          </Typography>
          <Typography sx={styles.para}>
            ii. to improve our site to ensure that content is presented in the
            most effective manner for you and for your computer;
          </Typography>
          <Typography sx={styles.para}>
            iii. to allow you to submit orders for medication to us, when you
            choose to do so; and
          </Typography>
          <Typography sx={styles.para}>
            iv. as part of our efforts to keep our site safe and secure.
          </Typography>
        </Box>
        <Typography sx={styles.heading} variant="h6">
          5. DISCLOSURE OF YOUR INFORMATION
        </Typography>
        <Typography sx={styles.para}>
          We may disclose your personal information to third parties if we are
          under a duty to disclose or share your personal data in order to
          comply with any legal obligation, or in order to enforce or apply our
          terms of use (TERMS) and other agreements; or to protect our rights,
          property, safety, customers, or others. This includes exchanging
          information with other companies and organisations for the purposes of
          fraud protection and credit risk reduction, customer feedback, email
          communication, delivery & courier services and website development and
          management.
        </Typography>
        <Typography sx={styles.heading} variant="h6">
          6. WHERE WE STORE YOUR PERSONAL DATA
        </Typography>
        <Typography sx={styles.para}>
          All information you provide to us is stored on our secure servers.
        </Typography>
        <Typography sx={styles.para}>
          Unfortunately, the transmission of information via the internet is not
          completely secure. Although we will do our best to protect your
          personal data, we cannot guarantee the security of your data
          transmitted to our site. Any transmission is at your own risk. Once we
          have received your information, we will use strict procedures and
          security features to try to prevent unauthorised access.
        </Typography>
        <Typography sx={styles.para}>
          We are responsible for transactions placed on our site and deploy an
          SSL certificate so that all data is transferred securely using SSL.{" "}
        </Typography>
        <Typography sx={styles.para}>
          We have put in place procedures to deal with any suspected personal
          data breach and will notify you and any applicable regulator of a
          breach where we are legally required to do so.
        </Typography>
        <Typography sx={styles.heading} variant="h6">
          7. HOW LONG WE WILL USE AND RETAIN YOUR PERSONAL DATA FOR
        </Typography>
        <Typography sx={styles.para}>
          Your personal data will be retained indefinitely on our secure
          servers, as required by regulation regarding healthcare provision
        </Typography>
        <Typography sx={styles.heading} variant="h6">
          8. YOUR RIGHTS
        </Typography>
        <Typography sx={styles.para}>
          You have the right to ask us not to process your personal data for
          marketing purposes. We will inform you (before collecting your data)
          if we intend to use your data for such purposes. You can exercise your
          right to prevent such processing by checking certain boxes on the
          forms we use to collect your data.
        </Typography>
        <Typography sx={styles.para}>
          You have the right to rectify or correct any personal data we hold for
          you if it is inaccurate or incomplete.
        </Typography>
        <Typography sx={styles.heading} variant="h6">
          9. CHANGES TO OUR PRIVACY POLICY
        </Typography>
        <Typography sx={styles.para}>
          Any changes we may make to our privacy policy in the future will be
          posted on our site and, where appropriate, notified to you by e-mail.
          Please check our site frequently to see any updates or changes to our
          privacy policy.
        </Typography>
        <Typography sx={styles.heading} variant="h6">
          10. DECLARATION
        </Typography>
        <Typography sx={styles.para}>
          I hereby confirm that I have read and understood Healercare Pvt Ltd
          privacy policy above and that I hereby agree and consent to Healer
          using and processing my personal data for the purposes required by
          Healer, as set out in Healercare Pvt Ltd privacy policy above.
        </Typography>
      </Box>
    </Layout>
  );
}
