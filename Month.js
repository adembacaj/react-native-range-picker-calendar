import React from 'react';
import { View, Text } from 'react-native';
import DayRow from './DayRow'
import moment from 'moment';

const Month = (props) => {
	function getDayStack(month) {
		let currMonth = moment(month).month(); //get this month
		let currDate = moment(month).startOf("month"); //get first day in this month

		let dayColumn = [];
		let dayRow = [];
		let dayObject = {};
		let { startDate, untilDate, blockedDates, minDate, maxDate, ignoreMinDate } = props;

		do {
			dayColumn = [];
			for (let i = 0; i < 7; i++) {
				dayObject = {
					type: null,
					date: null
				};

				if (i == currDate.days() && currDate.month() == currMonth) {
					if (minDate && minDate.format("YYYYMMDD") && currDate.format("YYYYMMDD") < minDate.format("YYYYMMDD")) {
						if (startDate && startDate.format('YYYYMMDD') > currDate.format("YYYYMMDD") && currDate.format("YYYYMMDD") > moment().format("YYYYMMDD") && ignoreMinDate) { }
						else {
							dayObject.type = 'disabled';
						}
					}
					if (maxDate && maxDate.format("YYYYMMDD") && currDate.format("YYYYMMDD") > maxDate.format("YYYYMMDD")) {
						dayObject.type = 'disabled';
					}
					if (blockedDates && blockedDates.indexOf(currDate.format("YYYYMMDD")) >= 0) {
						dayObject.type = 'blockout';
					}
					if (startDate && startDate.format('YYYYMMDD') == currDate.format('YYYYMMDD')) {
						if (!untilDate)
							dayObject.type = 'single';
						else {
							dayObject.type = 'first';
						}
					}
					if (untilDate && untilDate.format('YYYYMMDD') == currDate.format('YYYYMMDD')) {
						dayObject.type = 'last';
					}
					if ((startDate && startDate.format('YYYYMMDD') < currDate.format('YYYYMMDD')) &&
						(untilDate && untilDate.format('YYYYMMDD') > currDate.format('YYYYMMDD')))
						dayObject.type = 'between';

					dayObject.date = currDate.clone().format('YYYYMMDD');
					dayColumn.push(dayObject);
					currDate.add(1, 'day');
				}
				else {
					if (startDate && untilDate &&
						(
							startDate.format('YYYYMMDD') < currDate.format('YYYYMMDD') &&
							untilDate.format('YYYYMMDD') >= currDate.format('YYYYMMDD')
						)
					)
						dayObject.type = 'between';

					dayColumn.push(dayObject);
				}
			}

			dayRow.push(dayColumn);
		} while (currDate.month() == currMonth);

		return dayRow;
	}
	const { month, dayProps } = props;
	const dayStack = getDayStack(moment(month, 'YYYYMM'));
	return (
		<View>
			<Text style={{ fontSize: 16, fontWeight: '600', padding: 14, color: '#222222' }}>{moment(month, 'YYYYMM').format("MMMM YYYY")}</Text>
			<View>
				{
					dayStack.map((days, i) => {
						return (
							<DayRow days={days} dayProps={dayProps} key={i} onSelectDate={props.onSelectDate} />
						)
					})
				}
			</View>
		</View>
	)
}

export default Month;