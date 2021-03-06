import PropTypes from 'prop-types';

export const ourDefaultProps = {
    initialMonth: '',
    dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    maxMonth: 12,
    buttonColor: 'green',
    buttonContainerStyle: {},
    showReset: true,
    showClose: true,
    ignoreMinDate: false,
    isHistorical: false,
    onClose: () => { },
    onSelect: () => { },
    onConfirm: () => { },
    placeHolderStart: 'Start Date',
    placeHolderUntil: 'Until Date',
    selectedBackgroundColor: 'green',
    selectedTextColor: 'white',
    todayColor: 'green',
    startDate: '',
    untilDate: '',
    minDate: '',
    maxDate: '',
    infoText: '',
    infoStyle: { color: '#fff', fontSize: 13 },
    infoContainerStyle: { marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end' },
    showSelectionInfo: true,
    showButton: true,
}

export const ourPropTypes = {
    initialMonth: PropTypes.string,
    dayHeadings: PropTypes.arrayOf(PropTypes.string),
    blockedDates: PropTypes.arrayOf(PropTypes.string),
    maxMonth: PropTypes.number,
    buttonColor: PropTypes.string,
    buttonContainerStyle: PropTypes.object,
    startDate: PropTypes.string,
    untilDate: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    showReset: PropTypes.bool,
    showClose: PropTypes.bool,
    ignoreMinDate: PropTypes.bool,
    isHistorical: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    onConfirm: PropTypes.func,
    placeHolderStart: PropTypes.string,
    placeHolderUntil: PropTypes.string,
    selectedBackgroundColor: PropTypes.string,
    selectedTextColor: PropTypes.string,
    todayColor: PropTypes.string,
    infoText: PropTypes.string,
    infoStyle: PropTypes.object,
    infoContainerStyle: PropTypes.object,
    showSelectionInfo: PropTypes.bool,
    showButton: PropTypes.bool,
}

export const primary = {
    WHITE: '#ffffff',
    BLACK: '#000000',
};

export const secondary = {
    DARK_GREY: '#222222',
    MEDIUM_GREY: '#484848',
    GREY: '#838383',
    LIGHT_GREY: '#C7C7C7',
    SUPER_LIGHT_GREY: '#E6E6E6',
    THIN_GREY: '#FAFAFA',
    SKY: '#F6FBFF',
}

export const accent = {
    ERROR: '#F04F4F',
    LIGHT_ERROR: '#FFEDED',
    SUCCESS: '#36D68D',
    LIGHT_SUCCESS: '#EFFDEF',
    WARNING: '#EFD078',
    LIGHT_WARNING: '#FDFCEF',
    INFORMATION: '#4684E8',
    LIGHT_INFORMATION: '#EFF5FD',
}