import injectSheet from 'react-jss'
import React from 'react'

import * as mixins from 'styles/mixins'
import GridContainer from 'components/external/GridContainer'
import GridItem from 'components/external/GridItem'
import { FooterLink, FooterText } from 'components/external/typography'

function Footer({ classes }) {
  return (
    <GridContainer>
      <GridItem>
        <footer className={classes.footerTextWrapper}>
          <div className={classes.footerLinkWrapper}>
            <FooterLink to="/terms-of-service">
              Terms of Service
            </FooterLink>
            <div className={classes.verticalDivider} />
            <FooterLink to="/privacy-policy">
              Privacy Policy
            </FooterLink>
          </div>

          <FooterText>
            &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            KeepWorks Technologies Pvt. Ltd.
          </FooterText>
        </footer>
      </GridItem>
    </GridContainer>
  )
}

export default injectSheet(({ colors, units }) => ({
  footerTextWrapper: {
    ...mixins.responsiveProperties({
      alignItems: { xs: 'center' },
      flexDirection: { xs: 'column', xl: 'row' },
      justifyContent: { xs: 'center', xl: 'space-between' },
      paddingTop: units.externalFooterPaddingTopResponsive,
      paddingBottom: units.externalFooterPaddingBottomResponsive
    }),

    display: 'flex',

    '& a': {
      ...mixins.responsiveProperty('marginRight', units.externalFooterLinksMarginRightResponsive),

      '&:last-of-type': {
        marginRight: 0
      }
    }
  },
  footerLinkWrapper: {
    ...mixins.responsiveProperty('marginBottom', units.externalFooterLinkWrapperMarginBottomResponsive),

    alignItems: 'center',
    display: 'flex'
  },
  verticalDivider: {
    ...mixins.responsiveProperty('display', { xs: 'block', xl: 'none' }),
    ...mixins.size(1, units.externalVerticalDividerHeight),

    backgroundColor: colors.externalVerticalDividerBackground,
    marginRight: units.externalVerticalDividerHorizontalMargin,
    marginLeft: units.externalVerticalDividerHorizontalMargin
  }
}))(Footer)
