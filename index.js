import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Month from './Month';
import moment from 'moment';
import { CloseIcon } from '../../assets/images';
import { fonts, accent, primary, secondary } from '../../constants';
import { TextButton } from '../../components';
import { ourDefaultProps, ourPropTypes } from './constants';

const RangePicker = (props) => {
	const { blockedDates } = props;
	const [startDateState, setStartDate] = useState(props.startDate && moment(props.startDate, 'YYYYMMDD'));
	const [untilDateState, setUntilDate] = useState(props.untilDate && moment(props.untilDate, 'YYYYMMDD'));
	const [blockedDatesState, setBlockedDates] = useState(blockedDates || null);

	useEffect(() => {
		setBlockedDates(blockedDates)
	}, [blockedDates, props]);

	function onSelectDate(date) {
		let startDate = null;
		let untilDate = null;

		if (startDateState && !untilDateState) {
			if (date.format('YYYYMMDD') < startDateState.format('YYYYMMDD') || isInvalidRange(date)) {
				startDate = date;
			}
			else if (date.format('YYYYMMDD') > startDateState.format('YYYYMMDD')) {
				startDate = startDateState;
				untilDate = date;
			}
			else {
				startDate = null;
				untilDate = null;
			}
		}
		else if (!isInvalidRange(date)) {
			startDate = date;
		}
		else {
			startDate = null;
			untilDate = null;
		}

		setStartDate(startDate);
		setUntilDate(untilDate);
		props.onSelect(startDate, untilDate);
	}

	function isInvalidRange(date) {
		if (blockedDatesState && blockedDatesState.length > 0) {
			//select endDate condition
			if (startDateState && !untilDateState) {
				for (let i = startDateState.format('YYYYMMDD'); i <= date.format('YYYYMMDD'); i = moment(i, 'YYYYMMDD').add(1, 'days').format('YYYYMMDD')) {
					if (blockedDatesState.indexOf(i) == -1 && startDateState.format('YYYYMMDD') != i)
						return false;
				}
			}
			//select startDate condition
			else if (blockedDatesState.indexOf(date.format('YYYYMMDD')) == -1)
				return false;
		}

		return true;
	}

	function getMonthStack() {
		let res = [];
		const { maxMonth, initialMonth, isHistorical } = props;
		let initMonth = moment();
		if (initialMonth && initialMonth != '')
			initMonth = moment(initialMonth, 'YYYYMM');

		for (let i = 0; i < maxMonth; i++) {
			res.push(
				!isHistorical ? (
					initMonth.clone().add(i, 'month').format('YYYYMM')
				) : (
						initMonth.clone().subtract(i, 'month').format('YYYYMM')
					)
			);
		}

		return res;
	}

	function onReset() {
		setStartDate(null);
		setUntilDate(null);

		props.onSelect(null, null);
	}

	function handleConfirmDate() {
		props.onConfirm && props.onConfirm(startDateState, untilDateState);
	}

	function handleRenderRow(month, index) {
		const { selectedBackgroundColor, selectedTextColor, todayColor, ignoreMinDate, minDate, maxDate } = props;
		let blockedDatess = blockedDatesState
		if (blockedDatess && blockedDatess.length > 0) {
			blockedDatess = blockedDatess.filter(function (d) {
				if (d.indexOf(month) >= 0)
					return true;
			});
		}

		return (
			<Month
				onSelectDate={onSelectDate}
				startDate={startDateState}
				untilDate={untilDateState}
				blockedDates={blockedDatess}
				minDate={minDate ? moment(minDate, 'YYYYMMDD') : minDate}
				maxDate={maxDate ? moment(maxDate, 'YYYYMMDD') : maxDate}
				ignoreMinDate={ignoreMinDate}
				dayProps={{ selectedBackgroundColor, selectedTextColor, todayColor }}
				month={month}
			/>
		)
	}

	return (
		<View style={styles.container}>
			{/* Header */}
			{
				props.showClose || props.showReset ?
					(<View style={styles.header}>
						{props.showClose && (<TouchableOpacity onPress={props.onClose}><CloseIcon /></TouchableOpacity>)}
						{props.showReset && <TextButton onPress={onReset} label="PASTRO" />}
					</View>)
					:
					null
			}
			{/* Calendar Days ex: Ha, Ma, Me, Enj, Pre, Sht, Di */}
			<View style={styles.dayHeader}>
				{props.dayHeadings.map((day, i) => {
					return (<Text style={styles.dayHeaderText} key={i}>{day}</Text>)
				})}
			</View>
			{/* List of Calendar days */}
			<FlatList
				style={{ flex: 1 }}
				data={getMonthStack()}
				renderItem={({ item, index }) => {
					return handleRenderRow(item, index)
				}}
				keyExtractor={(item, index) => index.toString()}
				showsVerticalScrollIndicator={false}
			/>
			{/* Checking / Checkout Dates */}
			<View style={styles.dateContainer}>
				<View style={styles.checkinContainer}>
					<Text style={styles.checkinoutText}>Checkin</Text>
					<Text style={styles.checkingoutDateText}>{startDateState ? moment(startDateState).format("MMM DD YYYY") : '-'}</Text>
				</View>
				<View style={styles.checkoutContainer}>
					<Text style={styles.checkinoutText}>Checkin</Text>
					<Text style={styles.checkingoutDateText}>{untilDateState ? moment(untilDateState).format("MMM DD YYYY") : '-'}</Text>
				</View>
			</View>

			{/* Submit button */}
			{props.showButton ?
				(
					<View style={[styles.buttonWrapper, props.buttonContainerStyle]}>
						<TouchableOpacity
							style={styles.submitButton}
							onPress={handleConfirmDate}
						>
							<Text style={styles.buttonText}>{props.buttonLabel}</Text>
						</TouchableOpacity>
					</View>
				) : null}
		</View>
	)
}

export default RangePicker;

RangePicker.defaultProps = ourDefaultProps;
RangePicker.propTypes = ourPropTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		zIndex: 1000,
		alignSelf: 'center',
		width: '100%',
		flex: 1
	},
	header: {
		flexDirection: 'row',
		justifyContent: "space-between",
		padding: 20,
		paddingBottom: 20
	},
	dayHeader: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		paddingBottom: 10,
		paddingTop: 10,
		borderColor: '#E6E6E6'
	},
	buttonWrapper: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderColor: '#ccc',
		alignItems: 'stretch'
	},
	clearText: {
		fontSize: 14,
		color: accent.INFORMATION,
		fontFamily: fonts.REGULAR
	},
	dayHeaderText: {
		width: "14.28%",
		textAlign: 'center',
		color: secondary.DARK_GREY,
		fontFamily: fonts.REGULAR
	},
	dateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		borderWidth: 1,
		borderColor: secondary.SUPER_LIGHT_GREY
	},
	checkinContainer: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: 'center'
	},
	checkoutContainer: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: 'center',
		borderLeftWidth: 1,
		borderColor: secondary.SUPER_LIGHT_GREY,
		height: '100%'
	},
	checkinoutText: {
		fontSize: 12,
		color: secondary.DARK_GREY,
		marginBottom: 2,
		fontFamily: fonts.REGULAR
	},
	checkingoutDateText: {
		fontSize: 16,
		fontFamily: fonts.SEMIBOLD,
		color: secondary.DARK_GREY
	},
	submitButton: {
		width: '100%',
		height: 50,
		borderRadius: 3,
		backgroundColor: accent.ERROR,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		fontSize: 16,
		color: primary.WHITE,
		fontFamily: fonts.REGULAR
	}
});