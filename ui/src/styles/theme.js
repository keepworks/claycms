import * as mixins from 'styles/mixins'

const fonts = {
  poppinsExtralight: {
    fontFamily: 'Poppins, Arial, sans-serif',
    fontWeight: 200
  },
  poppinsLight: {
    fontFamily: 'Poppins, Arial, sans-serif',
    fontWeight: 300
  },
  poppinsRegular: {
    fontFamily: 'Poppins, Arial, sans-serif',
    fontWeight: 400
  },
  poppinsMedium: {
    fontFamily: 'Poppins, Arial, sans-serif',
    fontWeight: 500
  },
  poppinsSemibold: {
    fontFamily: 'Poppins, Arial, sans-serif',
    fontWeight: 600
  },
  poppinsBold: {
    fontFamily: 'Poppins, Arial, sans-serif',
    fontWeight: 700
  },
  robotoBold: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeight: 700
  },
  robotoBlack: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeight: 900
  }
}

const theme = {
  fonts,

  colors: {
    alert_failure: '#fd8376',
    alert_success: '#6cf1ba',
    alertBackground: '#3d3e45',
    alertText: '#fff',

    assetBoxBackground: '#fcfcff',

    badgeBackground_primary: '#fd8376',
    badgeText_primary: '#fff',

    baseModalBackground: '#fff',
    baseModalOverlayBackground: 'rgba(255, 255, 255, 0.43)',

    baseSliderHandleBackground: '#fff',
    baseSliderHandleBorder: '#ffcec9',
    baseSliderRailBackground: '#e5e5ee',
    baseSliderTrackBackground: '#e5e5ee',

    buttonBackground_flat: '#fcfcff',
    buttonBorder_flat: '#e5e5ee',
    button_flatHover: '',

    buttonGroupInputBackground: '#fcfcff',
    buttonGroupInputBorder: '#e5e5ee',
    buttonGroupInputBorder_active: '#ffcec9',
    buttonGroupInputBorderRight: '#ececf2',

    cardBackground: '#fff',

    checkboxBackground: '#f3f3f9',
    checkboxBackground_checked: '#6abbed',
    checkboxBorder: '#e8e8f1',
    checkboxTick: '#fff',

    circleBackground_dark: '#fafafd',

    closeIcon: '#a1a4b8',

    codeBackground: '#f7f7fa',

    colorSwatchBorder: '#e5e5ee',

    columnBorder: '#f3f3f9',

    colorTileDefaultBackground: '#fff',
    colorTileBoxShadow: '0px 4px 6px 0px rgba(10, 25, 39, 0.08)',

    containedButtonBackground: '#fcfcff',
    containedButtonBackground_hover: '#fcfcff',
    containedButtonBorder_active: '#ffcec9',
    containedButtonBorder: '#e5e5ee',

    dataTableBoxCellBorderRight: '#f3f3f9',

    dataTableBoxCellBackground: '#fcfcff',

    dataTableBorderedCellBorderBackground: '#f3f3f9',

    dataTableHeaderBackground: '#fcfcff',
    dataTableRow_selected: '#ffcec9',
    dataTableRowBackground: '#fff',

    dateRangePickerDateHoverBackground: '#ffcec9',
    dateRangePickerFirstAndLastWeekBackground: '#f7f7fa',
    dateRangePickerMonthNav: '#a1a4b8',
    dateRangePickerOutsideDate: '#a1a4b8',
    dateRangePickerSelectedRangeBackground: '#ffcec9',
    dateRangePickerSelectedRangeExtremeDate: '#fff',
    dateRangePickerSelectedRangeExtremeDateBackground: 'linear-gradient(#7dead9, #6abbed)',
    dateRangePickerWeekHeaderBorder: '#f3f3f9',
    dateRangePickerWrapperBackground: '#fff',

    dataTileBackground: '#fff',

    dialogCircleBackground: '#fafafd',

    emptyWrapperBackground: '#f5f5f8',
    emptyWrapperBorder: '#ececf2',
    emptyWrapperCircleBackground: '#f2f2f6',

    externalBackground: '#fff',

    externalButtonBackground: '#fff',
    externalButtonBackground_disabled: '#ffc3bc',

    externalFieldErrorBackground: '#ffdbd7',

    externalInputBackground: '#6abbed',
    externalInputPlaceholder: '#fff',
    externalInputText: '#fff',

    externalListItemBulletColor: '#fd8376',

    externalVerticalDividerBackground: '#ededee',

    fieldErrorBackground: 'rgba(253, 131, 118, 0.2)',

    headerItemBackground_hover: 'rgba(255, 255, 255, 0.129)',
    headerItemBorder: 'rgba(255, 255, 255, 0.1)',

    hintBoxBackground_dark: '#f5f5f8',
    hintBoxBackground_light: '#fbfbfc',
    hintBoxBorder_alert: '#fedad6',
    hintBoxBorder: '#ececf2',

    iconButtonBackground: '#fff',

    iconLink: '#fe8577',

    imageTileBackground: '#fff',

    imageDropInputModifierIconColor: '#a1a4b8',

    inputBorder: '#e5e5ee',
    inputBorder_hover: '#6abbed',
    inputIcon: '#a1a4b8',
    inputIcon_active: '#6abbed',
    inputPlaceholder: '#a1a4b8',
    inputText: '#26272d',

    internalBackground: '#f3f3f9',

    internalBoxBackground: '#f5f5f8',
    internalBoxBorder: '#ececf2',

    internalCardBackground: '#fff',

    internalDividerBackground: '#ececf2',

    menuBackground: '#fff',

    menuDividerBackground: '#ececf2',
    menuSectionBackground: '#fcfcff',
    menuSectionBorder: '#e8e8f1',

    menuLinkBackground_action: '#efeff4',

    menuLink_hover: '#fcfcff',

    modalBackground: '#f7f7fa',

    panelBackground: '#fff',
    panelHeaderBottomBorder: '#e8e8f1',
    panelHeaderBackgroundColor: '#fcfcff',
    panelHeaderIcon: '#6abbed',

    panelTableBorder: '#f3f3f9',
    panelTableCellBadgeBackground: 'rgb(254, 218, 214, 0.2)',
    panelTableCellBadgeColor: '#ff9388',
    panelTableSecondaryText: '#a1a4b8',

    profilePictureBackground: '#fff',
    profilePictureBackground_inverted: '#6abbed',
    profilePictureBackground_empty: '#dcdde6',
    profilePictureBorder: '#fff',

    radioInputBulletBackground: '#efeff4',
    radioInputBulletBackground_active: '#fff',
    radioInputBulletBorder_active: '#fd8376',

    separatorBackground: 'rgba(255, 255, 255, 0.3)',

    sidebarBreadcrumbItemBorder: '#ececf2',

    sidebarItemBackground_active: '#fff',

    sidePaneBackground: '#f7f7fa',

    sidePaneHeaderArrow: '#c0f5ff',

    switchInputBackground: '#efeff4',
    switchInputBackground_active: '#fe8577',
    switchInputBackground_disabled: '#efefef',
    switchInputBorder: '#e8e8f1',
    switchInputKnobBackground: '#fff',
    switchInputKnobBackground_active: '#fcfcff',
    switchInputLabel: '#a1a4b8',

    tab: '#a1a4b8',
    tabDividerBackground: '#ececf2',
    tab_hover: '#26272d',
    tab_selected: '#26272d',
    tabUnderline: '#ececf2',
    tabUnderline_selected: '#26272d',
    tabLink_hover: '#26272d',
    tabLink_active: '#26272d',

    tag: '#6abbed',
    tagBackground: '#b1fff3',
    tagRemoveBackground: '#ff8b7b',

    text_primary: '#6abbed',
    text_pale: '#a1a4b8',
    text_light: '#fff',
    text_dark: '#26272d',
    text_darkDisabled: 'rgba(38, 39, 45, 0.1)', // rgba version of text_dark with alpha set to 0.1
    text_darker: '#3d3e45',
    text_error: '#f25c5d',

    tooltipBackground: '#3d3e45',

    uploadInputBackground: '#fafafa',
    uploadInputBorder: '#eeeeee'
  },

  gradients: {
    button: 'linear-gradient(90deg, #6abbed, #7dead9)',
    externalHeroBackground: 'linear-gradient(315deg, #7dead9, #6abbed)',
    internalHeader: 'linear-gradient(90deg, #6abbed, #7dead9)',
    onboardingBackground: 'linear-gradient(-45deg, #6abbed, #7dead9)',
    sidePaneHeader: 'linear-gradient(90deg, #6abbed, #7dead9)'
  },

  shadows: {
    alert: '0px 29px 50px 0px rgba(10, 25, 39, 0.16)',
    assetBox: '0px 1px 2px 0px rgba(10, 25, 39, 0.1)',
    assetBox_hover: '0px 10px 20px 0px rgba(10, 25, 39, 0.07)',
    baseSliderHandle: '0px 4px 6px 0px rgba(10, 25, 39, 0.08)',
    button_color: '0px 10px 13px 0px rgba(10, 25, 39, 0.13)',
    button_colorHover: '0px 10px 13px 0px rgba(10, 25, 39, 0.18)',
    button_flatHover: '0px 10px 13px 0px rgba(10, 25, 39, 0.08)',
    buttonGroupInput_active: '0px 10px 13px 0px rgba(10, 25, 39, 0.09)',
    card: '0px 10px 20px 0px rgba(10, 25, 39, 0.04)',
    panel: '0px 1px 2px 0px rgba(10, 25, 39, 0.06)',
    dataTableRow: '0px 1px 2px 0px rgba(10, 25, 39, 0.06)',
    dataTableRow_hover: '0px 10px 20px 0px rgba(10, 25, 39, 0.04)',
    dataTile: '0px 1px 2px 0px rgba(10, 25, 39, 0.06)',
    dataTile_hover: '0px 10px 20px 0px rgba(10, 25, 39, 0.04)',
    dialog: '0px 29px 50px 0px rgba(10, 25, 39, 0.09)',
    externalButton: '0px 12px 38px 0px rgba(137, 3, 0, 0.15)',
    iconButton: '0px 2px 4px 0px 0px rgba(10, 25, 39, 0.05)',
    iconButton_heavy: '0px 10px 13px 0px rgba(10, 25, 39, 0.13)',
    iconButton_hover: '0px 2px 4px 0px rgba(10, 25, 39, 0.18)',
    imageTile: '0px 1px 2px 0px rgba(10, 25, 39, 0.06)',
    imageTile_hover: '0px 10px 20px 0px rgba(10, 25, 39, 0.04)',
    internalCard: '0px 1px 2px 0px rgba(10, 25, 39, 0.06)',
    internalHeader: '0px 13px 29px 0px rgba(10, 25, 39, 0.13)',
    internalLayout: '0px 1px 2px 0px rgba(10, 25, 39, 0.06)',
    internalLayout_hover: '0px 10px 20px 0px rgba(10, 25, 39, 0.04)',
    menu: '0px 13px 29px 0px rgba(10, 25, 39, 0.13)',
    profilePicture: '0px 13px 29px rgba(10, 25, 39, 0.13)',
    sidebarItem_active: '0px 10px 20px 0px rgba(10, 25, 39, 0.08)',
    sidePane: '0px 29px 50px 0px rgba(10, 25, 39, 0.13)',
    sidePaneHeader: '0px 13px 29px 0px rgba(10, 25, 39, 0.13)',
    switchInputKnob: '0px 4px 6px 0px rgba(10, 25, 39, 0.08)',
    tab_selected: '0px 2px 7px 0px rgba(10, 25, 39, 0.2)',
    tabLink_active: '0px 2px 7px 0px rgba(10, 25, 39, 0.2)',
    tooltip: '0px 9px 13px 0px rgba(10, 25, 39, 0.13)'
  },

  typography: {
    lightSmall: {
      ...fonts.poppinsLight,

      fontSize: 12,
      letterSpacing: '-0.025em',
      lineHeight: 1.6
    },
    light: {
      ...fonts.poppinsLight,

      fontSize: 13,
      letterSpacing: '-0.025em',
      lineHeight: 1.2
    },
    lightSquished: {
      ...fonts.poppinsLight,

      fontSize: 14,
      letterSpacing: '-0.025em',
      lineHeight: 1.3
    },
    lightSpaced: {
      ...fonts.poppinsLight,

      fontSize: 14,
      letterSpacing: '-0.025em',
      lineHeight: 2
    },
    lightMedium: {
      ...fonts.poppinsLight,

      fontSize: 16,
      letterSpacing: '-0.01em',
      lineHeight: 2
    },
    lightMediumResponsive: {
      ...fonts.poppinsLight,
      ...mixins.responsiveProperty('fontSize', { xs: 18, xl: 16 }),

      letterSpacing: '-0.01em',
      lineHeight: 2
    },
    lightLarge: {
      ...fonts.poppinsLight,

      fontSize: 22,
      letterSpacing: '-0.01em',
      lineHeight: 1
    },
    lightExtraLarge: {
      ...fonts.poppinsLight,

      fontSize: 36,
      letterSpacing: '-0.025em',
      lineHeight: 1
    },
    lightExtraLargeSquished: {
      ...fonts.poppinsLight,

      fontSize: 32,
      letterSpacing: '-0.025em',
      lineHeight: 1
    },
    regularSmallCompact: {
      ...fonts.poppinsRegular,

      fontSize: 10,
      letterSpacing: '0.01em',
      lineHeight: 1
    },
    regularSmall: {
      ...fonts.poppinsRegular,

      fontSize: 10,
      lineHeight: 1
    },
    regularSmallSpaced: {
      ...fonts.poppinsRegular,

      fontSize: 12,
      letterSpacing: '0.01em',
      lineHeight: 1
    },
    regularSmallSquished: {
      ...fonts.poppinsRegular,

      fontSize: 12,
      letterSpacing: '-0.01em',
      lineHeight: 1
    },
    regularSmallSpacedSquished: {
      ...fonts.poppinsRegular,

      fontSize: 12,
      letterSpacing: '-0.025em',
      lineHeight: 1
    },
    regularSmallSquishedResponsive: {
      ...fonts.poppinsRegular,
      ...mixins.responsiveProperty('fontSize', { xs: 16, xl: 12 }),

      letterSpacing: '-0.01em',
      lineHeight: 1
    },
    regular: {
      ...fonts.poppinsRegular,

      fontSize: 13,
      letterSpacing: '0.01em',
      lineHeight: 1.2
    },
    regularSpaced: {
      ...fonts.poppinsRegular,

      fontSize: 14,
      letterSpacing: '-0.025em',
      lineHeight: 1.857
    },
    regularSquished: {
      ...fonts.poppinsRegular,

      fontSize: 14,
      letterSpacing: '-0.025em',
      lineHeight: 1.3
    },
    regularSquishedResponsive: {
      ...fonts.poppinsRegular,
      ...mixins.responsiveProperty('fontSize', { xs: 16, xl: 14 }),

      letterSpacing: '-0.025em',
      lineHeight: 1.3
    },
    regularMedium: {
      ...fonts.poppinsRegular,

      fontSize: 16,
      letterSpacing: '-0.025em',
      lineHeight: 1.75
    },
    regularMediumResponsive: {
      ...fonts.poppinsRegular,
      ...mixins.responsiveProperty('fontSize', { xs: 18, xl: 16 }),

      letterSpacing: '-0.025em',
      lineHeight: 1.75
    },
    regularMediumSquished: {
      ...fonts.poppinsRegular,

      fontSize: 16,
      letterSpacing: '-0.025em',
      lineHeight: 1
    },
    regularLarge: {
      ...fonts.poppinsExtralight,

      fontSize: 52,
      letterSpacing: '-0.025em',
      lineHeight: 1.385
    },
    medium: {
      ...fonts.poppinsMedium,

      fontSize: 16,
      letterSpacing: '-0.01em',
      lineHeight: 2
    },
    mediumSmall: {
      ...fonts.poppinsMedium,

      fontSize: 14,
      letterSpacing: '-0.01em',
      lineHeight: 2
    },
    mediumSquished: {
      ...fonts.poppinsMedium,

      fontSize: 12,
      letterSpacing: '-0.025em',
      lineHeight: 1
    },
    semiboldExtraSmall: {
      ...fonts.poppinsSemibold,

      fontSize: 13,
      letterSpacing: '0.01em',
      lineHeight: 1.2
    },
    semiboldExtraSmallSquished: {
      ...fonts.poppinsSemibold,

      fontSize: 12,
      letterSpacing: '-0.025em',
      lineHeight: 1
    },
    semiboldExtraSmallSpaced: {
      ...fonts.poppinsSemibold,

      fontSize: 13,
      letterSpacing: '0.05em',
      lineHeight: 1
    },
    semiboldSmallSquished: {
      ...fonts.poppinsSemibold,

      fontSize: 14,
      letterSpacing: '-0.025em',
      lineHeight: 1
    },
    semiboldSmallSpaced: {
      ...fonts.poppinsSemibold,

      fontSize: 15,
      letterSpacing: '0.01em',
      lineHeight: 1
    },
    semiboldSmall: {
      ...fonts.poppinsSemibold,

      fontSize: 14,
      lineHeight: 1.2
    },
    semiboldSmallResponsive: {
      ...fonts.poppinsSemibold,
      ...mixins.responsiveProperty('fontSize', { xs: 16, xl: 14 }),

      lineHeight: 1.2
    },
    semiboldSquished: {
      ...fonts.poppinsSemibold,

      fontSize: 22,
      letterSpacing: '-0.025em',
      lineHeight: 1.2
    },
    semiboldSquishedResponsive: {
      ...fonts.poppinsSemibold,
      ...mixins.responsiveProperty('fontSize', { xs: 18, xl: 16 }),

      letterSpacing: '-0.01em',
      lineHeight: 1
    },
    semibold: {
      ...fonts.poppinsSemibold,

      fontSize: 17,
      letterSpacing: '-0.025em',
      lineHeight: 1.2
    },
    semiboldMedium: {
      ...fonts.poppinsSemibold,

      fontSize: 20,
      letterSpacing: '-0.025em',
      lineHeight: 1.3
    },
    semiboldLarge: {
      ...fonts.poppinsSemibold,

      fontSize: 26,
      letterSpacing: '-0.025em',
      lineHeight: 1.3
    },
    semiboldLargeSquished: {
      ...fonts.poppinsSemibold,

      fontSize: 32,
      letterSpacing: '-0.025em',
      lineHeight: 1
    },
    semiboldExtraLarge: {
      ...fonts.poppinsSemibold,

      fontSize: 36,
      letterSpacing: '-0.025em',
      lineHeight: 1.1
    },
    bold: {
      ...fonts.poppinsBold,

      fontSize: 13,
      letterSpacing: '0.05em',
      lineHeight: 1.2
    },
    boldSquished: {
      ...fonts.poppinsBold,

      fontSize: 13,
      letterSpacing: '-0.025em',
      lineHeight: 1.2
    },
    boldMedium: {
      ...fonts.poppinsBold,

      fontSize: 16,
      letterSpacing: '-0.025em',
      lineHeight: 1.2
    },
    boldLargeResponsive: {
      ...fonts.poppinsBold,
      ...mixins.responsiveProperty('fontSize', { xs: 34, xl: 36 }),

      letterSpacing: '-0.01em',
      lineHeight: 1.278
    },
    boldExtraLargeResponsive: {
      ...fonts.poppinsBold,
      ...mixins.responsiveProperty('fontSize', { xs: 40, xl: 48 }),

      letterSpacing: '-0.01em',
      lineHeight: 1.354
    },
    robotoBold: {
      ...fonts.robotoBold,

      fontSize: 12,
      lineHeight: 1
    },
    robotoBoldSpaced: {
      ...fonts.robotoBold,

      fontSize: 11,
      letterSpacing: '0.05em',
      lineHeight: 1
    },
    blackLarge: {
      ...fonts.robotoBlack,

      fontSize: 36,
      letterSpacing: '-0.01em',
      lineHeight: 1.27
    }
  },

  units: {
    alertBorderRadius: 4,
    alertHeaderPaddingBottom: 25,
    alertIconMargin: 10,
    alertPositionRight: 20,
    alertPositionBottom: 20,
    alertVerticalPadding: 30,
    alertHorizontalPadding: 40,
    alertWidth: { xs: 350, xl: 488 },

    assetBoxMarginBottom: 20,
    assetBoxMarginRight: 20,
    assetBoxPadding: 25,

    assetBoxActionMarginRight: 15,

    assetBoxNamePaddingTop: 50,
    assetBoxNamePaddingBottom: 10,

    buttonBorderRadius: 4,
    buttonHeight_large: 50,
    buttonHeight_normal: 50,
    buttonHeight_small: 40,
    buttonHeight_tiny: 25,
    buttonHorizontalPadding_normal: 30,
    buttonHorizontalPadding_small: 20,
    buttonHorizontalPadding_tiny: 10,
    buttonMarginRight: 10,
    buttonMinWidth_large: 210,
    buttonMinWidth_normal: 155,
    buttonMinWidth_small: 106,
    buttonMinWidth_tiny: 60,

    buttonGroupInputHeight_small: 40,
    buttonGroupInputHeight_normal: 40,
    buttonGroupInputHeight_large: 50,
    buttonGroupInputMinWidth_small: 40,
    buttonGroupInputMinWidth_normal: 70,
    buttonGroupInputMinWidth_large: 100,
    buttonGroupInputPadding_small: 12,
    buttonGroupInputPaddingHorizontal_normal: 30,
    buttonGroupInputPaddingVertical_normal: 15,
    buttonGroupInputPadding_large: 20,
    buttonGroupInputBorderRadius: 4,
    buttonGroupInputBorderWidth: 1,
    buttonInputGroupMarginRight: 35,

    buttonInputGroupLabelMarginRight: 10,

    buttonInputGroupIconMarginRight: 10,

    cardBorderRadius: 4,
    cardVerticalPadding: 30,
    cardHorizontalPadding: 50,
    cardWidth: 400,

    cardHeadingSpacing: 30,
    cardTextSpacing: 20,

    cardFootnotePaddingTop: 25,

    checkboxTickFontSize: 12,
    checkboxBorderRadius: 4,
    checkboxBorderWidth: 1,
    checkboxHorizontalMargin: 10,
    checkboxHorizontalPadding: 10,
    checkboxSize: 15,
    checkboxVerticalPadding: 5,

    codeBorderRadius: 2,
    codeHorizontalPadding: 24,
    codeVerticalPadding: 12,

    colorPickerInputPopoverZindex: 2,
    colorPickerInputPopoverTop: 0,
    colorPickerInputPopoverLeft: 130,

    colorTileMargin: 10,
    colorTileBorderRadius: 5,
    colorTileColorHeight: 20,
    colorTileColorWidth: 35,

    columnPaddingHorizontal: 15,

    containerHorizontalPadding: 15,
    containerWidth: 900,

    dataTableCellBorderHeight: 50,
    dataTableCellPadding: 25,

    dataTableCheckboxBorderRadius: 4,
    dataTableCheckboxBorderWidth: 1,
    dataTableCheckboxSize: 24,
    dataTableCheckboxSize_compact: 18,
    dataTableCheckboxWrapperHorizontalPadding: 20,

    dataTableDragHandleHorizontalPadding: 20,

    dataTableHeaderHeight: 50,

    dataTableRowActionPaddingBottom: 16,
    dataTableRowActionPaddingRight: 25,
    dataTableRowActionPaddingTop: 16,

    dataTableRowBorderRadius: 4,
    dataTableRowHeight: 90,
    dataTableRowHeight_compact: 60,
    dataTableRowMarginBottom: 20,
    dataTableRowMarginBottom_compact: 2,

    dataTileBorderRadius: 4,
    dataTileHeight: 80,
    dataTileHorizontalPadding: 50,

    dataTileCircleShiftLeft: 20,
    dataTileCircleShiftLeft_large: -18,
    dataTileCircleShiftTop_large: -14,
    dataTileCircleSize: 10,
    dataTileCircleSize_large: 66,

    dataTilesColumnGap: '30px',
    dataTilesRowGap: '30px',

    dialogBorderRadius: 4,
    dialogHeaderPaddingBottom: 20,
    dialogMarginTop: 50,
    dialogPadding: 50,
    dialogWidth: 443,

    dialogCircleShiftBottom_small: -200,
    dialogCircleShiftLeft_small: -65,
    dialogCircleShiftRight_small: -100,
    dialogCircleShiftTop_small: -85,
    dialogCircleSize_large: 320,
    dialogCircleSize_small: 198,

    dialogDescriptionMarginBottom: 40,

    drawerGroupIconMarginHorizontal: 20,

    externalButtonBorderRadius: 4,
    externalButtonHeight: 48,
    externalButtonHorizontalPadding: 35,
    externalButtonMarginTopResponsive: { xs: -20, xl: 0 },
    externalButtonMarginLeftResponsive: { xs: 150, xl: -50 },
    externalButtonWidth: 123,

    externalFieldErrorArrowShiftHorizontal: 40,
    externalFieldErrorArrowShiftVertical: 2,
    externalFieldErrorArrowSize: 11,
    externalFieldErrorHorizontalPadding: 25,
    externalFieldErrorShiftLeft: 20,
    externalFieldErrorShiftTop: -20,
    externalFieldErrorVerticalPadding: 15,

    externalFooterLinksMarginRightResponsive: { xs: 0, xl: 30 },

    externalFooterLinkWrapperMarginBottomResponsive: { xs: 30, xl: 0 },

    externalFooterPaddingBottomResponsive: { xs: 40 },
    externalFooterPaddingTopResponsive: { xs: 100, xl: 150 },

    externalFooterWrapperPaddingTop: 100,

    externalGridContainerMaxWidthResponsive: {
      xs: 'none',
      md: 750,
      lg: 970,
      xl: 1180
    },

    externalHeaderPaddingTopResponsive: { xs: 30, lg: 30, xl: '3vw' },
    externalHeaderPaddingBottomResponsive: { xs: 80, lg: 80, xl: '7vw' },

    externalHeaderLinksMarginRight: 40,

    externalHeadingMarginTopResponsive: { xs: 35, lg: 85 },
    externalHeadingWidthResponsive: { xs: 'auto', lg: 650 },

    externalHeroHeight: 600,

    externalInputBorderRadius: 4,
    externalInputHeight: 84,
    externalInputPaddingLeft: 40,
    externalInputPaddingRight: 60,
    externalInputWidth: 350,

    externalListItemBulletSize: 9,
    externalListItemPaddingLeft: 15,

    externalNavLinkHorizontalPadding_button: 35,

    externalParagraphMarginTop: 30,

    externalPageCircleShiftBottomResponsive: { xs: -100, xl: -330 },
    externalPageCircleShiftLeftResponsive: { xs: -50, xl: -100 },
    externalPageCircleSizeResponsive: { xs: 350, xl: 700 },

    externalPageHeadingMarginBottomResponsive: { xs: 70, xl: 80 },
    externalPageHeadingMarginTopResponsive: { xs: 35 },

    externalTextLinkMarginTop: 50,

    externalTextMarginTop: 50,

    externalVerticalDividerHeight: 32,
    externalVerticalDividerHorizontalMargin: 30,

    fieldErrorVerticalPadding: 5,
    fieldErrorHorizontalPadding: 10,

    fieldHintPaddingLeft: 25,
    fieldHintTop: 6,

    headerItemContentMarginTop: 10,

    headerItemHorizonalPadding: 25,
    headerItemWidth: 190,
    headerItemWidth_wide: 225,

    headerMenuVerticalOffset: 4,

    iconButtonSize_tiny: 36,
    iconButtonSize_small: 55,

    iconLinkIconMarginLeft: 7,

    imageTileBorderRadius: 4,
    imageTileInnerPadding: 35,

    inputBorderMarginHorizontal_focus: -15,

    inputMargin: 20,
    inputMargin_spaced: 35,
    inputPaddingBottom: 15,
    inputPaddingTop: 25,
    inputHorizontalPadding: 30,

    internalContainerHorizontalPadding: 15,

    hintBoxBorderRadius: 4,
    hintBoxVerticalPadding: 20,
    hintBoxPaddingRight: 50,
    hintBoxPaddingLeft: 25,

    hintIconMarginRight: 10,

    internalBoxBorderRadius: 4,
    internalBoxPaddingVertical: 50,

    internalCardHorizontalPadding: 50,

    internalContentPaddingBottom_fluid: 20,
    internalContentPaddingBottom: 50,
    internalContentPaddingHorizontal_fluid: 20,
    internalContentPaddingLeft: 40,
    internalContentPaddingRight: 70,
    internalContentPaddingTop: 150,

    internalDescriptionMaxWidth: 335,

    internalHeaderBorderRadius: 4,
    internalHeaderHeight: 68,
    internalHeaderRight: 20,
    internalHeaderTop: 20,

    internalLayoutMinWidth: 1200,

    internalLayoutBoxNumberHeight: 80,

    internalSubTitleMarginVertical: 50,

    keyLabelPaddingBottom: 10,

    emptyWrapperBorderRadius: 4,
    emptyWrapperHeight: 425,

    emptyWrapperCircleShiftLeft_medium: -70,
    emptyWrapperCircleShiftRight_large: 110,
    emptyWrapperCircleShiftRight_small: 55,
    emptyWrapperCircleShiftTop_large: 275,
    emptyWrapperCircleShiftTop_medium: -150,
    emptyWrapperCircleShiftTop_small: -85,
    emptyWrapperCircleSize_large: 629,
    emptyWrapperCircleSize_medium: 315,
    emptyWrapperCircleSize_small: 149,

    iconButtonHorizontalMargin: 5,

    loaderImageMarginBottom: 15,

    loaderTextMarginBottom: 45,

    loaderTitleMarginBottom: 30,
    loaderTitleMarginTop: 25,

    menuBodyMaxHeight: 300,

    menuBorderRadius: 4,
    menuVerticalPadding: 10,

    menuDividerVerticalMargin: 10,
    menuFooterHeight: 45,

    menuHeadingHorizontalPadding: 5,
    menuHeadingVerticalPadding: 10,

    menuLinkHorizontalPadding: 25,
    menuLinkVerticalPadding: 10,

    menuSearchHeaderHeight: 40,

    modalCloseButtonPositionTop: 40,
    modalCloseButtonPositionRight: 40,

    modalHorizontalPadding: 245,
    modalVerticalPadding: 120,

    onboardingContentHeight: 490,
    onboardingContentWidth: 400,
    onboardingContentVerticalPadding: 20,

    onboardingHeaderPaddingBottom: 60,

    pageTitleMarginBottom: 40,
    pageTitleMarginRight: 25,

    panelBodyHorizontalPadding: 50,
    panelBodyVerticalPadding: 30,

    panelContainerWidth: 700,

    panelDetailsMarginBottom: 35,

    panelBorderRadius: 4,
    panelMarginTop: 30,

    panelHeaderHorizontalPadding: 50,
    panelHeaderIconWrapperMarginRight: 10,
    panelHeaderVerticalPadding: 25,

    panelHeadingMarginBottom: 30,

    panelSubHeadingMarginBottom: 20,

    panelTableBorderWidth: 1,
    panelTableMarginBottom: 20,

    panelTableCellBadgeBorderRadius: 10,
    panelTableCellBadgeHeight: 20,
    panelTableCellBadgeHorizontalPadding: 10,
    panelTableCellBadgeVerticalPadding: 5,
    panelTableCellHeight: 40,
    panelTableCellMarginLeft: 20,
    panelTableCellSideContentMinWidth: 130,
    panelTableCellSideContentPaddingLeft: 10,
    panelTableCellSubtitleMarginTop: 15,
    panelTableCellSubtitleMarginRight: 10,
    panelTableCellSubtitleWidth: 250,
    panelTableCellVerticalPadding: 18,
    panelTableColumnMarginRight: 60,
    panelTableColumnPaddingRight: 60,

    profilePictureBorderWidth: 2,
    profilePictureSize_tiny: 32,
    profilePictureSize_small: 48,
    profilePictureSize_large: 200,

    separatorHorizontalMargin: 15,
    separatorWidth: 20,

    radioInputBulletBorderWidth_active: 7,
    radioInputLabelMarginBottom: 20,
    radioInputOptionMarginBottom_regular: 16,
    radioInputOptionMarginBottom_small: 10,
    radioInputOptionPaddingLeft: 35,
    radioInputOptionMarginLeft_small: 10,

    roleHintsMarginBottom: -20,
    roleHintsMarginTop: 10,

    roleHintMinHeight: 40,
    roleHintPaddingLeft: 25,

    rowMarginHorizontal: -15,

    sidebarWidth: 220,

    sidebarBreadcrumbIconPaddingRight: 15,

    sidebarBreadcrumbPaddingVertical: 20,

    sidebarBreadcrumbTextWrapperMarginTop: 15,

    sidebarBreadcrumbItemMarginHorizontal: 16,
    sidebarBreadcrumbItemMarginVertical: -12,
    sidebarBreadcrumbItemPaddingVertical: 20,

    sidebarHeaderPaddingTop: 35,
    sidebarHeaderPaddingBottom: 25,

    sidebarHorizontalPadding: 20,

    sidebarItemIconMarginRight: 15,
    sidebarItemIconSize: 36,

    sidebarItemPaddingHorizontal: 40,
    sidebarItemPaddingVertical: 4,

    sidePaneWidth: 550,

    sidePaneBodyPadding: 50,

    sidePaneButtonMargin: -20,

    sidePaneHeaderArrowLeft: 20,
    sidePaneHeaderArrowTop: 55,
    sidePaneHeaderPadding: 50,

    sidePaneHintMaxWidth: 380,

    sidePaneTitleMarginBottom: 20,

    sortAndFilterInputWidth: 150,
    sortAndFilterMenuItemHorizontalPadding: 10,

    switchInputBorderWidth: 1,
    switchInputKnobSize: 20,
    switchInputLabelHorizontalMargin: 10,
    switchInputWidth: 36,

    tabPadding: 15,
    tabUnderlineHeight: 1,
    tabUnderlineHeight_selected: 2,
    tabDividerHeight: 40,
    tabHeight_fixed: 60,
    tabWidth_fixed: 125,
    tabLinkUnderlineHeight_active: 2,

    tagBorderRadius: 10,
    tagHeight: 20,
    tagMarginRight: 5,
    tagPaddingHorizontal: 8,

    templateTabsWidth: 210,

    textInputHorizontalMargin_expandable: 10,

    tooltipPadding: 10,

    tooltipArrowSize: 10,
    tooltipArrowVerticalShift: -2,

    uploadInputBorderRadius: 2,
    uploadInputBorderWidth: 2,
    uploadInputPadding: 20,
    uploadInputPreviewWidth: 200,
    uploadInputPreviewHeight: 100
  },

  zIndexes: {
    internalHeader: 100,
    modal: 200,
    menu: 300,
    tooltip: 400,
    alert: 500,
    appLoader: 1000
  }
}

export default theme
