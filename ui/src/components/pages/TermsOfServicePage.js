import Helmet from 'react-helmet-async'
import React, { Fragment } from 'react'

import GridContainer from 'components/external/GridContainer'
import GridItem from 'components/external/GridItem'
import {
  PageHeading,
  PageSubHeading,
  PageText
} from 'components/external/typography'

const lastUpdated = 'August 15, 2019'

function TermsOfServicePage() {
  return (
    <Fragment>
      <Helmet>
        <title>
          Terms of Service
        </title>
      </Helmet>

      <GridContainer>
        <GridItem start={3} end={15}>
          <PageHeading>
            Terms of Service
          </PageHeading>

          <PageSubHeading>
            Last Updated:
            {' '}
            {lastUpdated}
          </PageSubHeading>

          <PageText>
            These Terms of Service (“Terms”, “Terms of Service”) govern your relationship with
            https://claycms.io website (the “Service”) operated by KeepWorks Technologies Pvt Ltd
            (“us”, “we”, or “our”).
          </PageText>

          <PageText>
            Please read these Terms of Service carefully before using the Service.
          </PageText>

          <PageText>
            Your access to and use of the Service is conditioned on your acceptance of and
            compliance with these Terms. These Terms apply to all visitors, users and others who
            access or use the Service.
          </PageText>

          <PageText>
            By accessing or using the Service you agree to be bound by these Terms. If you disagree
            with any part of the terms then you may not access the Service.
          </PageText>

          <PageSubHeading>
            Subscriptions
          </PageSubHeading>

          <PageText>
            Some parts of the Service are billed on a subscription basis (“Subscription(s)”). You
            will be billed in advance on a recurring and periodic basis (“Billing Cycle”). Billing
            cycles are set either on a monthly or annual basis, depending on the type of
            subscription plan you select when purchasing a Subscription.
          </PageText>

          <PageText>
            At the end of each Billing Cycle, your Subscription will automatically renew under the
            exact same conditions unless you cancel it or KeepWorks Technologies Pvt Ltd cancels it.
            You may cancel your Subscription renewal either through your online account management
            page or by contacting KeepWorks Technologies Pvt Ltd customer support team.
          </PageText>

          <PageText>
            A valid payment method, including credit card, is required to process the payment for
            your Subscription. You shall provide KeepWorks Technologies Pvt Ltd with accurate and
            complete billing information including full name, address, state, zip code, telephone
            number, and a valid payment method information. By submitting such payment information,
            you automatically authorize KeepWorks Technologies Pvt Ltd to charge all Subscription
            fees incurred through your account to any such payment instruments.
          </PageText>

          <PageText>
            Should automatic billing fail to occur for any reason, KeepWorks Technologies Pvt Ltd
            will issue an electronic invoice indicating that you must proceed manually, within a
            certain deadline date, with the full payment corresponding to the billing period as
            indicated on the invoice.
          </PageText>

          <PageSubHeading>
            Free Trial
          </PageSubHeading>

          <PageText>
            KeepWorks Technologies Pvt Ltd may, at its sole discretion, offer a Subscription with a
            free trial for a limited period of time (“Free Trial”).
          </PageText>

          <PageText>
            You may be required to enter your billing information in order to sign up for the Free
            Trial.
          </PageText>

          <PageText>
            If you do enter your billing information when signing up for the Free Trial, you will
            not be charged by KeepWorks Technologies Pvt Ltd until the Free Trial has expired. On
            the last day of the Free Trial period, unless you cancelled your Subscription, you will
            be automatically charged the applicable Subscription fees for the type of Subscription
            you have selected.
          </PageText>

          <PageText>
            At any time and without notice, KeepWorks Technologies Pvt Ltd reserves the right to
            (i) modify the terms and conditions of the Free Trial offer, or (ii) cancel such Free
            Trial offer.
          </PageText>

          <PageSubHeading>
            Fee Changes
          </PageSubHeading>

          <PageText>
            KeepWorks Technologies Pvt Ltd, in its sole discretion and at any time, may modify the
            Subscription fees for the Subscriptions. Any Subscription fee change will become
            effective at the end of the then-current Billing Cycle.
          </PageText>

          <PageText>
            KeepWorks Technologies Pvt Ltd will provide you with a reasonable prior notice of any
            change in Subscription fees to give you an opportunity to terminate your Subscription
            before such change becomes effective.
          </PageText>

          <PageText>
            Your continued use of the Service after the Subscription fee change comes into effect
            constitutes your agreement to pay the modified Subscription fee amount.
          </PageText>

          <PageSubHeading>
            Refunds
          </PageSubHeading>

          <PageText>
            Certain refund requests for Subscriptions may be considered by KeepWorks Technologies
            Pvt Ltd on a case-by-case basis and granted in sole discretion of KeepWorks Technologies
            Pvt Ltd.
          </PageText>

          <PageSubHeading>
            Content
          </PageSubHeading>

          <PageText>
            Our Service allows you to post, link, store, share and otherwise make available certain
            information, text, graphics, videos, or other material (“Content”). You are responsible
            for the Content that you post to the Service, including its legality, reliability, and
            appropriateness.
          </PageText>

          <PageText>
            By posting Content to the Service, you grant us the right and license to use, modify,
            perform, display, reproduce, and distribute such Content on and through the Service. You
            retain any and all of your rights to any Content you submit, post or display on or
            through the Service and you are responsible for protecting those rights.
          </PageText>

          <PageText>
            You represent and warrant that: (i) the Content is yours (you own it) or you have the
            right to use it and grant us the rights and license as provided in these Terms, and (ii)
            the posting of your Content on or through the Service does not violate the privacy
            rights, publicity rights, copyrights, contract rights or any other rights of any person.
          </PageText>

          <PageSubHeading>
            Accounts
          </PageSubHeading>

          <PageText>
            When you create an account with us, you must provide us information that is accurate,
            complete, and current at all times. Failure to do so constitutes a breach of the Terms,
            which may result in immediate termination of your account on our Service.
          </PageText>

          <PageText>
            You are responsible for safeguarding the password that you use to access the Service and
            for any activities or actions under your password, whether your password is with our
            Service or a third-party service.
          </PageText>

          <PageText>
            You agree not to disclose your password to any third party. You must notify us
            immediately upon becoming aware of any breach of security or unauthorized use of your
            account.
          </PageText>

          <PageSubHeading>
            Copyright Policy
          </PageSubHeading>

          <PageText>
            We respect the intellectual property rights of others. It is our policy to respond to
            any claim that Content posted on the Service infringes the copyright or other
            intellectual property infringement (“Infringement”) of any person.
          </PageText>

          <PageText>
            If you are a copyright owner, or authorized on behalf of one, and you believe that the
            copyrighted work has been copied in a way that constitutes copyright infringement that
            is taking place through the Service, you must submit your notice in writing to the
            attention of “Copyright Infringement” of legal@claycms.io and include in your notice a
            detailed description of the alleged Infringement.
          </PageText>

          <PageText>
            You may be held accountable for damages (including costs and attorneys’ fees) for
            misrepresenting that any Content is infringing your copyright.
          </PageText>

          <PageSubHeading>
            Intellectual Property
          </PageSubHeading>

          <PageText>
            The Service and its original content (excluding Content provided by users), features and
            functionality are and will remain the exclusive property of KeepWorks Technologies Pvt
            Ltd and its licensors. The Service is protected by copyright, trademark, and other laws
            of both the India and foreign countries. Our trademarks and trade dress may not be used
            in connection with any product or service without the prior written consent of KeepWorks
            Technologies Pvt Ltd.
          </PageText>

          <PageSubHeading>
            Links To Other Web Sites
          </PageSubHeading>

          <PageText>
            Our Service may contain links to third-party web sites or services that are not owned or
            controlled by KeepWorks Technologies Pvt Ltd.
          </PageText>

          <PageText>
            KeepWorks Technologies Pvt Ltd has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third party web sites or services.
            You further acknowledge and agree that KeepWorks Technologies Pvt Ltd shall not be
            responsible or liable, directly or indirectly, for any damage or loss caused or alleged
            to be caused by or in connection with use of or reliance on any such content, goods or
            services available on or through any such web sites or services.
          </PageText>

          <PageText>
            We strongly advise you to read the terms and conditions and privacy policies of any
            third-party web sites or services that you visit.
          </PageText>

          <PageSubHeading>
            Termination
          </PageSubHeading>

          <PageText>
            We may terminate or suspend your account immediately, without prior notice or liability,
            for any reason whatsoever, including without limitation if you breach the Terms.
          </PageText>

          <PageText>
            Upon termination, your right to use the Service will immediately cease. If you wish to
            terminate your account, you may simply discontinue using the Service.
          </PageText>

          <PageSubHeading>
            Limitation Of Liability
          </PageSubHeading>

          <PageText>
            In no event shall KeepWorks Technologies Pvt Ltd, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any indirect, incidental,
            special, consequential or punitive damages, including without limitation, loss of
            profits, data, use, goodwill, or other intangible losses, resulting from (i) your access
            to or use of or inability to access or use the Service; (ii) any conduct or content of
            any third party on the Service; (iii) any content obtained from the Service; and (iv)
            unauthorized access, use or alteration of your transmissions or content, whether based
            on warranty, contract, tort (including negligence) or any other legal theory, whether or
            not we have been informed of the possibility of such damage, and even if a remedy set
            forth herein is found to have failed of its essential purpose.
          </PageText>

          <PageSubHeading>
            Disclaimer
          </PageSubHeading>

          <PageText>
            Your use of the Service is at your sole risk. The Service is provided on an “AS IS” and
            “AS AVAILABLE” basis. The Service is provided without warranties of any kind, whether
            express or implied, including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, non-infringement or course of
            performance.
          </PageText>

          <PageText>
            KeepWorks Technologies Pvt Ltd its subsidiaries, affiliates, and its licensors do not
            warrant that a) the Service will function uninterrupted, secure or available at any
            particular time or location; b) any errors or defects will be corrected; c) the Service
            is free of viruses or other harmful components; or d) the results of using the Service
            will meet your requirements.
          </PageText>

          <PageSubHeading>
            Governing Law
          </PageSubHeading>

          <PageText>
            These Terms shall be governed and construed in accordance with the laws of Karnataka,
            India, without regard to its conflict of law provisions.
          </PageText>

          <PageText>
            Our failure to enforce any right or provision of these Terms will not be considered a
            waiver of those rights. If any provision of these Terms is held to be invalid or
            unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            These Terms constitute the entire agreement between us regarding our Service, and
            supersede and replace any prior agreements we might have between us regarding the
            Service.
          </PageText>

          <PageSubHeading>
            Changes
          </PageSubHeading>

          <PageText>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any
            time. If a revision is material we will try to provide at least 30 days notice prior to
            any new terms taking effect. What constitutes a material change will be determined at
            our sole discretion.
          </PageText>

          <PageText>
            By continuing to access or use our Service after those revisions become effective, you
            agree to be bound by the revised terms. If you do not agree to the new terms, please
            stop using the Service.
          </PageText>

          <PageSubHeading>
            Contact Us
          </PageSubHeading>

          <PageText>
            If you have any questions about these Terms, please contact us.
          </PageText>
        </GridItem>
      </GridContainer>
    </Fragment>
  )
}

export default TermsOfServicePage
