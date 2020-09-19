import injectSheet from 'react-jss'
import React, { Fragment } from 'react'
import { Link, matchPath } from 'react-router-dom'

import * as mixins from 'styles/mixins'
import GridContainer from 'components/external/GridContainer'
import GridItem from 'components/external/GridItem'
import Logo from 'components/Logo'
import { NavLink } from 'components/external/typography'

function Header({ classes }) {
  const isHome = matchPath(document.location.pathname, { path: '/', exact: true })

  const navLinks = (
    <Fragment>
      <NavLink to="/login">
        Log in
      </NavLink>
      <NavLink isButton to="/signup">
        Sign up
      </NavLink>
    </Fragment>
  )

  const homeLink = (
    <Fragment>
      <Link to="/" className={`hidden-xs visible-xl ${classes.homeLink}`}>
        <Logo variant="color" />
      </Link>
      <Link to="/" className={`visible-xs hidden-xl ${classes.homeLink}`}>
        <Logo type="symbol" variant="color" />
      </Link>
    </Fragment>
  )

  return (
    <GridContainer>
      <GridItem>
        <header className={classes.header}>
          {!isHome && homeLink}
          {navLinks}
        </header>
      </GridItem>
    </GridContainer>
  )
}

export default injectSheet(({ units }) => ({
  header: {
    ...mixins.responsiveProperties({
      paddingTop: units.externalHeaderPaddingTopResponsive,
      paddingBottom: units.externalHeaderPaddingBottomResponsive
    }),

    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',

    '& > :not(:last-child)': {
      marginRight: units.externalHeaderLinksMarginRight
    },

    '& $homeLink': { // To override :not(last-child) selector priority
      marginRight: 'auto'
    }
  },
  homeLink: {
  },
  homeLink_small: {
    ...mixins.responsiveProperty('display', { xs: 'block', xl: 'none' })
  }
}))(Header)
