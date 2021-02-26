import React from 'react';
import { View } from 'react-native';
import Day from './Day';

const DayRow = (props) => {
	const { days, dayProps, onSelectDate } = props;
	return (
		<View style={{ marginBottom: 2, marginTop: 2, flexDirection: 'row', justifyContent: 'space-evenly', flex: 1 }}>
			{
				days.map((day, i) => {
					return (
						<Day key={i} dayProps={dayProps} onSelectDate={onSelectDate} day={day} />
					)
				})
			}
		</View>
	)
}

export default DayRow;