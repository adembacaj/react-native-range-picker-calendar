# @adembacaj/react-native-range-picker-calendar

### Install
```sh
$ npm install @adembacaj/react-native-range-picker-calendar --save
```

### How to use
```jsx
import RangePicker from '@adembacaj/react-native-range-picker-calendar';

<RangePicker
	startDate={"27022021"}
	untilDate={"31032021"}
	buttonColor={'red'}
	buttonContainerStyle={{
		borderTopWidth: 0
		}}
		showClose={true}
		showReset={true}
		showButton={true}
		buttonLabel="Submit"
		onClose={toggle}
		placeHolderStart="Checkin"
		placeHolderUntil="Checkout"
		selectedBackgroundColor={'red'}
		maxMonth={12}dayHeadings={['Mo', 'Tu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
		blockedDates={[ '20210315', '20210317']}
/>
```


### Default props RangeDatepicker
```jsx
static defaultProps = {
	initialMonth: '',
	dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	maxMonth: 12,
	buttonColor: 'green',
	buttonContainerStyle: {},
	showReset: true,
	showClose: true,
	showSelectionInfo: true,
	showButton: true,
	ignoreMinDate: false,
  isHistorical: false, //Switches direction of months from forward to a historical view with the current month on top.
	onClose: () => {},
	onSelect: () => {},
	onConfirm: () => {},
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
	infoStyle: {color: '#fff', fontSize: 13},
	infoContainerStyle: {marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end'},
};
```

### Proptypes RangeDatepicker
```jsx
static propTypes = {
	initialMonth: PropTypes.string,
	dayHeadings: PropTypes.arrayOf(React.PropTypes.string),
	availableDates: PropTypes.arrayOf(React.PropTypes.string),
	maxMonth: PropTypes.number,
	buttonColor: PropTypes.string,
	buttonContainerStyle: PropTypes.object,
	startDate: PropTypes.string,
	untilDate: PropTypes.string,
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
	showReset: PropTypes.bool,
	showClose: PropTypes.bool,
	showSelectionInfo: PropTypes.bool,
	showButton: PropTypes.bool,
	ignoreMinDate: PropTypes.bool,
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
}
```