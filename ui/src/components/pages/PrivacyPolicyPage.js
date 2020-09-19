import Helmet from 'react-helmet-async'
import React, { Fragment } from 'react'

import GridContainer from 'components/external/GridContainer'
import GridItem from 'components/external/GridItem'
import {
  PageHeading,
  PageLink,
  PageList,
  PageListItem,
  PageSubHeading,
  PageText
} from 'components/external/typography'

const lastUpdated = 'August 15, 2019'

function PrivacyPolicyPage() {
  return (
    <Fragment>
      <Helmet>
        <title>
          Privacy Policy
        </title>
      </Helmet>

      <GridContainer>
        <GridItem start={3} end={15}>
          <PageHeading>
            Privacy Policy
          </PageHeading>

          <PageSubHeading>
            Last Updated:
            {' '}
            {lastUpdated}
          </PageSubHeading>

          <PageText>
            This privacy policy governs the manner in which KeepWorks Technologies Pvt Ltd.
            (“KeepWorks”, “us”, “we”, or “our”) uses and protects any information that you provide
            voluntarily to KeepWorks.
          </PageText>

          <PageText>
            We are devoted to ensuring that your privacy is protected. If we require you to provide
            certain information which helps in your identification when accessing your account
            information, you can be assured that such information will be used only in accordance
            with this privacy policy.
          </PageText>

          <PageText>
            We may change this policy from time to time by updating this page. The changes in policy
            due to any change made shall not compromise on the protection of personal information
            that you have. We would require you to check this page regularly to ensure that you are
            happy with the changes (if any). This policy is effective from
            {' '}
            {lastUpdated}
            .
          </PageText>

          <PageText>
            We have a firm policy of protecting the confidentiality and security of information that
            we collect from our users. We do not share your non-public personal information with
            unaffiliated third parties. Information is only shared with your consent except for the
            specific purposes given below, in accordance with all applicable laws. We require you to
            please read this policy carefully; it gives you important information about how we
            handle your personal information.
          </PageText>

          <PageText>
            KeepWorks may collect the following information when you sign-up as a new user:
          </PageText>

          <PageList>
            <PageListItem>
              Personal information, such as name and e-mail address
            </PageListItem>
            <PageListItem>
              Content that you post in your account
            </PageListItem>
            <PageListItem>
              Cookies
            </PageListItem>
            <PageListItem>
              Log Files
            </PageListItem>
            <PageListItem>
              Geo-Location information
            </PageListItem>
          </PageList>

          <PageText>
            We may collect personal information from users in a variety of ways, including, but not
            limited to, when users visit our site, subscribe to newsletters, provide e-mail
            addresses, fill out a form and in connection with other activities, services or features
            that we make available on our site. Users may be asked for, as appropriate, name, e-mail
            address, phone number, etc. Users may, however, visit our site anonymously. We collect
            personal information from you only if you voluntarily submit such information to us. You
            can always refuse to provide any personal information to us, however this may prevent
            you from engaging in certain of our site related activities.
          </PageText>

          <PageText>
            A Log-File is a file that keeps a registry of events, processes, messages and
            communication between various communicating software applications and the operating
            system. An IP address is personal information and you must let us know if you do not
            want us to keep a record of your email id.
          </PageText>

          <PageText>
            The sole objective of gathering this information is to understand and evaluate your
            needs and:
          </PageText>

          <PageList>
            <PageListItem>
              To improve customer service: The information you provide helps us respond to your
              customer service requests and support needs more efficiently.
            </PageListItem>
            <PageListItem>
              To personalize user experience: We may use information in the aggregate to understand
              how our users as a group use the services and resources provided on our site.
            </PageListItem>
            <PageListItem>
              To improve our site: We may use feedback you provide to improve our products and/or
              services.
            </PageListItem>
            <PageListItem>
              To process payments: We may use the information users provide about themselves when
              purchasing paid products and/or services within the service. We do not share this
              information with third parties, except to the extent necessary to provide the service.
            </PageListItem>
          </PageList>

          <PageSubHeading>
            Disclosure of your information:
          </PageSubHeading>

          <PageText>
            We may be required to disclose an individual’s personal information in response to a
            lawful request by public authorities, including meeting national security or law
            enforcement requirements. In response to a verified request by law enforcement or other
            government officials relating to a criminal investigation or alleged illegal activity,
            we can (and you authorize us) disclose your name, city, state, telephone number, e-mail
            address, User ID history, fraud complaints and usage history, without a
            summons/subpoena, in connection with an investigation of fraud, intellectual property
            infringement, piracy or other unlawful activity.
          </PageText>

          <PageText>
            In the event we undergo a business transaction such as a merger, acquisition or sale of
            all or a portion of our assets, your personal information may be among the assets
            transferred or examined during the due diligence process. You acknowledge and consent
            that such transfers may occur and are permitted by this Privacy Policy, and that any
            acquirer of our assets may continue to process your personal information as set forth in
            this Privacy Policy. If our information practices change at any time in the future, we
            will post the policy changes to this Site so that you may opt out of the new information
            practices. We suggest that you check the Website periodically if you are concerned about
            how your information is used.
          </PageText>

          <PageText>
            KeepWorks Technologies Pvt Ltd. may disclose your personal data in the good faith belief
            that such action is necessary to:
          </PageText>

          <PageList>
            <PageListItem>
              To conform to legal obligations
            </PageListItem>
            <PageListItem>
              To provide for protection of personal safety of users of the service or the public
            </PageListItem>
            <PageListItem>
              To provide for protection against legal disability
            </PageListItem>
            <PageListItem>
              To prevent or investigate any wrongdoing in connection with the service
            </PageListItem>
            <PageListItem>
              To protect and defend the rights or property of KeepWorks Technologies Pvt Ltd.
            </PageListItem>
          </PageList>

          <PageText>
            In cases of onward transfer to third parties of data of EU and Swiss individuals
            received pursuant to the Privacy Shield Principles, KeepWorks is potentially liable.
          </PageText>

          <PageText>
            We are committed to ensuring that your information is secure with us. In order to
            prevent unauthorised access or disclosure we have put in place suitable physical,
            electronic and managerial procedures to safeguard and secure the information we collect
            online.
          </PageText>

          <PageSubHeading>
            Cookies
          </PageSubHeading>

          <PageText>
            We use traffic log cookies to identify which pages are being
            used. This helps us analyse data about webpage traffic and improve our website in order
            to tailor it to customer needs. We only use this information for statistical analysis
            purposes and then the data is removed from the system.
          </PageText>

          <PageText>
            Overall, cookies help us provide you with a better website, by enabling us to monitor
            which pages you find useful and which you do not. A cookie in no way gives us access to
            your computer or any information about you, other than the data you choose to share with
            us.
          </PageText>

          <PageText>
            Cookies are files with a small amount of data which may include an anonymous unique
            identifier. Cookies are sent to your browser from a website and stored on your device.
          </PageText>

          <PageText>
            Examples of cookies we use:
          </PageText>

          <PageList>
            <PageListItem>
              Session cookies: Also called a transient cookie, a cookie that is erased when the user
              closes the web browser. These cookies are stored in temporary memory and not returned
              after the browser is closed. These cookies do not collect information from the user’s
              computer; they typically store information in the form of a session identification
              which does not personally identify the user. We use session cookies to operate our
              service.
            </PageListItem>
            <PageListItem>
              Preference cookies: When using or browsing the website, our online services will
              remember preferences you make; this improves your experience and makes using the
              website, simpler, easier and more personal to you. We use preference cookies to
              remember your preferences and various settings.
            </PageListItem>
            <PageListItem>
              Security cookies: We use security cookies for security purposes. These cookies help to
              prevent important personal information to be revealed or shared or used by third party
              sources.
            </PageListItem>
          </PageList>

          <PageText>
            You have the ability to accept or decline cookies. Most web browsers automatically
            accept cookies but you can usually modify your browser settings to decline cookies if
            you prefer. This data from cookies is used to deliver customized content and promotions
            within the website and service portal to customers whose behaviour indicates that they
            are interested in a particular subject area. If you choose to decline cookies, you may
            not be able to fully experience the interactive features of our Site.
          </PageText>

          <PageSubHeading>
            Log Files
          </PageSubHeading>

          <PageText>
            We may collect demographic information, such as your post code, age, gender,
            preferences, interests and favourites using log files that are not associated with your
            name or other personal information. There is also information about your computer
            hardware and software that is automatically collected by us. This information can
            include: your IP address, browser type, domain names, internet service provider (ISP),
            the files viewed on our site (e.g., HTML pages, graphics, etc.), operating system,
            clickstream data, access times and referring website addresses. This information is used
            to maintain the quality of the Subscription Service, and to provide general statistics
            regarding use of the Website. For these purposes, we do link this
            automatically-collected data to Personal Information such as name, email address,
            address, and phone number.
          </PageText>

          <PageSubHeading>
            Legal basis for Processing Personal Data under the General Data Protection Regulation
            (GDPR):
          </PageSubHeading>

          <PageText>
            If you are from the European Economic Area (EEA), KeepWorks Technologies Pvt Ltd Legal
            basis for collecting and using personal information described in this Privacy Policy
            depends on the personal data we collect and the specific context in which we collect it.
            The Data Protection Act and GDPR requires us to manage personal information in
            accordance with Data Protection Principles and in particular requires us to process your
            personal information fairly and lawfully. This means you are entitled to know how we
            intend to use any information you provide. You can then decide whether you want to give
            it to us in order that we may provide the product or service that you require.
          </PageText>

          <PageSubHeading>
            On what basis will we process your personal information?
          </PageSubHeading>

          <PageText>
            The basis for processing your personal information is:
          </PageText>

          <PageList>
            <PageListItem>
              It is necessary for the performance of a contract
            </PageListItem>
            <PageListItem>
              It is necessary to comply with the mandatory legal or statutory obligations
            </PageListItem>
            <PageListItem>
              It is necessary for public interest
            </PageListItem>
            <PageListItem>
              It is necessary to protect the vital interest of you or other persons
            </PageListItem>
            <PageListItem>
              Consent, whereby you have given us permission to use the personal data.
            </PageListItem>
          </PageList>

          <PageSubHeading>
            How long will your information be stored for?
          </PageSubHeading>

          <PageText>
            We will store your personal information in a secure and protected environment for as
            long as we believe it will better help us understand how we can serve you. However, this
            will be only for a reasonable period and only for as long as is necessary. We may retain
            and use your personal information to the extent necessary to comply with our legal
            obligations.
          </PageText>

          <PageText>
            We also retain Usage data for internal analysis purposes. Usage Data is generally
            retained for a shorter period of time, except when data is used to strengthen the
            security or to improve the functionality of our service, or we are legally obliged to
            retain this data for a longer period.
          </PageText>

          <PageText>
            If in any case, we have provided a password or other such data enabling you to access
            various parts of our website, we require you to keep the password, including other login
            details confidential. We also recommend that you do not share your password and/or login
            details in any public forum or social media etc.
          </PageText>

          <PageText>
            Your information, including Personal Data, may be transferred to – and maintained on –
            computers located outside of your state, province, country or other governmental
            jurisdiction where the data protection laws may differ from those of your jurisdiction.
          </PageText>

          <PageText>
            If you are located outside India and choose to provide information to us, please note
            that we transfer the data, including Personal Data, to India or to any place in the
            world including the USA and process it there. We may also use a Cloud Distribution
            Network which might spread the data all across the world to reduce latency and the data
            may be processed by staff working for us  anywhere across the world.
          </PageText>

          <PageText>
            Your consent to this Privacy policy followed by your submission of such information
            represents your agreement to that transfer.
          </PageText>

          <PageSubHeading>
            Personal Data security
          </PageSubHeading>

          <PageText>
            We take responsibility for the security of your data very seriously. Your data will be
            held on secure servers, with all reasonable technological and operational measures put
            in place to safeguard it from unauthorised access. Where possible any identifiable
            information will be encrypted and transferred only by secure means.
          </PageText>

          <PageText>
            Our policy on “Do Not Track” signals under the California Online Protection Act
            (CalOPPA):
          </PageText>

          <PageText>
            We do not support “Do Not Track” (DNT). Do Not Track is a preference you can set in your
            web browser to inform websites that you do not want to be tracked.
          </PageText>

          <PageText>
            You can enable or disenable Do Not Track by visiting the Preference or settings page of
            your web browser
          </PageText>

          <PageSubHeading>
            Your Rights under General Data Protection Regulation (GDPR):
          </PageSubHeading>

          <PageText>
            If you are a resident of the EEA, you have certain data protection rights. KeepWorks
            Technologies Pvt Ltd. takes all necessary steps to allow you to correct, amend, delete
            or limit the use of your personal data.
          </PageText>

          <PageText>
            In certain circumstances, you have the following Data Protection Rights:
          </PageText>

          <PageList>
            <PageListItem>
              The right to be informed: We are publishing this Privacy Policy to keep you informed
              as to what we do with your personal information. We strive to be transparent about how
              we use it.
            </PageListItem>
            <PageListItem>
              The right to access: You have the right to access your information. If you wish to
              access the personal information we hold about you, you may please contact us.
            </PageListItem>
            <PageListItem>
              The right to erasure: This right is sometimes known as ‘the right to be forgotten’. If
              you want us to erase all your personal information and we do not hold a legal reason
              to continue to process and hold it, please contact us.
            </PageListItem>
            <PageListItem>
              The right to rectification: If the information we hold about you is inaccurate or
              incomplete, you have the right to ask us to rectify it. If the data has been passed to
              a third party with your consent or for legal reasons, then we must also ask them to
              rectify the data.
            </PageListItem>
            <PageListItem>
              The right to data portability: We allow you to obtain and reuse your personal data for
              your own purposes across services in a safe and secure way without this affecting the
              usability of your data. The data must be held by us by consent or for the performance
              of a contract.
            </PageListItem>
            <PageListItem>
              The right to object: Data subjects have the right to object to our processing of your
              data even if it is based on our legitimate interests.
            </PageListItem>
            <PageListItem>
              The right to withdraw consent: If you have given us your consent to process your data
              but change your mind later, you have the right to withdraw your consent at any time,
              and we will stop processing your data.
            </PageListItem>
            <PageListItem>
              The right to complain to a higher authority: Data subjects have the right to complain
              to the ICO or any other appropriate authority if they feel that we are not meeting
              their obligations in terms of GDPR or has not responded to solve a problem.
            </PageListItem>
          </PageList>

          <PageText>
            Please note that we may ask you to verify your identity before responding to such
            requests.
          </PageText>

          <PageSubHeading>
            Service Providers
          </PageSubHeading>

          <PageText>
            In certain instances, we may employ third parties to facilitate and provide services on
            our behalf. Also, they may be required to perform service related services or provide
            assistance to us in analysing how our services are used. These third parties do not have
            the obligation to use or disclose any of your Personal Data; they can only access your
            Personal Data only to perform tasks on our behalf.
          </PageText>

          <PageSubHeading>
            Analytics
          </PageSubHeading>

          <PageText>
            We may use third-party Service Providers to monitor and analyse the use of our Service.
          </PageText>

          <PageText>
            We assure you that we inform third party service providers  to adhere to these privacy
            policy and not to outsource or share or otherwise dispose off your personal data without
            our prior written approval.
          </PageText>

          <PageText>
            <strong>Google Analytics:</strong>
            <br />
            Google Analytics is a web analytics service offered by Google that tracks and reports
            website traffic. Google uses the data collected to track and monitor the use of our
            Service. This data is shared with other Google services. Google may use the collected
            data to contextualise and personalise the ads of its own advertising network.
          </PageText>

          <PageText>
            You can opt-out of having made your activity on the Service available to Google
            Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents
            the Google Analytics JavaScript (ga.js, analytics.js and dc.js) from sharing information
            with Google Analytics about visits activity.
          </PageText>

          <PageText>
            For more information on the privacy practices of Google, please visit the Google Privacy
            Terms web page:
            {' '}
            <PageLink href="https://policies.google.com/privacy?hl=en">https://policies.google.com/privacy?hl=en</PageLink>
          </PageText>

          <PageText>
            <strong>Mixpanel:</strong>
            <br />
            Mixpanel is provided by Mixpanel Inc.
          </PageText>

          <PageText>
            You can prevent Mixpanel from using your information for analytics purposes by
            opting-out. To opt-out of Mixpanel service, please visit this page:
            {' '}
            <PageLink href="https://mixpanel.com/optout/">https://mixpanel.com/optout/</PageLink>
          </PageText>

          <PageText>
            For more information on what type of information Mixpanel collects, please visit the
            Terms of Use page of Mixpanel:
            {' '}
            <PageLink href="https://mixpanel.com/terms/">https://mixpanel.com/terms/</PageLink>
          </PageText>

          <PageSubHeading>
            Payments:
          </PageSubHeading>

          <PageText>
            We use third party services for payment processing. Any information provided by you
            regarding payments or transactions will be directly routed to our third party processors
            whose use of your personal information is governed by their privacy policy. We do not
            store or collect any of your payment card details.
          </PageText>

          <PageText>
            These payment processors adhere to the standards set by PCI-DSS as managed by the PCI
            Security Standards Council, which is a joint effort of brands like Visa, MasterCard,
            American Express and Discover. PCI-DSS requirements help ensure the secure handling of
            payment information.
          </PageText>

          <PageText>
            The payment processors we work with are:
          </PageText>

          <PageText>
            <strong>RazorPay:</strong>
            <br />
            Their Privacy Policy can be viewed at
            {' '}
            <PageLink href="https://razorpay.com/privacy">https://razorpay.com/privacy</PageLink>
          </PageText>

          <PageText>
            <strong>Stripe:</strong>
            <br />
            Their Privacy Policy can be viewed at
            {' '}
            <PageLink href="https://stripe.com/us/privacy">https://stripe.com/us/privacy</PageLink>
          </PageText>

          <PageSubHeading>
            Information about children:
          </PageSubHeading>

          <PageText>
            Our services are not intended or addressed to anyone under the age of 18 years. We do
            not knowingly collect information about children (i.e. anyone under age of 18). If you
            have reason to believe that we have collected information pertaining to a child or
            anyone under the age of 18, please contact us, so that we may delete the information.
          </PageText>

          <PageText>
            Our website may contain links to other websites of interest. However, once you have used
            these links to leave our site, you should note that we do not have any control over that
            other website. Therefore, we cannot be responsible for the protection and privacy of any
            information which you provide whilst visiting such sites and such sites are not governed
            by this privacy statement. You should exercise caution and look at the privacy statement
            applicable to the website in question.
          </PageText>

          <PageText>
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page.
          </PageText>

          <PageText>
            We will let you know via email and/or a prominent notice on our Service, prior to the
            change becoming effective and update the “effective date” at the top of this Privacy
            Policy.
          </PageText>

          <PageText>
            You may choose to restrict the collection or use of your personal information in the
            following ways:
          </PageText>

          <PageList>
            <PageListItem>
              whenever you are asked to fill in a form on the website, look for the box that you can
              click to indicate that you do not want the information to be used by anybody for
              direct marketing purposes.
            </PageListItem>
            <PageListItem>
              if you have previously agreed to us using your personal information for direct
              marketing purposes, you may change your mind at any time by writing to or emailing us
              at
              {' '}
              <PageLink href="mailto:support@claycms.io">support@claycms.io</PageLink>
              .
            </PageListItem>
          </PageList>

          <PageText>
            We will not sell, distribute or lease your personal information to third parties unless
            we have your permission or are required by law to do so. We may use your personal
            information to send you promotional information about third parties which we think you
            may find interesting if you tell us that you wish this to happen.
          </PageText>

          <PageText>
            If you would like a copy of the information please write to:
            {' '}
            <PageLink href="mailto:support@claycms.io">support@claycms.io</PageLink>
          </PageText>

          <PageText>
            If you believe that any information we are holding on you is incorrect or incomplete,
            please write to or email us as soon as possible, at the above address. We will promptly
            correct any information found to be incorrect.
          </PageText>

          <PageText>
            If there are any questions regarding this Privacy Policy please write to:
            {' '}
            <PageLink href="mailto:legal@claycms.io">legal@claycms.io</PageLink>
          </PageText>
        </GridItem>
      </GridContainer>
    </Fragment>
  )
}

export default PrivacyPolicyPage
