import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import ItemBar from 'components/ItemBar'
import { Heading, NavLink, Text } from 'components/onboarding/typography'

function Header({
  heading, hint, link: { name, url }, classes
}) {
  return (
    <header className={classes.header}>
      <ItemBar>
        <Heading>
          {heading}
        </Heading>
        <nav className={classes.navigation}>
          <Text>
            {hint}
          </Text>
          <div className={classes.separator} />
          <NavLink to={url}>
            {name}
          </NavLink>
        </nav>
      </ItemBar>
    </header>
  )
}

Header.propTypes = {
  heading: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  link: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default injectSheet(({ colors, units }) => ({
  header: {
    paddingBottom: units.onboardingHeaderPaddingBottom
  },
  navigation: {
    alignItems: 'center',
    display: 'flex'
  },
  separator: {
    ...mixins.size(units.separatorWidth, 1),

    backgroundColor: colors.separatorBackground,
    marginRight: units.separatorHorizontalMargin,
    marginLeft: units.separatorHorizontalMargin
  }
}))(Header)
